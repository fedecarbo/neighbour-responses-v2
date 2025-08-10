import { NeighborComment, CommentTag } from '@shared/types/comments'
import { sampleComments } from './sampleComments'

interface SentimentCounts {
  total: number
  positive: number
  neutral: number
  negative: number
}

interface TagAnalysis {
  tag: CommentTag
  count: number
  percentage: number
}

interface CommonConcern {
  theme: string
  description: string
  relatedTags: CommentTag[]
  count: number
}

export function calculateSentimentAnalysis(comments: NeighborComment[]): SentimentCounts {
  const sentimentCounts = comments.reduce((acc, comment) => {
    acc[comment.sentiment]++
    acc.total++
    return acc
  }, {
    total: 0,
    positive: 0,
    neutral: 0,
    negative: 0
  } as SentimentCounts)

  return sentimentCounts
}

export function calculateTagAnalysis(_comments: NeighborComment[]): TagAnalysis[] {
  // Story 1.4 prototype: tags not implemented, return empty array
  return []
}

export function getCommonConcerns(_comments: NeighborComment[]): CommonConcern[] {
  // Story 1.4 prototype: tags not implemented, return empty array
  return []
}

export function getDashboardData(comments: NeighborComment[] = sampleComments) {
  const sentimentAnalysis = calculateSentimentAnalysis(comments)
  const tagAnalysis = calculateTagAnalysis(comments)
  const commonConcerns = getCommonConcerns(comments)
  const engagement = getOverallEngagement()

  return {
    sentimentCounts: sentimentAnalysis, // Alias for dashboard page compatibility
    sentimentAnalysis,
    tagAnalysis,
    commonConcerns,
    engagement,
    totalComments: comments.length
  }
}

export function getOverallEngagement(): { totalComments: number; averageResponseTime: number } {
  // For prototype, use mock data
  return {
    totalComments: sampleComments.length,
    averageResponseTime: 3.2 // days
  }
}

// Export sample data for use in components
export { sampleComments }