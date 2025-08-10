import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    expect(screen.getByText('Loading...', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('displays custom text when provided', () => {
    render(<LoadingSpinner text="Processing data..." />);

    expect(screen.getByText('Processing data...')).toBeInTheDocument();
  });

  it('applies different size classes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);
    expect(document.querySelector('.h-4')).toBeInTheDocument();

    rerender(<LoadingSpinner size="lg" />);
    expect(document.querySelector('.h-8')).toBeInTheDocument();

    rerender(<LoadingSpinner size="xl" />);
    expect(document.querySelector('.h-12')).toBeInTheDocument();
  });

  it('applies centered class when centered prop is true', () => {
    render(<LoadingSpinner centered />);

    expect(document.querySelector('.justify-center')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" />);

    expect(document.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<LoadingSpinner text="Loading content" />);

    const statusElement = screen.getByRole('status');
    expect(statusElement).toHaveAttribute('aria-label', 'Loading');

    // Screen reader text should be present
    expect(screen.getByText('Loading...', { selector: '.sr-only' })).toBeInTheDocument();
  });

  it('displays text with appropriate size', () => {
    render(<LoadingSpinner size="lg" text="Large loading text" />);

    const textElement = screen.getByText('Large loading text');
    expect(textElement).toHaveClass('text-lg');
  });

  it('shows spinner animation', () => {
    render(<LoadingSpinner />);

    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('text-primary');
  });
});