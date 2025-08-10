/**
 * Map Configuration and Theming System for UK Planning Applications
 * 
 * This module provides a comprehensive theming system for Leaflet maps,
 * supporting multiple professional tile providers and consistent styling
 * that integrates with the Shadcn UI design system.
 * 
 * Features:
 * - Professional themes: Light, Dark, Street, Terrain, Satellite
 * - Centralized color configuration for pins and UI elements
 * - UK-focused geographic bounds and zoom levels
 * - Performance-optimized tile layer configurations
 * 
 * Usage:
 * ```typescript
 * import { MapTheme, getThemeConfig, UK_MAP_CONFIG } from '@/utils/mapConfig';
 * 
 * // Get theme configuration
 * const theme = getThemeConfig('light');
 * 
 * // Access styling configuration
 * const pinColor = UK_MAP_CONFIG.styling.applicationPin.color;
 * ```
 */

export type MapTheme = 'light' | 'dark' | 'street' | 'terrain' | 'satellite';

export interface TileLayerConfig {
  url: string;
  attribution: string;
  maxZoom: number;
  minZoom: number;
  name: string;
  description: string;
}

export const MAP_THEMES: Record<MapTheme, TileLayerConfig> = {
  light: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
    minZoom: 5,
    name: 'Light',
    description: 'Clean, professional light theme ideal for planning applications'
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
    minZoom: 5,
    name: 'Dark',
    description: 'Professional dark theme with excellent contrast for data visualization'
  },
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    minZoom: 5,
    name: 'Street',
    description: 'Standard OpenStreetMap with detailed street information'
  },
  terrain: {
    url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    minZoom: 5,
    name: 'Terrain',
    description: 'Topographical map showing elevation and natural features'
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 19,
    minZoom: 5,
    name: 'Satellite',
    description: 'High-resolution satellite imagery for detailed site analysis'
  }
};

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
  
  // Default theme for planning applications
  defaultTheme: 'light' as MapTheme,
  
  // Map interaction settings
  interaction: {
    zoomControl: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    dragging: true,
  },
  
  // Professional styling for planning context
  styling: {
    applicationPin: {
      color: '#2563eb', // Blue-600
      size: 40,
      zIndex: 1000
    },
    sentimentPins: {
      positive: '#22c55e', // Green-500
      neutral: '#eab308',  // Yellow-500  
      negative: '#ef4444', // Red-500
      size: 24,
      zIndex: 500
    }
  }
};

// Helper function to get theme configuration
export const getThemeConfig = (theme: MapTheme): TileLayerConfig => {
  return MAP_THEMES[theme] || MAP_THEMES.light;
};

// Helper function to get all available themes
export const getAvailableThemes = (): Array<{ value: MapTheme; label: string; description: string }> => {
  return Object.entries(MAP_THEMES).map(([key, config]) => ({
    value: key as MapTheme,
    label: config.name,
    description: config.description
  }));
};