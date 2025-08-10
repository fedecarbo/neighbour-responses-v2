/**
 * Planning application types for UK local authorities
 * Simplified for prototype - Story 1.4
 */

import { GeographicCoordinate, PolygonBoundary } from './spatial';
import { NeighborComment } from './comments';

export interface PlanningApplication {
  id: string;
  reference: string;
  address: string;
  description: string;
  applicantName: string;
  submissionDate: string;
  coordinates: GeographicCoordinate;
  boundary?: PolygonBoundary;  // Optional polygon boundary for site outline
  status: string;
  comments: NeighborComment[];
}