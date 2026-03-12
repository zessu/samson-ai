import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

if (typeof document === 'undefined') {
  throw new Error('document is not defined - jsdom/happy-dom not set up');
}

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver;

if (typeof window !== 'undefined') {
  window.PointerEvent = window.PointerEvent || class PointerEvent {};
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = () => {};
  }
}

afterEach(() => {
  cleanup();
});
