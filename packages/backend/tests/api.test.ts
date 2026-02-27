import { describe, test, expect, beforeEach, mock } from 'bun:test';

const mockGetSession = mock(() => {}) as any;
const mockFindFirst = mock(() => {}) as any;
const mockUserUpdate = mock(() => {}) as any;
const mockWorkoutSettingsInsert = mock(() => {}) as any;
const mockQueueAdd = mock(() => {}) as any;

mock.module('../src/db', () => {
  const updateChain = {
    set: () => ({
      where: () => ({
        returning: mockUserUpdate,
      }),
    }),
  };

  const insertChain = {
    values: () => ({
      returning: mockWorkoutSettingsInsert,
    }),
  };

  return {
    db: {
      query: {
        user: {
          findFirst: mockFindFirst,
        },
      },
      update: () => updateChain,
      insert: () => insertChain,
    },
  };
});

mock.module('../auth', () => ({
  auth: {
    api: {
      getSession: mockGetSession,
    },
  },
}));

mock.module('../lib/index', () => ({
  initQueues: () => ({
    routineQueue: {
      add: mockQueueAdd,
    },
  }),
}));

const { app } = await import('../src/index');

const completeUser = {
  id: 'user-123',
  name: 'Test User',
  email: 'test@example.com',
  emailVerified: true,
  image: null,
  gender: 'male' as const,
  age: 25,
  weight: 180,
  fitnessLevel: 'intermediate' as const,
  goals: 'strength,muscle',
  equipment: 'barbell,dumbbells',
  notifications: 'app' as const,
  firstTimeLogin: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  workoutSettings: {
    id: 'ws-123',
    userId: 'user-123',
    weekdays: 'Mon,Wed,Fri',
    workoutTime: '08:00',
    workoutDuration: 60,
    userTimezoneOffset: -300,
  },
};

const validProfileData = {
  gender: 'male',
  age: 25,
  weight: 180,
  fitnessLevel: 'intermediate',
  goals: ['strength', 'muscle'],
  equipment: ['barbell', 'dumbbells'],
  weekdays: ['monday', 'wednesday', 'friday'],
  time: '08:00',
  offset: -5,
  duration: 60,
  notifications: {
    email: true,
    sms: false,
    app: true,
  },
};

describe('POST /generate', () => {
  beforeEach(() => {
    mockGetSession.mockClear();
    mockFindFirst.mockClear();
    mockQueueAdd.mockClear();
  });

  test('returns 401 if not authenticated', async () => {
    mockGetSession.mockResolvedValue(null);

    const res = await app.request('/generate', { method: 'POST' });
    expect(res.status).toBe(401);
  });

  test('returns 500 if user not found in db', async () => {
    mockGetSession.mockResolvedValue({ user: { id: 'user-123' } });
    mockFindFirst.mockResolvedValue(null);

    const res = await app.request('/generate', { method: 'POST' });
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({
      error: 'Could not find user to generate workout for',
    });
  });

  test('returns 500 if profile is incomplete', async () => {
    mockGetSession.mockResolvedValue({ user: { id: 'user-123' } });
    mockFindFirst.mockResolvedValue({
      ...completeUser,
      gender: null,
    });

    const res = await app.request('/generate', { method: 'POST' });
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'Profile not complete' });
  });

  test('adds job to queue with correct data and returns 200', async () => {
    mockGetSession.mockResolvedValue({ user: { id: 'user-123' } });
    mockFindFirst.mockResolvedValue(completeUser as any);
    mockQueueAdd.mockResolvedValue({});

    const res = await app.request('/generate', { method: 'POST' });
    expect(res.status).toBe(200);

    expect(mockQueueAdd).toHaveBeenCalledWith(
      expect.stringContaining('create-routine:'),
      expect.objectContaining({
        id: 'user-123',
        gender: 'male',
        goals: ['strength', 'muscle'],
        equipment: ['barbell', 'dumbbells'],
      })
    );
  });
});

describe('POST /api/createProfile', () => {
  beforeEach(() => {
    mockGetSession.mockClear();
    mockUserUpdate.mockClear();
    mockWorkoutSettingsInsert.mockClear();
    mockQueueAdd.mockClear();
  });

  test('returns 401 if not authenticated', async () => {
    mockGetSession.mockResolvedValue(null);

    const res = await app.request('/api/createProfile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validProfileData),
    });

    expect(res.status).toBe(401);
  });

  test('returns 404 if user update fails', async () => {
    mockGetSession.mockResolvedValue({ user: { id: 'user-123' } });
    mockUserUpdate.mockResolvedValue([]);

    const res = await app.request('/api/createProfile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validProfileData),
    });

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({
      error: 'We could not make the user request, please try again later',
    });
  });

  test('returns 404 if workout settings insert fails', async () => {
    mockGetSession.mockResolvedValue({ user: { id: 'user-123' } });
    mockUserUpdate.mockResolvedValue([{ userid: 'user-123' }]);
    mockWorkoutSettingsInsert.mockResolvedValue([]);

    const res = await app.request('/api/createProfile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validProfileData),
    });

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({
      error:
        'We could not create a workout schedule for you. Please try again in a bit',
    });
  });

  test('creates profile, inserts workout settings, adds queue job and returns 200', async () => {
    mockGetSession.mockResolvedValue({ user: { id: 'user-123' } });
    mockUserUpdate.mockResolvedValue([{ userid: 'user-123' }]);
    mockWorkoutSettingsInsert.mockResolvedValue([{ id: 'ws-123' }]);
    mockQueueAdd.mockResolvedValue({});

    const res = await app.request('/api/createProfile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validProfileData),
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toBe('generated your workout routine');

    expect(mockUserUpdate).toHaveBeenCalled();
    expect(mockWorkoutSettingsInsert).toHaveBeenCalled();
    expect(mockQueueAdd).toHaveBeenCalled();
  });

  test('returns 400 if validation fails (missing required fields)', async () => {
    mockGetSession.mockResolvedValue({ user: { id: 'user-123' } });

    const invalidData = {
      gender: 'male',
      age: 25,
    };

    const res = await app.request('/api/createProfile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidData),
    });

    expect(res.status).toBe(400);
  });
});
