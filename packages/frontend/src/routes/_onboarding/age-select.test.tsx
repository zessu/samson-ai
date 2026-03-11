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
import { Route as AgeSelectRoute } from './age-select';

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

  const testAgeSelectRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/age-select',
    component: AgeSelectRoute.options.component,
    loader: AgeSelectRoute.options.loader,
  });

  const weightRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/weight-select',
    component: () => <div>Weight Select Page</div>,
  });

  const testRouteTree = rootRoute.addChildren([
    testAgeSelectRoute,
    weightRoute,
  ]);

  const history = createMemoryHistory({ initialEntries: ['/age-select'] });

  return createRouter({
    routeTree: testRouteTree,
    history,
  });
};

describe('AgeSelect Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the age input and continue button', async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByPlaceholderText('How old are you ?')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /continue/i })
    ).toBeInTheDocument();
  });

  it('sets store state and navigates on valid submission', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const input = await screen.findByPlaceholderText('How old are you ?');
    await user.type(input, '25');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(useStore.setState).toHaveBeenCalledWith({ age: 25 });
    });

    // Check that we moved to the next page
    expect(await screen.findByText('Weight Select Page')).toBeInTheDocument();
  });

  it('shows a validation error for age below minimum (< 10)', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const input = await screen.findByPlaceholderText('How old are you ?');
    await user.type(input, '5');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      // Assuming your component shows an alert/error message
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(useStore.setState).not.toHaveBeenCalled();
  });

  it('shows a validation error for age above maximum (> 100)', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const input = await screen.findByPlaceholderText('How old are you ?');
    await user.type(input, '150');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(useStore.setState).not.toHaveBeenCalled();
  });

  it('does not submit or navigate when input is empty', async () => {
    const user = userEvent.setup();
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    await screen.findByPlaceholderText('How old are you ?');
    await user.click(screen.getByRole('button', { name: /continue/i }));

    expect(useStore.setState).not.toHaveBeenCalled();
    expect(screen.queryByText('Weight Select Page')).not.toBeInTheDocument();
  });
});
