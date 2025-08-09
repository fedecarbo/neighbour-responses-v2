'use client'

import { NeighborComment } from '@shared/types/comments'
import { CommentCard } from './CommentCard'

interface CommentListProps {
  comments: NeighborComment[]
  onPublish?: (commentId: string) => void
  onViewOnMap?: (commentId: string) => void
}

export function CommentList({ comments, onPublish, onViewOnMap }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No comments found matching your filters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          onPublish={onPublish}
          onViewOnMap={onViewOnMap}
        />
      ))}
    </div>
  )
}