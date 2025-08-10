import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MapControls } from '@/components/map/MapControls';

describe('MapControls', () => {
  const defaultProps = {
    totalComments: 50,
    visibleComments: 25,
    filterActive: false,
  };

  it('renders with default props', () => {
    render(<MapControls {...defaultProps} />);
    
    expect(screen.getByRole('button', { name: /zoom in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /zoom out/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset map view/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /toggle filters/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /toggle map layers/i })).toBeInTheDocument();
  });

  it('displays comment count correctly', () => {
    render(<MapControls {...defaultProps} />);
    
    expect(screen.getByText('25 of 50')).toBeInTheDocument();
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });

  it('shows filtered badge when filters are active and counts differ', () => {
    render(
      <MapControls 
        {...defaultProps} 
        filterActive={true}
        totalComments={50}
        visibleComments={25}
      />
    );
    
    expect(screen.getByText('Filtered')).toBeInTheDocument();
  });

  it('calls onZoomIn when zoom in button is clicked', () => {
    const onZoomIn = vi.fn();
    render(<MapControls {...defaultProps} onZoomIn={onZoomIn} />);
    
    fireEvent.click(screen.getByRole('button', { name: /zoom in/i }));
    expect(onZoomIn).toHaveBeenCalledTimes(1);
  });

  it('calls onZoomOut when zoom out button is clicked', () => {
    const onZoomOut = vi.fn();
    render(<MapControls {...defaultProps} onZoomOut={onZoomOut} />);
    
    fireEvent.click(screen.getByRole('button', { name: /zoom out/i }));
    expect(onZoomOut).toHaveBeenCalledTimes(1);
  });

  it('calls onResetView when reset button is clicked', () => {
    const onResetView = vi.fn();
    render(<MapControls {...defaultProps} onResetView={onResetView} />);
    
    fireEvent.click(screen.getByRole('button', { name: /reset map view/i }));
    expect(onResetView).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleFilters when filter button is clicked', () => {
    const onToggleFilters = vi.fn();
    render(<MapControls {...defaultProps} onToggleFilters={onToggleFilters} />);
    
    fireEvent.click(screen.getByRole('button', { name: /toggle filters/i }));
    expect(onToggleFilters).toHaveBeenCalledTimes(1);
  });

  it('highlights filter button when filters are active', () => {
    render(<MapControls {...defaultProps} filterActive={true} />);
    
    const filterButton = screen.getByRole('button', { name: /toggle filters/i });
    expect(filterButton).toHaveClass('bg-primary');
  });

  it('supports keyboard navigation', () => {
    render(<MapControls {...defaultProps} />);
    
    const zoomInButton = screen.getByRole('button', { name: /zoom in/i });
    zoomInButton.focus();
    expect(zoomInButton).toHaveFocus();
  });
});