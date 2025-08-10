"use client"

import React, { useCallback, useState } from 'react';
import { PlanningApplication, NeighborComment } from '@shared/types';
import { MapContainer } from './MapContainer';
import { ApplicationPin } from './ApplicationPin';
import { CommentPin } from './CommentPin';
import { MapThemeSelector } from './MapThemeSelector';
import { MapTheme, UK_MAP_CONFIG } from '@/utils/mapConfig';

interface MapComponentProps {
  application: PlanningApplication;
  comments: NeighborComment[];
  onCommentPinClick?: (commentId: string) => void;
  onApplicationPinClick?: (applicationId: string) => void;
  selectedCommentIds?: string[];
  height?: string;
  className?: string;
}

export const MapComponent: React.FC<MapComponentProps> = React.memo(({
  application,
  comments,
  onCommentPinClick,
  onApplicationPinClick,
  selectedCommentIds = [],
  height = '600px',
  className = ''
}) => {
  const [hoveredComment, setHoveredComment] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<MapTheme>(UK_MAP_CONFIG.defaultTheme);

  const handleCommentPinClick = useCallback((comment: NeighborComment) => {
    console.log('Comment pin clicked:', {
      commentId: comment.id,
      neighborAddress: comment.neighborAddress,
      sentiment: comment.sentiment,
      coordinates: comment.coordinates
    });
    
    if (onCommentPinClick) {
      onCommentPinClick(comment.id);
    }
  }, [onCommentPinClick]);

  const handleApplicationPinClick = useCallback((app: PlanningApplication) => {
    console.log('Application pin clicked:', {
      applicationId: app.id,
      reference: app.reference,
      address: app.address,
      coordinates: app.coordinates
    });
    
    if (onApplicationPinClick) {
      onApplicationPinClick(app.id);
    }
  }, [onApplicationPinClick]);

  const handleCommentPinHover = useCallback((comment: NeighborComment) => {
    setHoveredComment(comment.id);
  }, []);

  const handleCommentPinLeave = useCallback(() => {
    setHoveredComment(null);
  }, []);

  // Validate application data after all hooks
  if (!application) {
    return (
      <div className={`w-full ${className}`}>
        <div 
          className="h-[600px] flex items-center justify-center bg-muted/20 border border-border rounded-md"
          style={{ height }}
        >
          <div className="text-muted-foreground">Loading application data...</div>
        </div>
      </div>
    );
  }

  if (!application.coordinates) {
    console.error('Application missing coordinates:', application);
    return (
      <div className={`w-full ${className}`}>
        <div 
          className="h-[600px] flex items-center justify-center bg-muted/20 border border-border rounded-md"
          style={{ height }}
        >
          <div className="text-destructive">Error: Application coordinates missing</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Theme Selector */}
      <div className="mb-3 flex justify-end">
        <MapThemeSelector 
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
        />
      </div>
      
      <MapContainer
        center={application.coordinates}
        zoom={18} // Immediate vicinity as specified in story
        height={height}
        width="100%"
        theme={currentTheme}
        className="rounded-md border"
      >
        {/* Application Pin - highest z-index */}
        <ApplicationPin
          application={application}
          onClick={handleApplicationPinClick}
        />
        
        {/* Comment Pins with sentiment color coding */}
        {comments.map((comment) => {
          const isSelected = selectedCommentIds.includes(comment.id);
          const isHovered = hoveredComment === comment.id;
          
          return (
            <CommentPin
              key={comment.id}
              comment={comment}
              isSelected={isSelected || isHovered}
              onClick={handleCommentPinClick}
              onMouseEnter={handleCommentPinHover}
              onMouseLeave={handleCommentPinLeave}
            />
          );
        })}
      </MapContainer>
      
      {/* Map Legend */}
      <div className="mt-3 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 border-2 border-white rounded shadow-sm"></div>
          <span className="text-muted-foreground">Planning Application</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 border border-white rounded-full shadow-sm"></div>
          <span className="text-muted-foreground">Positive</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 border border-white rounded-full shadow-sm"></div>
          <span className="text-muted-foreground">Neutral</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 border border-white rounded-full shadow-sm"></div>
          <span className="text-muted-foreground">Negative</span>
        </div>
      </div>
    </div>
  );
});

MapComponent.displayName = 'MapComponent';