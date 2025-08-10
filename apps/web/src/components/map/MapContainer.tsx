"use client"

import React, { useCallback, useEffect, useRef } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, useMap } from 'react-leaflet';
import { Map as LeafletMap } from 'leaflet';
import { GeographicCoordinate } from '@shared/types';
import { MapTheme, getThemeConfig } from '@/utils/mapConfig';
import 'leaflet/dist/leaflet.css';

interface MapContainerProps {
  center: GeographicCoordinate;
  zoom?: number;
  height?: string;
  width?: string;
  theme?: MapTheme;
  onMapReady?: (map: LeafletMap) => void;
  children?: React.ReactNode;
  className?: string;
}

const MapEventHandler: React.FC<{ onMapReady?: (map: LeafletMap) => void }> = ({ onMapReady }) => {
  const map = useMap();

  useEffect(() => {
    if (onMapReady) {
      onMapReady(map);
    }
  }, [map, onMapReady]);

  return null;
};

export const MapContainer: React.FC<MapContainerProps> = ({
  center,
  zoom = 13,
  height = '400px',
  width = '100%',
  theme = 'light',
  onMapReady,
  children,
  className = ''
}) => {
  const mapRef = useRef<LeafletMap | null>(null);

  const handleMapCreated = useCallback((map: LeafletMap) => {
    mapRef.current = map;
    if (onMapReady) {
      onMapReady(map);
    }
  }, [onMapReady]);

  // Validate center coordinates
  if (!center || typeof center.latitude !== 'number' || typeof center.longitude !== 'number') {
    return (
      <div 
        className={`relative overflow-hidden rounded-md border ${className} flex items-center justify-center`}
        style={{ height, width }}
        role="application"
        aria-label="Map loading"
      >
        <div className="text-muted-foreground">Loading map... (Invalid coordinates)</div>
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden rounded-md border ${className}`}
      style={{ height, width }}
      role="application"
      aria-label="Interactive map showing planning application locations"
    >
      <LeafletMapContainer
        center={[center.latitude, center.longitude]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        touchZoom={true}
        keyboard={true}
        attributionControl={true}
      >
        <TileLayer
          key={theme} // Force re-render when theme changes
          url={getThemeConfig(theme).url}
          attribution={getThemeConfig(theme).attribution}
          maxZoom={getThemeConfig(theme).maxZoom}
          minZoom={getThemeConfig(theme).minZoom}
        />
        <MapEventHandler onMapReady={handleMapCreated} />
        {children}
      </LeafletMapContainer>
    </div>
  );
};