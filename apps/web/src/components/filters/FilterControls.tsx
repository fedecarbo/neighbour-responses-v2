"use client"

import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { SentimentType } from '@shared/types';

interface FilterControlsProps {
  searchText?: string;
  selectedSentiments?: SentimentType[];
  totalComments?: number;
  filteredComments?: number;
  onSearchChange?: (text: string) => void;
  onSentimentChange?: (sentiments: SentimentType[]) => void;
  // onStatusChange?: (statuses: CommentStatus[]) => void; // Not implemented for prototype
  onClearFilters?: () => void;
  className?: string;
}

const SENTIMENT_OPTIONS: { value: SentimentType; label: string; color: string }[] = [
  { value: 'positive', label: 'Positive', color: 'bg-green-100 text-green-800' },
  { value: 'neutral', label: 'Neutral', color: 'bg-gray-100 text-gray-800' },
  { value: 'negative', label: 'Negative', color: 'bg-red-100 text-red-800' },
];

// STATUS_OPTIONS not implemented for Story 1.4 prototype
// const STATUS_OPTIONS: { value: CommentStatus; label: string }[] = [
//   { value: 'pending_review', label: 'Pending Review' },
//   { value: 'approved_for_publication', label: 'Approved for Publication' },
//   { value: 'confidential', label: 'Confidential' },
//   { value: 'redacted', label: 'Redacted' },
// ];

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchText = '',
  selectedSentiments = [],
  // selectedStatuses = [], // Not implemented for prototype
  totalComments = 0,
  filteredComments = 0,
  onSearchChange,
  onSentimentChange,
  // onStatusChange, // Not implemented for prototype
  onClearFilters,
  className = ''
}) => {
  const hasActiveFilters = searchText || selectedSentiments.length > 0; // || selectedStatuses.length > 0;

  const handleSentimentChange = (sentiment: SentimentType, checked: boolean) => {
    if (!onSentimentChange) return;
    
    const newSentiments = checked 
      ? [...selectedSentiments, sentiment]
      : selectedSentiments.filter(s => s !== sentiment);
    
    onSentimentChange(newSentiments);
  };

  // handleStatusChange not implemented for Story 1.4 prototype
  // const handleStatusChange = (status: CommentStatus, checked: boolean) => {
  //   if (!onStatusChange) return;
  //   
  //   const newStatuses = checked 
  //     ? [...selectedStatuses, status]
  //     : selectedStatuses.filter(s => s !== status);
  //   
  //   onStatusChange(newStatuses);
  // };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="h-8 px-2"
              aria-label="Clear all filters"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
        
        {/* Filter Results Summary */}
        {totalComments > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Showing {filteredComments} of {totalComments} comments</span>
            {hasActiveFilters && filteredComments !== totalComments && (
              <Badge variant="secondary" className="text-xs">
                Filtered
              </Badge>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="space-y-2">
          <Label htmlFor="comment-search" className="text-sm font-medium">
            Search Comments
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="comment-search"
              placeholder="Search by content, address, or name..."
              value={searchText}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-8"
              aria-label="Search comments"
            />
          </div>
        </div>

        <Separator />

        {/* Sentiment Filters */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Sentiment</Label>
          <div className="space-y-2">
            {SENTIMENT_OPTIONS.map(({ value, label, color }) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={`sentiment-${value}`}
                  checked={selectedSentiments.includes(value)}
                  onCheckedChange={(checked) => handleSentimentChange(value, !!checked)}
                  aria-label={`Filter by ${label} sentiment`}
                />
                <Label
                  htmlFor={`sentiment-${value}`}
                  className="text-sm font-normal cursor-pointer flex items-center gap-2"
                >
                  <span className={`px-2 py-1 rounded text-xs ${color}`}>
                    {label}
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Status Filters - Not implemented for Story 1.4 prototype */}
        {/*
        <Separator />

        <div className="space-y-3">
          <Label className="text-sm font-medium">Comment Status</Label>
          <div className="space-y-2">
            {STATUS_OPTIONS.map(({ value, label }) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${value}`}
                  checked={selectedStatuses.includes(value)}
                  onCheckedChange={(checked) => handleStatusChange(value, !!checked)}
                  aria-label={`Filter by ${label} status`}
                />
                <Label
                  htmlFor={`status-${value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        */}
      </CardContent>
    </Card>
  );
};