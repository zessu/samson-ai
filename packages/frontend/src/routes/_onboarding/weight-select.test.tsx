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

import { Route as WeightRoute } from './weight-select';

vi.mock('../../state/onboarding', () => ({
  useStore: {
    setState: vi.fn(),
  },
}));

import { useStore } from '../../state/onboarding';

const setupRouter = () => {
  const rootRoute = createRootRoute() as any;

  const weightSelectRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/weight-select',
    component: WeightRoute.options.component,
  });

  const fitnessRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/fitness-select',
    component: () => <div>Fitness Select Page</div>,
  });

  const testRouteTree = rootRoute.addChildren([
    weightSelectRoute,
    fitnessRoute,
  ]);

  const history = createMemoryHistory({ initialEntries: ['/weight-select'] });

  return createRouter({
    routeTree: testRouteTree,
    history,
  });
};

describe('Weight Select Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the weight input and continue button', async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByPlaceholderText('How many KGs do you weigh?')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /continue/i })
    ).toBeInTheDocument();
  });

  it('sets store state and navigates on valid submission', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const input = await screen.findByPlaceholderText(
      'How many KGs do you weigh?'
    );
    await user.type(input, '75');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText('Fitness Select Page')).toBeInTheDocument();
    });

    expect(useStore.setState).toHaveBeenCalledWith({ weight: 75 });
  });

  it('does not submit or navigate when input is empty', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    await screen.findByPlaceholderText('How many KGs do you weigh?');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(useStore.setState).not.toHaveBeenCalled();
    expect(screen.queryByText('Fitness Select Page')).not.toBeInTheDocument();
  });
});
