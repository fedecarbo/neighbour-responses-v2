import { render, screen } from '@testing-library/react'
import { AppLayout } from '@/components/layout/AppLayout'
import { vi } from 'vitest'

describe('AppLayout', () => {
  const mockOnTabChange = vi.fn()
  
  beforeEach(() => {
    mockOnTabChange.mockClear()
  })

  it('renders with application ID', () => {
    render(
      <AppLayout 
        applicationId="APP-2024-001"
        activeTab="dashboard"
        onTabChange={mockOnTabChange}
      >
        <div>Test content</div>
      </AppLayout>
    )
    
    expect(screen.getByText('Planning Application APP-2024-001')).toBeInTheDocument()
    expect(screen.getByText('Review and analyze neighbor responses for this planning application')).toBeInTheDocument()
  })

  it('renders Dashboard and Comments tabs', () => {
    render(
      <AppLayout 
        applicationId="APP-2024-001"
        activeTab="dashboard"
        onTabChange={mockOnTabChange}
      >
        <div>Test content</div>
      </AppLayout>
    )
    
    expect(screen.getByRole('tab', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Comments' })).toBeInTheDocument()
  })

  it('displays children content', () => {
    render(
      <AppLayout 
        applicationId="APP-2024-001"
        activeTab="dashboard"
        onTabChange={mockOnTabChange}
      >
        <div>Test content</div>
      </AppLayout>
    )
    
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('shows correct active tab', () => {
    render(
      <AppLayout 
        applicationId="APP-2024-001"
        activeTab="comments"
        onTabChange={mockOnTabChange}
      >
        <div>Test content</div>
      </AppLayout>
    )
    
    const commentsTab = screen.getByRole('tab', { name: 'Comments' })
    expect(commentsTab).toHaveAttribute('data-state', 'active')
  })
})