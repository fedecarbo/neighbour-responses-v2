'use client'

import { NeighborComment, SentimentType } from '@shared/types/comments'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Eye, Edit } from 'lucide-react'

interface CommentCardProps {
  comment: NeighborComment
  onPublish?: (commentId: string) => void
  onViewOnMap?: (commentId: string) => void
  onEdit?: (commentId: string) => void
}

const getSentimentColor = (sentiment: SentimentType): string => {
  switch (sentiment) {
    case 'positive': return 'bg-green-100 text-green-800 border-green-200'
    case 'negative': return 'bg-red-100 text-red-800 border-red-200'
    case 'neutral': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

// Simplified prototype - no tags

export function CommentCard({ comment, onPublish, onViewOnMap, onEdit }: CommentCardProps) {
  const handlePublish = () => {
    if (onPublish) {
      onPublish(comment.id)
    }
  }

  const handleViewOnMap = () => {
    if (onViewOnMap) {
      onViewOnMap(comment.id)
    }
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(comment.id)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {/* Header with Name and Badges */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm">
                Neighbor Comment {comment.id}
              </h3>
            </div>
            
            {/* Address Information */}
            <div className="space-y-1 text-xs text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{comment.neighborAddress}</span>
              </div>
            </div>
          </div>
          
          {/* Sentiment Badge */}
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`capitalize ${getSentimentColor(comment.sentiment)}`}
            >
              {comment.sentiment}
            </Badge>
          </div>
        </div>

        {/* Comment Content */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {comment.content}
          </p>
        </div>

        {/* Simplified prototype - no tags */}

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleViewOnMap}
            className="flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            View on Map
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleEdit}
            className="flex items-center gap-1"
          >
            <Edit className="w-3 h-3" />
            Edit
          </Button>
          
          <Button 
            variant="default" 
            size="sm"
            onClick={handlePublish}
            className="ml-auto"
          >
            Publish
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}