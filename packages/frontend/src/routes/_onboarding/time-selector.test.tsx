import {
  createRootRoute,
  createRouter,
  createRoute,
  RouterProvider,
  createMemoryHistory,
} from '@tanstack/react-router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Route as TimeSelectorRoute } from './time-selector';

vi.mock('../../state/onboarding', () => ({
  useStore: {
    setState: vi.fn(),
  },
}));

const setupRouter = () => {
  const rootRoute = createRootRoute() as any;

  const timeSelectorRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/time-selector',
    component: TimeSelectorRoute.options.component,
  });

  const notificationsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/notifications',
    component: () => <div>Notifications Page</div>,
  });

  const testRouteTree = rootRoute.addChildren([
    timeSelectorRoute,
    notificationsRoute,
  ]);

  const history = createMemoryHistory({ initialEntries: ['/time-selector'] });

  return createRouter({
    routeTree: testRouteTree,
    history,
  });
};

describe('Time Selector Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the time selector page with time and duration inputs', async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByText('What time do you want to work out?')
    ).toBeInTheDocument();

    expect(
      await screen.findByPlaceholderText(
        'How long do you want to work out for?'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /continue/i })
    ).toBeInTheDocument();
  });

  it('navigates to notifications on valid submission', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const timeInputs = await screen.findAllByDisplayValue('');
    const timeInput = timeInputs[0];
    await user.type(timeInput, '08:00');

    const durationInput = await screen.findByPlaceholderText(
      'How long do you want to work out for?'
    );
    await user.type(durationInput, '60');

    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText('Notifications Page')).toBeInTheDocument();
    });
  });
});
