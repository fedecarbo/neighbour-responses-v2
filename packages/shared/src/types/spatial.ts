/**
 * Geographic coordinate types for UK planning applications
 * Simplified for prototype - Story 1.4
 */

export interface GeographicCoordinate {
  latitude: number;      // UK range: ~49.8 to 60.9
  longitude: number;     // UK range: ~-8.2 to 1.8
}

/**
 * Polygon boundary for planning applications
 * Simple polygon coordinates for site boundaries
 */
export interface PolygonBoundary {
  coordinates: GeographicCoordinate[];  // Array of coordinates forming the polygon
  type: 'site' | 'proposed' | 'existing';  // Type of boundary
  color?: string;                       // Optional color for rendering
  fillColor?: string;                  // Optional fill color
  fillOpacity?: number;               // Optional fill opacity (0-1)
}