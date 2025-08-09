/**
 * Map configuration for UK planning applications
 * Using OpenStreetMap tiles for UK geographic data
 */

export const UK_MAP_CONFIG = {
  // Default center point for UK (approximate center)
  defaultCenter: [54.3781, -3.4360] as [number, number],
  defaultZoom: 6,
  
  // UK bounding box
  ukBounds: {
    north: 60.9,
    south: 49.8,
    east: 1.8,
    west: -8.2,
  },
  
  // OpenStreetMap tile configuration
  tileLayer: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    minZoom: 5,
  },
  
  // Map interaction settings
  interaction: {
    zoomControl: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    dragging: true,
  },
};