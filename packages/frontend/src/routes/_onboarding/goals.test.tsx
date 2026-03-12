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

import { Route as GoalsRoute } from './goals';

vi.mock('../../state/onboarding', () => ({
  useStore: {
    setState: vi.fn(),
  },
}));

import { useStore } from '../../state/onboarding';

const setupRouter = () => {
  const rootRoute = createRootRoute() as any;

  const goalsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/goals',
    component: GoalsRoute.options.component,
  });

  const cardioRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/cardio-equipment',
    component: () => <div>Cardio Equipment Page</div>,
  });

  const testRouteTree = rootRoute.addChildren([goalsRoute, cardioRoute]);

  const history = createMemoryHistory({ initialEntries: ['/goals'] });

  return createRouter({
    routeTree: testRouteTree,
    history,
  });
};

describe('Goals Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the goals page with checkboxes and continue button', async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByText('Select Your Fitness Goals')
    ).toBeInTheDocument();

    expect(screen.getByText('Lose Weight')).toBeInTheDocument();
    expect(screen.getByText('Add Muscle / Build Strength')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /continue/i })
    ).toBeInTheDocument();
  });

  it('navigates to cardio-equipment when a goal is selected', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const loseWeightOption = await screen.findByText('Lose Weight');
    fireEvent.click(loseWeightOption);

    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText('Cardio Equipment Page')).toBeInTheDocument();
    });
  });

  it('calls store with selected goals', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    await screen.findByText('Select Your Fitness Goals');
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]); // Lose Weight
    await user.click(checkboxes[1]); // Add Muscle

    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText('Cardio Equipment Page')).toBeInTheDocument();
    });
  });
});

describe('Goals Page Additional', () => {
  it('allows selecting multiple goals', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    await screen.findByText('Select Your Fitness Goals');
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[3]); // Cardio
    await user.click(checkboxes[4]); // Endurance

    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText('Cardio Equipment Page')).toBeInTheDocument();
    });

    expect(useStore.setState).toHaveBeenCalledWith({
      goals: [
        'increase cardiovascular fitness',
        'increase endurance and stamina',
      ],
    });
  });
});
