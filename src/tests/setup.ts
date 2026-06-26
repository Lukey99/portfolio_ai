import '@testing-library/jest-dom';

// IntersectionObserver n'existe pas dans jsdom
global.IntersectionObserver = class {
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
} as unknown as typeof IntersectionObserver;

// matchMedia n'existe pas dans jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
