'use client'

import React, { useMemo, useCallback } from 'react'
import { NeighborComment } from '@shared/types/comments'
import { CommentCard } from './CommentCard'
import { AlertCircle, MessageSquare } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface CommentListProps {
  comments: NeighborComment[]
  onPublish?: (commentId: string) => void
  onViewOnMap?: (commentId: string) => void
  onEdit?: (commentId: string) => void
  selectedCommentId?: string
  isLoading?: boolean
  height?: string
  className?: string
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  onPublish,
  onViewOnMap,
  onEdit,
  selectedCommentId,
  isLoading = false,
  height = 'auto',
  className = ''
}) => {
  const memoizedComments = useMemo(() => comments, [comments]);

  const handlePublish = useCallback((commentId: string) => {
    if (onPublish) {
      onPublish(commentId);
    }
  }, [onPublish]);

  const handleViewOnMap = useCallback((commentId: string) => {
    if (onViewOnMap) {
      onViewOnMap(commentId);
    }
  }, [onViewOnMap]);

  const handleEdit = useCallback((commentId: string) => {
    if (onEdit) {
      onEdit(commentId);
    }
  }, [onEdit]);

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`} style={{ height }}>
        {/* Loading skeleton */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="h-4 bg-muted-foreground/20 rounded w-1/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-muted-foreground/20 rounded"></div>
                <div className="h-3 bg-muted-foreground/20 rounded w-5/6"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 bg-muted-foreground/20 rounded w-16"></div>
                <div className="h-6 bg-muted-foreground/20 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (memoizedComments.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`} style={{ height }}>
        <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground mb-2">No comments found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or search terms to find comments.
        </p>
      </div>
    );
  }

  // For large datasets (>100 comments), show a warning about performance
  const isLargeDataset = memoizedComments.length > 100;

  return (
    <div className={`space-y-4 ${className}`} style={{ height }}>
      {isLargeDataset && (
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Displaying {memoizedComments.length} comments. Consider using filters to improve performance.
          </AlertDescription>
        </Alert>
      )}
      
      <div 
        className="space-y-4"
        role="list"
        aria-label={`List of ${memoizedComments.length} comments`}
      >
        {memoizedComments.map((comment, index) => (
          <div
            key={comment.id}
            role="listitem"
            aria-setsize={memoizedComments.length}
            aria-posinset={index + 1}
            className={selectedCommentId === comment.id ? 'ring-2 ring-primary ring-offset-2 rounded-lg' : ''}
          >
            <CommentCard
              comment={comment}
              onPublish={handlePublish}
              onViewOnMap={handleViewOnMap}
              onEdit={handleEdit}
            />
          </div>
        ))}
      </div>
    </div>
  );
};