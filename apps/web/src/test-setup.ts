import '@testing-library/jest-dom'

// Mock Next.js router
import { vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  usePathname: vi.fn(() => '/'),
}))

// Mock Leaflet for testing (since it requires DOM)
vi.mock('leaflet', () => ({
  map: vi.fn(),
  tileLayer: vi.fn(),
  marker: vi.fn(),
  icon: vi.fn(),
  divIcon: vi.fn(),
}))