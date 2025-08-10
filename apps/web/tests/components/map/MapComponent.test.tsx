import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MapComponent } from '@/components/map/MapComponent';
import { PlanningApplication, NeighborComment } from '@shared/types';

// Mock dynamic imports
vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: (importFn: any, options?: any) => {
    // Extract the component name from the import function
    const importString = importFn.toString();
    
    if (importString.includes('MapContainer')) {
      return ({ children, center, zoom, height, onMapReady }: any) => (
        <div 
          data-testid="map-container"
          data-center={JSON.stringify(center)}
          data-zoom={zoom}
          style={{ height }}
        >
          {children}
        </div>
      );
    }
    
    if (importString.includes('ApplicationBoundary')) {
      return ({ application, onClick }: any) => (
        <div 
          data-testid="application-boundary"
          data-application-id={application.id}
          onClick={() => onClick?.(application)}
        >
          Application Site: {application.reference}
        </div>
      );
    }
    
    if (importString.includes('CommentPin')) {
      return ({ comment, isSelected, onClick, onMouseEnter, onMouseLeave }: any) => (
        <div 
          data-testid="comment-pin"
          data-comment-id={comment.id}
          data-selected={isSelected}
          onClick={() => onClick?.(comment)}
          onMouseEnter={() => onMouseEnter?.(comment)}
          onMouseLeave={() => onMouseLeave?.()}
        >
          Comment: {comment.neighborAddress} - {comment.sentiment}
        </div>
      );
    }
    
    // Default fallback
    return ({ children, ...props }: any) => (
      <div data-testid="mock-dynamic-component" {...props}>{children}</div>
    );
  }
}));

// Mock loading spinner for dynamic imports  
vi.mock('@/components/shared/LoadingSpinner', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>
}));

const mockApplication: PlanningApplication = {
  id: 'APP-2024-0001',
  reference: '24/00001/FUL',
  address: '15 Oxford Road, Manchester M1 5QA',
  description: 'Proposed two-story rear extension',
  applicantName: 'John Smith',
  submissionDate: '2024-01-15T09:00:00Z',
  coordinates: {
    latitude: 53.4722,
    longitude: -2.2374
  },
  status: 'consultation',
  comments: []
};

const mockComments: NeighborComment[] = [
  {
    id: 'comment-001',
    neighborAddress: '13 Oxford Road, Manchester M1 5QA',
    coordinates: { latitude: 53.472, longitude: -2.2372 },
    content: 'Positive comment about the extension',
    sentiment: 'positive',
    submissionDate: '2024-01-20T14:30:00Z'
  },
  {
    id: 'comment-002',
    neighborAddress: '17 Oxford Road, Manchester M1 5QA',
    coordinates: { latitude: 53.4724, longitude: -2.2376 },
    content: 'Concerns about the proposed extension',
    sentiment: 'negative',
    submissionDate: '2024-01-22T10:15:00Z'
  },
  {
    id: 'comment-003',
    neighborAddress: '11 Oxford Road, Manchester M1 5QA',
    coordinates: { latitude: 53.4718, longitude: -2.237 },
    content: 'Neutral comment about the extension',
    sentiment: 'neutral',
    submissionDate: '2024-01-25T16:45:00Z'
  }
];

