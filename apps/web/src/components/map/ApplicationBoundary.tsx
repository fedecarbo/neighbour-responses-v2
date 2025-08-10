"use client"

import React, { useMemo } from 'react';
import { Polygon, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { PlanningApplication } from '@shared/types';
import { Badge } from '@/components/ui/badge';

interface ApplicationBoundaryProps {
  application: PlanningApplication;
  onClick?: (application: PlanningApplication) => void;
  onMouseEnter?: (application: PlanningApplication) => void;
  onMouseLeave?: (application: PlanningApplication) => void;
}

export const ApplicationBoundary: React.FC<ApplicationBoundaryProps> = React.memo(({
  application,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  // Convert boundary coordinates to Leaflet format
  const polygonCoordinates = useMemo<LatLngExpression[]>(() => {
    if (!application.boundary) return [];
    
    return application.boundary.coordinates.map(coord => [
      coord.latitude,
      coord.longitude
    ] as LatLngExpression);
  }, [application.boundary]);

  const handleClick = () => {
    if (onClick) {
      onClick(application);
    }
  };

  const handleMouseEnter = () => {
    if (onMouseEnter) {
      onMouseEnter(application);
    }
  };

  const handleMouseLeave = () => {
    if (onMouseLeave) {
      onMouseLeave(application);
    }
  };

  // Don't render if no boundary data
  if (!application.boundary || polygonCoordinates.length === 0) {
    return null;
  }

  const boundary = application.boundary;

  return (
    <Polygon
      positions={polygonCoordinates}
      pathOptions={{
        color: boundary.color || '#3b82f6',
        fillColor: boundary.fillColor || '#3b82f6',
        fillOpacity: boundary.fillOpacity || 0.2,
        weight: 3,
        opacity: 0.8
      }}
      eventHandlers={{
        click: handleClick,
        mouseover: handleMouseEnter,
        mouseout: handleMouseLeave,
      }}
    >
      <Popup maxWidth={350} closeButton={true}>
        <div className="p-2">
          <h3 className="font-semibold text-sm mb-2">Planning Application Site</h3>
          <div className="space-y-2">
            <div>
              <span className="font-medium text-xs text-muted-foreground">Reference:</span>
              <p className="text-sm">{application.reference}</p>
            </div>
            <div>
              <span className="font-medium text-xs text-muted-foreground">Address:</span>
              <p className="text-sm">{application.address}</p>
            </div>
            <div>
              <span className="font-medium text-xs text-muted-foreground">Description:</span>
              <p className="text-sm line-clamp-3">{application.description}</p>
            </div>
            <div>
              <span className="font-medium text-xs text-muted-foreground">Applicant:</span>
              <p className="text-sm">{application.applicantName}</p>
            </div>
            <div>
              <span className="font-medium text-xs text-muted-foreground">Site Type:</span>
              <p className="text-sm capitalize">{boundary.type}</p>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
              <span>ID: {application.id}</span>
              <span>{new Date(application.submissionDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Popup>
    </Polygon>
  );
});

ApplicationBoundary.displayName = 'ApplicationBoundary';