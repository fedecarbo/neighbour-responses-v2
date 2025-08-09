'use client'

import { NeighborComment, SentimentType, CommentTag } from '@shared/types/comments'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Eye, EyeOff } from 'lucide-react'

interface CommentCardProps {
  comment: NeighborComment
  onPublish?: (commentId: string) => void
  onViewOnMap?: (commentId: string) => void
}

const getSentimentColor = (sentiment: SentimentType): string => {
  switch (sentiment) {
    case 'positive': return 'bg-green-100 text-green-800 border-green-200'
    case 'negative': return 'bg-red-100 text-red-800 border-red-200'
    case 'neutral': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getTagColor = (tag: CommentTag): string => {
  const colors = {
    'Use': 'bg-blue-100 text-blue-800',
    'Privacy': 'bg-purple-100 text-purple-800',
    'Light': 'bg-yellow-100 text-yellow-800',
    'Access': 'bg-orange-100 text-orange-800',
    'Noise': 'bg-red-100 text-red-800',
    'Traffic': 'bg-indigo-100 text-indigo-800',
    'Design': 'bg-pink-100 text-pink-800',
    'Other': 'bg-gray-100 text-gray-800'
  }
  return colors[tag] || colors['Other']
}

export function CommentCard({ comment, onPublish, onViewOnMap }: CommentCardProps) {
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

  return (
    <Card>
      <CardContent className="pt-6">
        {/* Header with Name and Badges */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm">
                {comment.name} {comment.surname}
              </h3>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-1 text-xs text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>{comment.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{comment.neighborAddress}</span>
              </div>
            </div>
          </div>
          
          {/* Badges - Redacted and Sentiment */}
          <div className="flex items-center gap-2">
            {comment.isRedacted && (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                <EyeOff className="w-3 h-3 mr-1" />
                Redacted
              </Badge>
            )}
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
            {comment.isRedacted ? 
              "This comment has been redacted for publication." : 
              comment.content
            }
          </p>
        </div>

        {/* Tags */}
        {comment.tags && comment.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
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
        )}

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