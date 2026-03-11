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

import { Route as StrengthRoute } from './strength-equipment';

vi.mock('../../state/onboarding', () => ({
  useStore: {
    setState: vi.fn(),
    getState: vi.fn().mockReturnValue({
      gender: 'male',
      age: 25,
      weight: 75,
      fitnessLevel: 'beginner',
      goals: ['lose weight'],
      equipment: [],
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

  const strengthRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/strength-equipment',
    component: StrengthRoute.options.component,
  });

  const dayTimeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/day-time',
    component: () => <div>Day Time Page</div>,
  });

  const testRouteTree = rootRoute.addChildren([strengthRoute, dayTimeRoute]);

  const history = createMemoryHistory({
    initialEntries: ['/strength-equipment'],
  });

  return createRouter({
    routeTree: testRouteTree,
    history,
  });
};

describe('Strength Equipment Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the strength equipment page with checkboxes and continue button', async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByText('What equipment in this list do you have?')
    ).toBeInTheDocument();

    expect(screen.getByText('Dumbbells')).toBeInTheDocument();
    expect(screen.getByText('Barbells')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /continue/i })
    ).toBeInTheDocument();
  });

  it('navigates to day-time when equipment is selected', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const dumbbellsOption = await screen.findByText('Dumbbells');
    fireEvent.click(dumbbellsOption.parentElement!.querySelector('input')!);

    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText('Day Time Page')).toBeInTheDocument();
    });
  });

  it('calls store with selected equipment', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const dumbbellsOption = await screen.findByText('Dumbbells');
    fireEvent.click(dumbbellsOption.parentElement!.querySelector('input')!);

    const barbellsOption = screen.getByText('Barbells');
    fireEvent.click(barbellsOption.parentElement!.querySelector('input')!);

    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText('Day Time Page')).toBeInTheDocument();
    });

    expect(useStore.setState).toHaveBeenCalled();
    expect(useStore.setState).toHaveBeenCalledTimes(1);
  });
});
