import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AnalyticsWidget } from '@/components/dashboard/AnalyticsWidget';

describe('AnalyticsWidget', () => {
  const mockData = {
    totalComments: 100,
    positiveComments: 60,
    negativeComments: 20,
    neutralComments: 20,
    pendingReview: 15,
    approvedForPublication: 85,
    trend: 'up' as const,
    trendPercentage: 15,
    periodLabel: 'vs last month',
  };

  it('renders with analytics data', () => {
    render(
      <AnalyticsWidget
        data={mockData}
        title="Comment Analytics"
        subtitle="Overview of planning application feedback"
      />
    );

    expect(screen.getByText('Comment Analytics')).toBeInTheDocument();
    expect(screen.getByText('Overview of planning application feedback')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('total comments')).toBeInTheDocument();
  });

  it('displays sentiment distribution correctly', () => {
    render(<AnalyticsWidget data={mockData} title="Analytics" />);

    expect(screen.getByText('Positive')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();

    expect(screen.getByText('Negative')).toBeInTheDocument();
    expect(screen.getAllByText('20')).toHaveLength(2); // Both negative and neutral have 20
    expect(screen.getAllByText('20%')).toHaveLength(2); // Both negative and neutral have 20%

    expect(screen.getByText('Neutral')).toBeInTheDocument();
  });

  it('displays review status summary', () => {
    render(<AnalyticsWidget data={mockData} title="Analytics" />);

    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('Pending Review')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('shows trend indicator with positive trend', () => {
    render(<AnalyticsWidget data={mockData} title="Analytics" />);

    expect(screen.getByText('+15%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('shows trend indicator with negative trend', () => {
    const dataWithNegativeTrend = {
      ...mockData,
      trend: 'down' as const,
      trendPercentage: -10,
    };

    render(<AnalyticsWidget data={dataWithNegativeTrend} title="Analytics" />);

    expect(screen.getByText('-10%')).toBeInTheDocument();
  });

  it('shows trend indicator with stable trend', () => {
    const dataWithStableTrend = {
      ...mockData,
      trend: 'stable' as const,
      trendPercentage: 0,
    };

    render(<AnalyticsWidget data={dataWithStableTrend} title="Analytics" />);

    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('calls onDrillDown when drill-down button is clicked', () => {
    const onDrillDown = vi.fn();
    render(
      <AnalyticsWidget 
        data={mockData} 
        title="Analytics" 
        onDrillDown={onDrillDown} 
      />
    );

    const drillDownButton = screen.getByRole('button', { name: /view detailed analytics/i });
    fireEvent.click(drillDownButton);
    expect(onDrillDown).toHaveBeenCalledTimes(1);
  });

  it('calls onViewDetails when view details button is clicked', () => {
    const onViewDetails = vi.fn();
    render(
      <AnalyticsWidget 
        data={mockData} 
        title="Analytics" 
        onViewDetails={onViewDetails} 
      />
    );

    const viewDetailsButton = screen.getByRole('button', { name: /view detailed report/i });
    fireEvent.click(viewDetailsButton);
    expect(onViewDetails).toHaveBeenCalledTimes(1);
  });

  it('displays loading state correctly', () => {
    render(
      <AnalyticsWidget 
        data={mockData} 
        title="Analytics" 
        isLoading={true} 
      />
    );

    // Check for loading skeleton elements by class
    const loadingElements = document.querySelectorAll('.animate-pulse');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('handles zero comments correctly', () => {
    const dataWithZeroComments = {
      ...mockData,
      totalComments: 0,
      positiveComments: 0,
      negativeComments: 0,
      neutralComments: 0,
    };

    render(<AnalyticsWidget data={dataWithZeroComments} title="Analytics" />);

    expect(screen.getAllByText('0')).toHaveLength(4); // Total comments and three sentiment counts
    expect(screen.getAllByText('0%')).toHaveLength(3); // Three 0% values for sentiments
  });

  it('has proper accessibility attributes', () => {
    render(
      <AnalyticsWidget 
        data={mockData} 
        title="Analytics" 
        onDrillDown={vi.fn()} 
      />
    );

    const drillDownButton = screen.getByRole('button', { name: /view detailed analytics/i });
    expect(drillDownButton).toHaveAttribute('aria-label', 'View detailed analytics');
  });
});