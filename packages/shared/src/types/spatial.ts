/**
 * Geographic coordinate types for UK planning applications
 * Source: architecture/data-models.md#geographiccoordinate
 */

export interface GeographicCoordinate {
  latitude: number;      // UK range: ~49.8 to 60.9
  longitude: number;     // UK range: ~-8.2 to 1.8
  precision?: number;    // Coordinate accuracy in meters
  source?: string;       // Data source (e.g., "postcode_lookup", "manual_entry")
}