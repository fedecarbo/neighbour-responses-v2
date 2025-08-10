/**
 * Planning application types for UK local authorities
 * Simplified for prototype - Story 1.4
 */

import { GeographicCoordinate } from './spatial';
import { NeighborComment } from './comments';

export interface PlanningApplication {
  id: string;
  reference: string;
  address: string;
  description: string;
  applicantName: string;
  submissionDate: string;
  coordinates: GeographicCoordinate;
  status: string;
  comments: NeighborComment[];
}