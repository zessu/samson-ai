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

import { Route as CardioRoute } from './cardio-equipment';

vi.mock('../../state/onboarding', () => ({
  useStore: {
    setState: vi.fn(),
  },
}));

import { useStore } from '../../state/onboarding';

const setupRouter = () => {
  const rootRoute = createRootRoute() as any;

  const cardioRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/cardio-equipment',
    component: CardioRoute.options.component,
  });

  const strengthRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/strength-equipment',
    component: () => <div>Strength Equipment Page</div>,
  });

  const testRouteTree = rootRoute.addChildren([cardioRoute, strengthRoute]);

  const history = createMemoryHistory({
    initialEntries: ['/cardio-equipment'],
  });

  return createRouter({
    routeTree: testRouteTree,
    history,
  });
};

describe('Cardio Equipment Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the cardio equipment page with checkboxes and next button', async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByText('What equipment in this list do you own ?')
    ).toBeInTheDocument();

    expect(screen.getByText('Treadmill')).toBeInTheDocument();
    expect(screen.getByText('Stationary Bike')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /next list/i })
    ).toBeInTheDocument();
  });

  it('navigates to strength-equipment when equipment is selected', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const treadmillOption = await screen.findByText('Treadmill');
    fireEvent.click(treadmillOption.parentElement!.querySelector('input')!);

    await user.click(screen.getByRole('button', { name: /next list/i }));

    await waitFor(() => {
      expect(screen.getByText('Strength Equipment Page')).toBeInTheDocument();
    });
  });

  it('calls store with selected equipment', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const treadmillOption = await screen.findByText('Treadmill');
    fireEvent.click(treadmillOption.parentElement!.querySelector('input')!);

    const stationaryBikeOption = screen.getByText('Stationary Bike');
    fireEvent.click(
      stationaryBikeOption.parentElement!.querySelector('input')!
    );

    await user.click(screen.getByRole('button', { name: /next list/i }));

    await waitFor(() => {
      expect(screen.getByText('Strength Equipment Page')).toBeInTheDocument();
    });

    expect(useStore.setState).toHaveBeenCalled();
    expect(useStore.setState).toHaveBeenCalledTimes(1);
  });

  it('allows selecting multiple equipment items', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const treadmillOption = await screen.findByText('Treadmill');
    fireEvent.click(treadmillOption.parentElement!.querySelector('input')!);

    const resistanceBandsOption = screen.getByText('Resistance Bands');
    fireEvent.click(
      resistanceBandsOption.parentElement!.querySelector('input')!
    );

    const exerciseMatsOption = screen.getByText('Exercise Mats');
    fireEvent.click(exerciseMatsOption.parentElement!.querySelector('input')!);

    await user.click(screen.getByRole('button', { name: /next list/i }));

    await waitFor(() => {
      expect(screen.getByText('Strength Equipment Page')).toBeInTheDocument();
    });

    expect(useStore.setState).toHaveBeenCalled();
    expect(useStore.setState).toHaveBeenCalledTimes(1);
  });
});