describe('MapComponent', () => {
  it('renders map container with correct center and zoom', () => {
    render(
      <MapComponent
        application={mockApplication}
        comments={mockComments}
      />
    );

    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
    
    const center = JSON.parse(mapContainer.getAttribute('data-center') || '{}');
    expect(center).toEqual(mockApplication.coordinates);
    
    expect(mapContainer.getAttribute('data-zoom')).toBe('18');
  });

  it('renders application boundary', () => {
    render(
      <MapComponent
        application={mockApplication}
        comments={mockComments}
      />
    );

    const applicationBoundary = screen.getByTestId('application-boundary');
    expect(applicationBoundary).toBeInTheDocument();
    expect(applicationBoundary).toHaveTextContent('24/00001/FUL');
    expect(applicationBoundary.getAttribute('data-application-id')).toBe('APP-2024-0001');
  });

  it('renders all comment pins with correct sentiment', () => {
    render(
      <MapComponent
        application={mockApplication}
        comments={mockComments}
      />
    );

    const commentPins = screen.getAllByTestId('comment-pin');
    expect(commentPins).toHaveLength(3);
    
    expect(commentPins[0]).toHaveTextContent('positive');
    expect(commentPins[1]).toHaveTextContent('negative');
    expect(commentPins[2]).toHaveTextContent('neutral');
  });

  it('renders map legend with sentiment colors', () => {
    render(
      <MapComponent
        application={mockApplication}
        comments={mockComments}
      />
    );

    expect(screen.getByText('Application Site')).toBeInTheDocument();
    expect(screen.getByText('Positive')).toBeInTheDocument();
    expect(screen.getByText('Neutral')).toBeInTheDocument();
    expect(screen.getByText('Negative')).toBeInTheDocument();
  });

  it('handles comment pin clicks with console logging', async () => {
    const user = userEvent.setup();
    const onCommentPinClickMock = vi.fn();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation();

    render(
      <MapComponent
        application={mockApplication}
        comments={mockComments}
        onCommentPinClick={onCommentPinClickMock}
      />
    );

    const firstCommentPin = screen.getAllByTestId('comment-pin')[0];
    await user.click(firstCommentPin);

    expect(consoleSpy).toHaveBeenCalledWith('Comment pin clicked:', expect.objectContaining({
      commentId: 'comment-001',
      neighborAddress: '13 Oxford Road, Manchester M1 5QA',
      sentiment: 'positive'
    }));

    expect(onCommentPinClickMock).toHaveBeenCalledWith('comment-001');
    
    consoleSpy.mockRestore();
  });

  it('handles application boundary clicks with console logging', async () => {
    const user = userEvent.setup();
    const onApplicationPinClickMock = vi.fn();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation();

    render(
      <MapComponent
        application={mockApplication}
        comments={mockComments}
        onApplicationPinClick={onApplicationPinClickMock}
      />
    );

    const applicationBoundary = screen.getByTestId('application-boundary');
    await user.click(applicationBoundary);

    expect(consoleSpy).toHaveBeenCalledWith('Application pin clicked:', expect.objectContaining({
      applicationId: 'APP-2024-0001',
      reference: '24/00001/FUL'
    }));

    expect(onApplicationPinClickMock).toHaveBeenCalledWith('APP-2024-0001');
    
    consoleSpy.mockRestore();
  });

  it('handles comment pin selection state', () => {
    const selectedCommentIds = ['comment-001', 'comment-002'];

    render(
      <MapComponent
        application={mockApplication}
        comments={mockComments}
        selectedCommentIds={selectedCommentIds}
      />
    );

    const commentPins = screen.getAllByTestId('comment-pin');
    expect(commentPins[0].getAttribute('data-selected')).toBe('true');
    expect(commentPins[1].getAttribute('data-selected')).toBe('true');
    expect(commentPins[2].getAttribute('data-selected')).toBe('false');
  });

  it('handles comment pin hover states', async () => {
    const user = userEvent.setup();

    render(
      <MapComponent
        application={mockApplication}
        comments={mockComments}
      />
    );

    const firstCommentPin = screen.getAllByTestId('comment-pin')[0];
    
    await user.hover(firstCommentPin);
    expect(firstCommentPin.getAttribute('data-selected')).toBe('true'); // Should be hovered
    
    await user.unhover(firstCommentPin);
    expect(firstCommentPin.getAttribute('data-selected')).toBe('false'); // Should no longer be hovered
  });

  it('uses custom height when provided', () => {
    render(
      <MapComponent
        application={mockApplication}
        comments={mockComments}
        height="600px"
      />
    );

    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toHaveStyle({ height: '600px' });
  });
});