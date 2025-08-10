import { render, screen } from '@testing-library/react'
import { TabNavigation } from '@/components/layout/TabNavigation'
import { FilterProvider } from '@/context/FilterContext'
import { TabNavigationProvider } from '@/context/TabNavigationContext'
import { vi } from 'vitest'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  })
}))

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <FilterProvider>
    <TabNavigationProvider>
      {children}
    </TabNavigationProvider>
  </FilterProvider>
)

describe('TabNavigation', () => {
  it('renders children within app layout', () => {
    render(
      <TestWrapper>
        <TabNavigation 
          applicationId="APP-2024-001"
          activeTab="dashboard"
        >
          <div>Tab content</div>
        </TabNavigation>
      </TestWrapper>
    )
    
    expect(screen.getByText('Tab content')).toBeInTheDocument()
    expect(screen.getByText('Planning Application APP-2024-001')).toBeInTheDocument()
  })

  it('renders with correct active tab', () => {
    render(
      <TestWrapper>
        <TabNavigation 
          applicationId="APP-2024-001"
          activeTab="comments"
        >
          <div>Comments content</div>
        </TabNavigation>
      </TestWrapper>
    )
    
    const commentsTab = screen.getByRole('tab', { name: 'Switch to comments view' })
    expect(commentsTab).toHaveAttribute('data-state', 'active')
  })
})