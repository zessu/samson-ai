import {
  createRootRoute,
  createRouter,
  createRoute,
  RouterProvider,
  createMemoryHistory,
} from '@tanstack/react-router';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Route as NotificationsRoute } from './notifications';

vi.mock('../../state/onboarding', () => ({
  useStore: {
    setState: vi.fn(),
    getState: vi.fn().mockReturnValue({
      gender: 'male',
      age: 25,
      weight: 75,
      fitnessLevel: 'beginner',
      goals: ['lose weight'],
      equipment: ['dumbbells'],
      weekdays: ['monday'],
      time: '08:00',
      offset: -5,
      duration: 60,
      notifications: { email: true, sms: false, app: false },
    }),
  },
}));

import { useStore } from '../../state/onboarding';

const setupRouter = () => {
  const rootRoute = createRootRoute() as any;

  const notificationsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/notifications',
    component: NotificationsRoute.options.component,
  });

  const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: () => <div>Dashboard Page</div>,
  });

  const testRouteTree = rootRoute.addChildren([
    notificationsRoute,
    dashboardRoute,
  ]);

  const history = createMemoryHistory({ initialEntries: ['/notifications'] });

  return createRouter({
    routeTree: testRouteTree,
    history,
  });
};

describe('Notifications Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any) = vi.fn();
  });

  it('renders the notifications page with checkboxes and submit button', async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByText(
        "What's the best way to reach you with your daily workouts?"
      )
    ).toBeInTheDocument();

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /start my journey/i })
    ).toBeInTheDocument();
  });

  it('navigates to dashboard on successful submission', async () => {
    const user = userEvent.setup();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const emailCheckbox = await screen.findByText('Email');
    fireEvent.click(emailCheckbox);

    await user.click(screen.getByRole('button', { name: /start my journey/i }));

    await waitFor(() => {
      expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
    });
  });

  it('calls store with notification preferences', async () => {
    const user = userEvent.setup();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const emailCheckbox = await screen.findByText('Email');
    fireEvent.click(emailCheckbox);

    await user.click(screen.getByRole('button', { name: /start my journey/i }));

    await waitFor(() => {
      expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
    });

    expect(useStore.setState).toHaveBeenCalledWith({
      notifications: { email: true, sms: false, app: false },
    });
  });

  it('shows error message on API failure', async () => {
    const user = userEvent.setup();
    (global.fetch as any).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Server error' }),
    });

    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const emailCheckbox = await screen.findByText('Email');
    fireEvent.click(emailCheckbox);

    await user.click(screen.getByRole('button', { name: /start my journey/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/There was a problem processing your request/i)
      ).toBeInTheDocument();
    });

    expect(screen.queryByText('Dashboard Page')).not.toBeInTheDocument();
  });
});
