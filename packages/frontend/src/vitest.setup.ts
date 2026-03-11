import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

if (typeof document === 'undefined') {
  throw new Error('document is not defined - jsdom/happy-dom not set up');
}

afterEach(() => {
  cleanup();
});
