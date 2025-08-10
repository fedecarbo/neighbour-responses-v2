"use client"

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface LoadingSkeletonProps {
  type: 'comment-card' | 'stat-card' | 'analytics-widget' | 'comment-list' | 'table-row' | 'custom';
  count?: number;
  className?: string;
  customContent?: React.ReactNode;
}

const CommentCardSkeleton: React.FC = () => (
  <Card>
    <CardContent className="pt-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-40" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/6" />
        </div>
        
        {/* Tags */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-14" />
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-20 ml-auto" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatCardSkeleton: React.FC = () => (
  <Card>
    <CardContent className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-5 rounded" />
        </div>
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
    </CardContent>
  </Card>
);

const AnalyticsWidgetSkeleton: React.FC = () => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-8 w-8" />
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-4 w-36" />
      </div>
      
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-16 w-full rounded-md" />
        <Skeleton className="h-16 w-full rounded-md" />
      </div>
    </CardContent>
  </Card>
);

const TableRowSkeleton: React.FC = () => (
  <div className="flex items-center space-x-4 p-4 border-b">
    <Skeleton className="h-4 w-8" />
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-4 w-16" />
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-8 w-8 rounded ml-auto" />
  </div>
);

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type,
  count = 1,
  className = '',
  customContent
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'comment-card':
        return <CommentCardSkeleton />;
      case 'stat-card':
        return <StatCardSkeleton />;
      case 'analytics-widget':
        return <AnalyticsWidgetSkeleton />;
      case 'table-row':
        return <TableRowSkeleton />;
      case 'comment-list':
        return (
          <div className="space-y-4">
            {Array.from({ length: count }, (_, index) => (
              <CommentCardSkeleton key={index} />
            ))}
          </div>
        );
      case 'custom':
        return customContent;
      default:
        return <Skeleton className="h-20 w-full" />;
    }
  };

  if (type === 'comment-list' || type === 'custom') {
    return <div className={className}>{renderSkeleton()}</div>;
  }

  return (
    <div className={className}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="animate-pulse">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};