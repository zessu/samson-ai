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

import { Route as DayTimeRoute } from './day-time';

vi.mock('../../state/onboarding', () => ({
  useStore: {
    setState: vi.fn(),
  },
}));

import { useStore } from '../../state/onboarding';

const setupRouter = () => {
  const rootRoute = createRootRoute() as any;

  const dayTimeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/day-time',
    component: DayTimeRoute.options.component,
  });

  const timeSelectorRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/time-selector',
    component: () => <div>Time Selector Page</div>,
  });

  const testRouteTree = rootRoute.addChildren([
    dayTimeRoute,
    timeSelectorRoute,
  ]);

  const history = createMemoryHistory({ initialEntries: ['/day-time'] });

  return createRouter({
    routeTree: testRouteTree,
    history,
  });
};

describe('Day Time Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the day-time page with weekday checkboxes and continue button', async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByText('What Days of the week do you want to work out ?')
    ).toBeInTheDocument();

    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Tuesday')).toBeInTheDocument();
    expect(screen.getByText('Wednesday')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /continue/i })
    ).toBeInTheDocument();
  });

  it('navigates to time-selector when a day is selected', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const mondayOption = await screen.findByText('Monday');
    fireEvent.click(mondayOption);

    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText('Time Selector Page')).toBeInTheDocument();
    });
  });

  it('calls store with selected weekdays', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const mondayCheckbox = await screen.findByText('Monday');
    fireEvent.click(mondayCheckbox.parentElement!.querySelector('input')!);

    const wednesdayCheckbox = screen.getByText('Wednesday');
    fireEvent.click(wednesdayCheckbox.parentElement!.querySelector('input')!);

    const fridayCheckbox = screen.getByText('Friday');
    fireEvent.click(fridayCheckbox.parentElement!.querySelector('input')!);

    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText('Time Selector Page')).toBeInTheDocument();
    });

    expect(useStore.setState).toHaveBeenCalledWith({
      weekdays: ['monday', 'wednesday', 'friday'],
    });
  });

  it('allows selecting multiple days', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const saturdayCheckbox = await screen.findByText('Saturday');
    fireEvent.click(saturdayCheckbox.parentElement!.querySelector('input')!);

    const sundayCheckbox = screen.getByText('Sunday');
    fireEvent.click(sundayCheckbox.parentElement!.querySelector('input')!);

    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText('Time Selector Page')).toBeInTheDocument();
    });

    expect(useStore.setState).toHaveBeenCalledWith({
      weekdays: ['saturday', 'sunday'],
    });
  });
});
