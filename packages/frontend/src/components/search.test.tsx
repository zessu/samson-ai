import { test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../test-utils';
import { AISearchBar } from './search.tsx';

test('shows placeholder input', () => {
  // ARRANGE
  const searchFunc = vi.fn();
  render(<AISearchBar onSearch={searchFunc} />);

  // ASSERT
  expect(
    screen.getByPlaceholderText('Ask Samson Anything ...')
  ).toBeInTheDocument();
});

test('Contains AI content warning text', () => {
  // ARRANGE
  const searchFunc = vi.fn();
  render(<AISearchBar onSearch={searchFunc} />);

  // ASSERT
  expect(
    screen.getByText(/AI-generated content may be inaccurate/i)
  ).toBeInTheDocument();
});

test('Calls api function when button is clicked', async () => {
  // ARRANGE
  const searchFunc = vi.fn();
  render(<AISearchBar onSearch={searchFunc} />);

  // ACT
  await userEvent.type(
    screen.getByPlaceholderText(/Ask Samson Anything/i),
    'how can we get to mars'
  );

  await userEvent.click(screen.getByRole('button'));

  // ASSERT
  expect(searchFunc).toHaveBeenCalledWith('how can we get to mars');
});
