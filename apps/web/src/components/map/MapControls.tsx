"use client"

import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Filter, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface MapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetView?: () => void;
  onToggleFilters?: () => void;
  onToggleLayers?: () => void;
  totalComments?: number;
  visibleComments?: number;
  filterActive?: boolean;
  className?: string;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetView,
  onToggleFilters,
  onToggleLayers,
  totalComments = 0,
  visibleComments = 0,
  filterActive = false,
  className = ''
}) => {
  return (
    <Card className={`absolute top-4 right-4 z-[1000] p-2 ${className}`}>
      <div className="flex flex-col gap-2">
        {/* Zoom Controls */}
        <div className="flex flex-col gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onZoomIn}
            className="h-8 w-8 p-0"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onZoomOut}
            className="h-8 w-8 p-0"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        {/* View Controls */}
        <div className="flex flex-col gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onResetView}
            className="h-8 w-8 p-0"
            aria-label="Reset map view"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        {/* Filter and Layer Controls */}
        <div className="flex flex-col gap-1">
          <Button
            variant={filterActive ? "default" : "outline"}
            size="sm"
            onClick={onToggleFilters}
            className="h-8 w-8 p-0"
            aria-label="Toggle filters"
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleLayers}
            className="h-8 w-8 p-0"
            aria-label="Toggle map layers"
          >
            <Layers className="h-4 w-4" />
          </Button>
        </div>

        {/* Comment Count Display */}
        {totalComments > 0 && (
          <>
            <Separator />
            <div className="flex flex-col gap-1 min-w-[100px]">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>Comments</span>
              </div>
              <div className="flex flex-col gap-1">
                <Badge variant="outline" className="text-xs justify-center">
                  {visibleComments} of {totalComments}
                </Badge>
                {filterActive && visibleComments !== totalComments && (
                  <Badge variant="secondary" className="text-xs justify-center">
                    Filtered
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};