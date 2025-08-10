import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApplicationPin } from '@/components/map/ApplicationPin';
import { PlanningApplication } from '@shared/types';

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
  Marker: ({ children, eventHandlers, position, zIndexOffset }: any) => (
    <div 
      data-testid="application-marker"
      data-position={JSON.stringify(position)}
      data-z-index={zIndexOffset}
      onClick={eventHandlers?.click}
      onMouseOver={eventHandlers?.mouseover}
      onMouseOut={eventHandlers?.mouseout}
    >
      {children}
    </div>
  ),
  Tooltip: ({ children }: any) => <div data-testid="application-tooltip">{children}</div>,
  Popup: ({ children }: any) => <div data-testid="application-popup">{children}</div>
}));

// Mock leaflet
vi.mock('leaflet', () => ({
  divIcon: ({ html, className }: any) => ({
    html,
    className,
    options: { iconSize: [40, 40] }
  })
}));

const mockApplication: PlanningApplication = {
  id: 'APP-2024-0001',
  reference: '24/00001/FUL',
  address: '15 Oxford Road, Manchester M1 5QA',
  description: 'Proposed two-story rear extension to existing residential property',
  applicantName: 'John Smith',
  submissionDate: '2024-01-15T09:00:00Z',
  coordinates: {
    latitude: 53.4722,
    longitude: -2.2374
  },
  status: 'consultation',
  comments: []
};

describe('ApplicationPin', () => {
  it('renders application pin with correct position', () => {
    const onClickMock = vi.fn();
    
    render(
      <ApplicationPin 
        application={mockApplication}
        onClick={onClickMock}
      />
    );

    const marker = screen.getByTestId('application-marker');
    expect(marker).toBeInTheDocument();
    
    // Verify position is correctly set
    const position = JSON.parse(marker.getAttribute('data-position') || '[]');
    expect(position).toEqual([53.4722, -2.2374]);
    
    // Verify highest z-index
    expect(marker.getAttribute('data-z-index')).toBe('1000');
  });

  it('calls onClick when application pin is clicked', async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();
    
    render(
      <ApplicationPin 
        application={mockApplication}
        onClick={onClickMock}
      />
    );

    const marker = screen.getByTestId('application-marker');
    await user.click(marker);
    
    expect(onClickMock).toHaveBeenCalledWith(mockApplication);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('calls hover callbacks when mouse enters and leaves', async () => {
    const user = userEvent.setup();
    const onMouseEnterMock = vi.fn();
    const onMouseLeaveMock = vi.fn();
    
    render(
      <ApplicationPin 
        application={mockApplication}
        onClick={vi.fn()}
        onMouseEnter={onMouseEnterMock}
        onMouseLeave={onMouseLeaveMock}
      />
    );

    const marker = screen.getByTestId('application-marker');
    
    await user.hover(marker);
    expect(onMouseEnterMock).toHaveBeenCalledWith(mockApplication);
    
    await user.unhover(marker);
    expect(onMouseLeaveMock).toHaveBeenCalledTimes(1);
  });

  it('renders tooltip with application information', () => {
    render(
      <ApplicationPin 
        application={mockApplication}
        onClick={vi.fn()}
      />
    );

    const tooltip = screen.getByTestId('application-tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Planning Application');
    expect(tooltip).toHaveTextContent('15 Oxford Road, Manchester M1 5QA');
    expect(tooltip).toHaveTextContent('24/00001/FUL');
  });

  it('renders popup with detailed application information', () => {
    render(
      <ApplicationPin 
        application={mockApplication}
        onClick={vi.fn()}
      />
    );

    const popup = screen.getByTestId('application-popup');
    expect(popup).toBeInTheDocument();
    expect(popup).toHaveTextContent('Planning Application');
    expect(popup).toHaveTextContent('24/00001/FUL');
    expect(popup).toHaveTextContent('15 Oxford Road, Manchester M1 5QA');
    expect(popup).toHaveTextContent('Proposed two-story rear extension');
    expect(popup).toHaveTextContent('John Smith');
    expect(popup).toHaveTextContent('APP-2024');
  });

  it('displays application reference in badge format', () => {
    render(
      <ApplicationPin 
        application={mockApplication}
        onClick={vi.fn()}
      />
    );

    const tooltip = screen.getByTestId('application-tooltip');
    expect(tooltip).toHaveTextContent('24/00001/FUL');
  });
});