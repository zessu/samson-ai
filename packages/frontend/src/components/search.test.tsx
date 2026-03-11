import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../test-utils';
import { AISearchBar } from './search.tsx';

test('shows placeholder input', () => {
  const searchFunc = vi.fn();
  render(<AISearchBar onSearch={searchFunc} />);

  expect(
    screen.getByPlaceholderText('Ask Samson Anything ...')
  ).toBeInTheDocument();
});

test('Contains AI content warning text', () => {
  const searchFunc = vi.fn();
  render(<AISearchBar onSearch={searchFunc} />);

  expect(
    screen.getByText(/AI-generated content may be inaccurate/i)
  ).toBeInTheDocument();
});

test('Calls api function when button is clicked', async () => {
  const searchFunc = vi.fn();
  render(<AISearchBar onSearch={searchFunc} />);

  await userEvent.type(
    screen.getByPlaceholderText(/Ask Samson Anything/i),
    'how can we get to mars'
  );

  await userEvent.click(screen.getByRole('button'));

  expect(searchFunc).toHaveBeenCalledWith('how can we get to mars');
});

test('Button is not disabled when component is loaded', async () => {
  const searchFunc = vi.fn();
  render(<AISearchBar onSearch={searchFunc} isLoading={false} />);

  expect(screen.getByRole('button')).not.toBeDisabled();
});

test('Button is disabled when loading is true', async () => {
  const searchFunc = vi.fn();
  render(<AISearchBar onSearch={searchFunc} isLoading={true} />);

  expect(screen.getByRole('button')).toBeDisabled();
});
