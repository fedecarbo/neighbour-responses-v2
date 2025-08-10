import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApplicationBoundary } from '@/components/map/ApplicationBoundary';
import { PlanningApplication } from '@shared/types';

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
  Polygon: ({ children, eventHandlers, positions, pathOptions }: any) => (
    <div 
      data-testid="application-boundary"
      data-positions={JSON.stringify(positions)}
      data-path-options={JSON.stringify(pathOptions)}
      onClick={eventHandlers?.click}
      onMouseOver={eventHandlers?.mouseover}
      onMouseOut={eventHandlers?.mouseout}
    >
      {children}
    </div>
  ),
  Popup: ({ children }: any) => <div data-testid="application-popup">{children}</div>
}));

const mockApplicationWithBoundary: PlanningApplication = {
  id: 'APP-2024-0001',
  reference: '24/00001/FUL',
  address: '12 Denham St, Manchester M13 0FJ',
  description: 'Proposed two-story rear extension to existing residential property',
  applicantName: 'John Smith',
  submissionDate: '2024-01-15T09:00:00Z',
  coordinates: {
    latitude: 53.459423884469736,
    longitude: -2.2151721822446238
  },
  boundary: {
    coordinates: [
      { latitude: 53.45950, longitude: -2.21525 },
      { latitude: 53.45950, longitude: -2.21510 },
      { latitude: 53.45935, longitude: -2.21510 },
      { latitude: 53.45935, longitude: -2.21525 },
      { latitude: 53.45950, longitude: -2.21525 }
    ],
    type: 'site',
    color: '#3b82f6',
    fillColor: '#3b82f6',
    fillOpacity: 0.2
  },
  status: 'consultation',
  comments: []
};

const mockApplicationNoBoundary: PlanningApplication = {
  id: 'APP-2024-0001',
  reference: '24/00001/FUL',
  address: '12 Denham St, Manchester M13 0FJ',
  description: 'Proposed two-story rear extension to existing residential property',
  applicantName: 'John Smith',
  submissionDate: '2024-01-15T09:00:00Z',
  coordinates: {
    latitude: 53.459423884469736,
    longitude: -2.2151721822446238
  },
  status: 'consultation',
  comments: []
};

describe('ApplicationBoundary', () => {
  it('renders application boundary polygon with correct coordinates', () => {
    const onClickMock = vi.fn();
    
    render(
      <ApplicationBoundary 
        application={mockApplicationWithBoundary}
        onClick={onClickMock}
      />
    );

    const boundary = screen.getByTestId('application-boundary');
    expect(boundary).toBeInTheDocument();
    
    // Verify coordinates are correctly converted to Leaflet format
    const positions = JSON.parse(boundary.getAttribute('data-positions') || '[]');
    expect(positions).toEqual([
      [53.45950, -2.21525],
      [53.45950, -2.21510],
      [53.45935, -2.21510],
      [53.45935, -2.21525],
      [53.45950, -2.21525]
    ]);
  });

  it('renders polygon with correct styling options', () => {
    render(
      <ApplicationBoundary 
        application={mockApplicationWithBoundary}
        onClick={vi.fn()}
      />
    );

    const boundary = screen.getByTestId('application-boundary');
    const pathOptions = JSON.parse(boundary.getAttribute('data-path-options') || '{}');
    
    expect(pathOptions.color).toBe('#3b82f6');
    expect(pathOptions.fillColor).toBe('#3b82f6');
    expect(pathOptions.fillOpacity).toBe(0.2);
    expect(pathOptions.weight).toBe(3);
    expect(pathOptions.opacity).toBe(0.8);
  });

  it('calls onClick when boundary is clicked', async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();
    
    render(
      <ApplicationBoundary 
        application={mockApplicationWithBoundary}
        onClick={onClickMock}
      />
    );

    const boundary = screen.getByTestId('application-boundary');
    await user.click(boundary);
    
    expect(onClickMock).toHaveBeenCalledWith(mockApplicationWithBoundary);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('calls hover callbacks when mouse enters and leaves', async () => {
    const user = userEvent.setup();
    const onMouseEnterMock = vi.fn();
    const onMouseLeaveMock = vi.fn();
    
    render(
      <ApplicationBoundary 
        application={mockApplicationWithBoundary}
        onClick={vi.fn()}
        onMouseEnter={onMouseEnterMock}
        onMouseLeave={onMouseLeaveMock}
      />
    );

    const boundary = screen.getByTestId('application-boundary');
    
    await user.hover(boundary);
    expect(onMouseEnterMock).toHaveBeenCalledWith(mockApplicationWithBoundary);
    
    await user.unhover(boundary);
    expect(onMouseLeaveMock).toHaveBeenCalledTimes(1);
  });

  it('does not render tooltip on hover', () => {
    render(
      <ApplicationBoundary 
        application={mockApplicationWithBoundary}
        onClick={vi.fn()}
      />
    );

    const tooltip = screen.queryByTestId('application-tooltip');
    expect(tooltip).not.toBeInTheDocument();
  });

  it('renders popup with detailed application site information', () => {
    render(
      <ApplicationBoundary 
        application={mockApplicationWithBoundary}
        onClick={vi.fn()}
      />
    );

    const popup = screen.getByTestId('application-popup');
    expect(popup).toBeInTheDocument();
    expect(popup).toHaveTextContent('Planning Application Site');
    expect(popup).toHaveTextContent('24/00001/FUL');
    expect(popup).toHaveTextContent('12 Denham St, Manchester M13 0FJ');
    expect(popup).toHaveTextContent('Proposed two-story rear extension');
    expect(popup).toHaveTextContent('John Smith');
    expect(popup).toHaveTextContent('Site Type:');
    expect(popup).toHaveTextContent('Site');
  });

  it('does not render when no boundary data is provided', () => {
    render(
      <ApplicationBoundary 
        application={mockApplicationNoBoundary}
        onClick={vi.fn()}
      />
    );

    const boundary = screen.queryByTestId('application-boundary');
    expect(boundary).not.toBeInTheDocument();
  });

  it('uses default styling values when not specified in boundary', () => {
    const applicationWithDefaultStyling: PlanningApplication = {
      ...mockApplicationWithBoundary,
      boundary: {
        coordinates: [
          { latitude: 53.45950, longitude: -2.21525 },
          { latitude: 53.45950, longitude: -2.21510 },
          { latitude: 53.45935, longitude: -2.21510 },
          { latitude: 53.45935, longitude: -2.21525 }
        ],
        type: 'site'
      }
    };

    render(
      <ApplicationBoundary 
        application={applicationWithDefaultStyling}
        onClick={vi.fn()}
      />
    );

    const boundary = screen.getByTestId('application-boundary');
    const pathOptions = JSON.parse(boundary.getAttribute('data-path-options') || '{}');
    
    expect(pathOptions.color).toBe('#3b82f6');
    expect(pathOptions.fillColor).toBe('#3b82f6');
    expect(pathOptions.fillOpacity).toBe(0.2);
  });
});