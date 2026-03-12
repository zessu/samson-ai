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

// 1. Import the original route instance
import { Route as FitnessRoute } from './fitness-select.tsx';

// 2. Mock the store
vi.mock('../../state/onboarding', () => ({
  useStore: {
    setState: vi.fn(),
  },
}));

import { useStore } from '../../state/onboarding';

const setupRouter = () => {
  // We use 'any' here because the RootRoute type is extremely rigid
  // and expects the CLI-generated context which we don't have in Vitest.
  const rootRoute = createRootRoute() as any;

  const fitnessSelectRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/fitness-select',
    component: FitnessRoute.options.component,
  });

  const weightRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/goals',
    component: () => <div>Goals Page</div>,
  });

  const testRouteTree = rootRoute.addChildren([
    fitnessSelectRoute,
    weightRoute,
  ]);

  const history = createMemoryHistory({ initialEntries: ['/fitness-select'] });

  return createRouter({
    routeTree: testRouteTree,
    history,
  });
};

describe('Fitness Select Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the fitness input and continue button', async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByText("What's your fitness level ?")
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /continue/i })
    ).toBeInTheDocument();
  });

  it('Navigates to the next page on right selection', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    await screen.findByText("What's your fitness level ?");

    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText(/Goals Page/i)).toBeInTheDocument();
    });
  });

  it('Calls store with user selected choice', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    await screen.findByText("What's your fitness level ?");

    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText(/Goals Page/i)).toBeInTheDocument();
    });

    expect(useStore.setState).toHaveBeenCalled();
    expect(useStore.setState).toHaveBeenCalledTimes(1);
    expect(useStore.setState).toHaveBeenCalledWith({
      fitnessLevel: 'beginner',
    });
  });

  it('Submits successfully with default value', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    await screen.findByText("What's your fitness level ?");
    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText(/Goals Page/i)).toBeInTheDocument();
    });

    expect(useStore.setState).toHaveBeenCalledWith({
      fitnessLevel: 'beginner',
    });
  });
});
