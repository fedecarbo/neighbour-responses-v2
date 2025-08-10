"use client"

import React, { useMemo } from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import { divIcon, DivIcon } from 'leaflet';
import { PlanningApplication } from '@shared/types';
import { Badge } from '@/components/ui/badge';
import { UK_MAP_CONFIG } from '@/utils/mapConfig';

interface ApplicationPinProps {
  application: PlanningApplication;
  onClick?: (application: PlanningApplication) => void;
  onMouseEnter?: (application: PlanningApplication) => void;
  onMouseLeave?: (application: PlanningApplication) => void;
}

const createApplicationIcon = (): DivIcon => {
  const size = UK_MAP_CONFIG.styling.applicationPin.size;
  const color = UK_MAP_CONFIG.styling.applicationPin.color;
  
  return divIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, ${color}, ${color}dd);
        border: 3px solid white;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: all 0.2s ease;
      ">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
        <div style="
          position: absolute;
          top: -8px;
          right: -8px;
          width: 16px;
          height: 16px;
          background-color: #10b981;
          border: 2px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 6px;
            height: 6px;
            background-color: white;
            border-radius: 50%;
          "></div>
        </div>
      </div>
    `,
    className: 'custom-application-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

export const ApplicationPin: React.FC<ApplicationPinProps> = React.memo(({
  application,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const icon = useMemo(() => createApplicationIcon(), []);

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

  return (
    <Marker
      position={[application.coordinates.latitude, application.coordinates.longitude]}
      icon={icon}
      zIndexOffset={UK_MAP_CONFIG.styling.applicationPin.zIndex} // Highest z-index to stay on top
      eventHandlers={{
        click: handleClick,
        mouseover: handleMouseEnter,
        mouseout: handleMouseLeave,
      }}
    >
      <Tooltip direction="top" offset={[0, -20]} opacity={0.9}>
        <div className="max-w-xs p-2">
          <div className="font-medium text-sm">Planning Application</div>
          <div className="text-xs text-muted-foreground mt-1">
            {application.address}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="default" className="text-xs">
              {application.reference}
            </Badge>
          </div>
        </div>
      </Tooltip>
      
      <Popup maxWidth={350} closeButton={true}>
        <div className="p-2">
          <h3 className="font-semibold text-sm mb-2">Planning Application</h3>
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
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
              <span>ID: {application.id}</span>
              <span>{new Date(application.submissionDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
});

ApplicationPin.displayName = 'ApplicationPin';