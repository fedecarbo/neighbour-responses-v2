"use client"

import React, { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { divIcon, DivIcon } from 'leaflet';
import { NeighborComment, SentimentType, getTagColor } from '@shared/types/comments';
import { Badge } from '@/components/ui/badge';
import { UK_MAP_CONFIG } from '@/utils/mapConfig';

interface CommentPinProps {
  comment: NeighborComment;
  isSelected?: boolean;
  onClick?: (comment: NeighborComment) => void;
  onMouseEnter?: (comment: NeighborComment) => void;
  onMouseLeave?: (comment: NeighborComment) => void;
}

const getSentimentColor = (sentiment: SentimentType): string => {
  const colors = UK_MAP_CONFIG.styling.sentimentPins;
  switch (sentiment) {
    case 'positive':
      return colors.positive;
    case 'negative':
      return colors.negative;
    case 'neutral':
    default:
      return colors.neutral;
  }
};

const getSentimentLabel = (sentiment: SentimentType): string => {
  switch (sentiment) {
    case 'positive':
      return 'Positive';
    case 'negative':
      return 'Negative';
    case 'neutral':
    default:
      return 'Neutral';
  }
};

const createCustomIcon = (sentiment: SentimentType, isSelected: boolean = false): DivIcon => {
  const color = getSentimentColor(sentiment);
  const baseSize = UK_MAP_CONFIG.styling.sentimentPins.size;
  const size = isSelected ? baseSize + 8 : baseSize;
  const borderWidth = isSelected ? 3 : 2;
  
  return divIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, ${color}, ${color}cc);
        border: ${borderWidth}px solid white;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: ${size * 0.4}px;
          height: ${size * 0.4}px;
          background-color: white;
          border-radius: 50%;
          opacity: ${isSelected ? 1 : 0.8};
        "></div>
      </div>
    `,
    className: 'custom-comment-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

export const CommentPin: React.FC<CommentPinProps> = React.memo(({
  comment,
  isSelected = false,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const icon = useMemo(() => createCustomIcon(comment.sentiment, isSelected), [comment.sentiment, isSelected]);

  const handleClick = () => {
    if (onClick) {
      onClick(comment);
    }
  };

  const handleMouseEnter = () => {
    if (onMouseEnter) {
      onMouseEnter(comment);
    }
  };

  const handleMouseLeave = () => {
    if (onMouseLeave) {
      onMouseLeave(comment);
    }
  };

  return (
    <Marker
      position={[comment.coordinates.latitude, comment.coordinates.longitude]}
      icon={icon}
      eventHandlers={{
        click: handleClick,
        mouseover: handleMouseEnter,
        mouseout: handleMouseLeave,
      }}
    >
      <Popup maxWidth={300} closeButton={true}>
        <div className="p-2">
          <h3 className="font-semibold text-sm mb-2">{comment.neighborAddress}</h3>
          <div className="flex items-center gap-2 mb-2">
            <Badge 
              variant={comment.sentiment === 'positive' ? 'default' : 
                     comment.sentiment === 'negative' ? 'destructive' : 'secondary'}
              className="text-xs"
            >
              {getSentimentLabel(comment.sentiment)}
            </Badge>
            {/* Status badge not implemented for Story 1.4 prototype
            <Badge variant="outline" className="text-xs">
              {comment.status.replace('_', ' ')}
            </Badge>
            */}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {comment.content}
          </p>
          
          {/* Tags */}
          {comment.tags && comment.tags.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {comment.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={`text-xs ${getTagColor(tag)}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>ID: {comment.id.slice(0, 8)}</span>
            <span>{new Date(comment.submissionDate).toLocaleDateString()}</span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
});

CommentPin.displayName = 'CommentPin';