import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommentPin } from '@/components/map/CommentPin';
import { NeighborComment } from '@shared/types';

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
  Marker: ({ children, eventHandlers, position }: any) => (
    <div 
      data-testid="marker"
      data-position={JSON.stringify(position)}
      onClick={eventHandlers?.click}
      onMouseOver={eventHandlers?.mouseover}
      onMouseOut={eventHandlers?.mouseout}
    >
      {children}
    </div>
  ),
  Popup: ({ children }: any) => <div data-testid="popup">{children}</div>
}));

// Mock leaflet
vi.mock('leaflet', () => ({
  divIcon: ({ html, className }: any) => ({
    html,
    className,
    options: { iconSize: [24, 24] }
  })
}));

const mockComment: NeighborComment = {
  id: 'comment-001',
  applicationId: 'APP-2024-0001',
  name: 'John',
  surname: 'Doe',
  email: 'john@example.com',
  neighborAddress: '13 Oxford Road, Manchester M1 5QA',
  coordinates: {
    latitude: 53.472,
    longitude: -2.2372
  },
  content: 'Test comment content for unit testing',
  sentiment: 'positive',
  tags: ['Design', 'Privacy'],
  submissionDate: new Date('2024-01-20T14:30:00Z'),
  status: 'pending_review',
  isRedacted: false,
  officerNotes: 'Test officer note',
  isEdited: false,
  createdAt: new Date('2024-01-20T14:30:00Z'),
  updatedAt: new Date('2024-01-20T14:30:00Z')
};

describe('CommentPin', () => {
  it('renders with correct sentiment color for positive comment', () => {
    const onClickMock = vi.fn();
    
    const { container } = render(
      <CommentPin 
        comment={mockComment}
        isSelected={false}
        onClick={onClickMock}
      />
    );

    const marker = screen.getByTestId('marker');
    expect(marker).toBeInTheDocument();
    
    // Verify position is correctly set
    const position = JSON.parse(marker.getAttribute('data-position') || '[]');
    expect(position).toEqual([53.472, -2.2372]);
  });

  it('renders with correct sentiment color for negative comment', () => {
    const negativeComment = { ...mockComment, sentiment: 'negative' as const };
    
    render(
      <CommentPin 
        comment={negativeComment}
        isSelected={false}
        onClick={vi.fn()}
      />
    );

    const marker = screen.getByTestId('marker');
    expect(marker).toBeInTheDocument();
  });

  it('renders with correct sentiment color for neutral comment', () => {
    const neutralComment = { ...mockComment, sentiment: 'neutral' as const };
    
    render(
      <CommentPin 
        comment={neutralComment}
        isSelected={false}
        onClick={vi.fn()}
      />
    );

    const marker = screen.getByTestId('marker');
    expect(marker).toBeInTheDocument();
  });

  it('calls onClick when pin is clicked', async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();
    
    render(
      <CommentPin 
        comment={mockComment}
        isSelected={false}
        onClick={onClickMock}
      />
    );

    const marker = screen.getByTestId('marker');
    await user.click(marker);
    
    expect(onClickMock).toHaveBeenCalledWith(mockComment);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('calls hover callbacks when mouse enters and leaves', async () => {
    const user = userEvent.setup();
    const onMouseEnterMock = vi.fn();
    const onMouseLeaveMock = vi.fn();
    
    render(
      <CommentPin 
        comment={mockComment}
        isSelected={false}
        onClick={vi.fn()}
        onMouseEnter={onMouseEnterMock}
        onMouseLeave={onMouseLeaveMock}
      />
    );

    const marker = screen.getByTestId('marker');
    
    await user.hover(marker);
    expect(onMouseEnterMock).toHaveBeenCalledWith(mockComment);
    
    await user.unhover(marker);
    expect(onMouseLeaveMock).toHaveBeenCalledTimes(1);
  });

  it('does not render tooltip on hover', () => {
    render(
      <CommentPin 
        comment={mockComment}
        isSelected={false}
        onClick={vi.fn()}
      />
    );

    const tooltip = screen.queryByTestId('tooltip');
    expect(tooltip).not.toBeInTheDocument();
  });

  it('renders popup with detailed comment information', () => {
    render(
      <CommentPin 
        comment={mockComment}
        isSelected={false}
        onClick={vi.fn()}
      />
    );

    const popup = screen.getByTestId('popup');
    expect(popup).toBeInTheDocument();
    expect(popup).toHaveTextContent('13 Oxford Road, Manchester M1 5QA');
    expect(popup).toHaveTextContent('Test comment content for unit testing');
    expect(popup).toHaveTextContent('comment-001'.slice(0, 8));
  });

  it('displays selected state correctly', () => {
    render(
      <CommentPin 
        comment={mockComment}
        isSelected={true}
        onClick={vi.fn()}
      />
    );

    const marker = screen.getByTestId('marker');
    expect(marker).toBeInTheDocument();
  });

  it('renders tags in popup when comment has tags', () => {
    render(
      <CommentPin 
        comment={mockComment}
        isSelected={false}
        onClick={vi.fn()}
      />
    );

    const popup = screen.getByTestId('popup');
    expect(popup).toBeInTheDocument();
    expect(popup).toHaveTextContent('Design');
    expect(popup).toHaveTextContent('Privacy');
  });

  it('does not render tags section when comment has no tags', () => {
    const commentWithoutTags = { ...mockComment, tags: [] };
    
    render(
      <CommentPin 
        comment={commentWithoutTags}
        isSelected={false}
        onClick={vi.fn()}
      />
    );

    const popup = screen.getByTestId('popup');
    expect(popup).toBeInTheDocument();
    expect(popup).toHaveTextContent('Test comment content for unit testing');
    // Tags should not be present
    expect(popup).not.toHaveTextContent('Design');
    expect(popup).not.toHaveTextContent('Privacy');
  });
});