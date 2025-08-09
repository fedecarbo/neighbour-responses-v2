'use client'

import { CommentList } from './CommentList'
import { sampleComments } from '@/lib/sampleComments'

export function CommentsSection() {
  // Handler functions for comment actions
  const handlePublish = (commentId: string) => {
    console.log('Publishing comment:', commentId)
    // TODO: Implement publish functionality
  }

  const handleViewOnMap = (commentId: string) => {
    console.log('Viewing comment on map:', commentId)
    // TODO: Implement map interaction
  }

  return (
    <CommentList 
      comments={sampleComments}
      onPublish={handlePublish}
      onViewOnMap={handleViewOnMap}
    />
  )
}