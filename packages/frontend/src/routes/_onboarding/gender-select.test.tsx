import {
  createRootRoute,
  createRouter,
  createRoute,
  RouterProvider,
  createMemoryHistory,
} from '@tanstack/react-router';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Route as GenderRoute } from './gender-select';

vi.mock('../../state/onboarding', () => ({
  useStore: {
    setState: vi.fn(),
  },
}));

import { useStore } from '../../state/onboarding';

const setupRouter = () => {
  const rootRoute = createRootRoute() as any;

  const genderSelectRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/gender-select',
    component: GenderRoute.options.component,
  });

  const ageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/age-select',
    component: () => <div>Age Select Page</div>,
  });

  const testRouteTree = rootRoute.addChildren([genderSelectRoute, ageRoute]);

  const history = createMemoryHistory({ initialEntries: ['/gender-select'] });

  return createRouter({
    routeTree: testRouteTree,
    history,
  });
};

describe('Gender Select Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the gender radio buttons and next button', async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    expect(
      await screen.findByText('Lets begin by creating your profile')
    ).toBeInTheDocument();

    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('navigates to age-select when male is selected', async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const maleRadio = await screen.findByDisplayValue('male');
    fireEvent.click(maleRadio);

    await fireEvent.submit(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Age Select Page')).toBeInTheDocument();
    });
  });

  it('navigates to age-select when female is selected', async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const femaleRadio = await screen.findByDisplayValue('female');
    fireEvent.click(femaleRadio);

    await fireEvent.submit(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Age Select Page')).toBeInTheDocument();
    });
  });

  it('calls store with selected gender (male)', async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const maleRadio = await screen.findByDisplayValue('male');
    fireEvent.click(maleRadio);

    await fireEvent.submit(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Age Select Page')).toBeInTheDocument();
    });

    expect(useStore.setState).toHaveBeenCalled();
    expect(useStore.setState).toHaveBeenCalledWith({ gender: 'male' });
  });

  it('calls store with selected gender (female)', async () => {
    const router = setupRouter();
    render(<RouterProvider router={router} />);

    const femaleRadio = await screen.findByDisplayValue('female');
    fireEvent.click(femaleRadio);

    await fireEvent.submit(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText('Age Select Page')).toBeInTheDocument();
    });

    expect(useStore.setState).toHaveBeenCalled();
    expect(useStore.setState).toHaveBeenCalledWith({ gender: 'female' });
  });
});
