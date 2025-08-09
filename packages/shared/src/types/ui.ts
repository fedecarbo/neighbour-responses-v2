/**
 * UI component prop types and state interfaces
 */

export interface TabNavigationState {
  activeTab: 'dashboard' | 'comments' | 'map';
  previousTab?: 'dashboard' | 'comments' | 'map';
}

export interface MapViewState {
  center: [number, number]; // [lat, lng]
  zoom: number;
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export interface DashboardMetrics {
  totalComments: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  statusBreakdown: {
    pending_review: number;
    approved_for_publication: number;
    confidential: number;
    redacted: number;
  };
}