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

export function calculateSentimentCounts(comments: NeighborComment[]): SentimentCounts {
  const sentimentCounts = comments.reduce((acc, comment) => {
    acc[comment.sentiment]++
    return acc
  }, { positive: 0, neutral: 0, negative: 0 })

  return {
    total: comments.length,
    ...sentimentCounts
  }
}

export function calculateTagAnalysis(comments: NeighborComment[]): TagAnalysis[] {
  const tagCounts = comments.reduce((acc, comment) => {
    comment.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<CommentTag, number>)

  const total = Object.values(tagCounts).reduce((sum, count) => sum + count, 0)

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({
      tag: tag as CommentTag,
      count,
      percentage: Math.round((count / total) * 100)
    }))
    .sort((a, b) => b.count - a.count)
}

export function getCommonConcerns(comments: NeighborComment[]): CommonConcern[] {
  const tagAnalysis = calculateTagAnalysis(comments)
  
  // Map most frequent tags to common concern themes
  const concernMap: Record<CommentTag, CommonConcern> = {
    'Traffic': {
      theme: 'Traffic Impact',
      description: 'Residents are concerned about increased traffic flow and congestion in the neighborhood',
      relatedTags: ['Traffic', 'Access'],
      count: 0
    },
    'Privacy': {
      theme: 'Privacy Concerns',
      description: 'Multiple residents raised concerns about privacy and visibility from proposed development',
      relatedTags: ['Privacy'],
      count: 0
    },
    'Design': {
      theme: 'Architectural Compatibility',
      description: 'Community feedback focuses on design compatibility with existing neighborhood character',
      relatedTags: ['Design'],
      count: 0
    },
    'Noise': {
      theme: 'Noise Impact',
      description: 'Residents are worried about noise levels during construction and after occupancy',
      relatedTags: ['Noise'],
      count: 0
    },
    'Light': {
      theme: 'Lighting and Safety',
      description: 'Community concerns about adequate lighting and safety measures',
      relatedTags: ['Light'],
      count: 0
    },
    'Access': {
      theme: 'Accessibility',
      description: 'Questions about accessibility features and community resource access',
      relatedTags: ['Access'],
      count: 0
    },
    'Use': {
      theme: 'Development Use',
      description: 'Community interest and feedback on the proposed development use',
      relatedTags: ['Use'],
      count: 0
    },
    'Other': {
      theme: 'Environmental Impact',
      description: 'Various other concerns including environmental and infrastructure impacts',
      relatedTags: ['Other'],
      count: 0
    }
  }

  // Count occurrences for each concern
  tagAnalysis.forEach(({ tag, count }) => {
    if (concernMap[tag]) {
      concernMap[tag].count = count
    }
  })

  return Object.values(concernMap)
    .filter(concern => concern.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3) // Top 3 concerns
}

export function getDashboardData() {
  const sentimentCounts = calculateSentimentCounts(sampleComments)
  const tagAnalysis = calculateTagAnalysis(sampleComments)
  const commonConcerns = getCommonConcerns(sampleComments)
  
  return {
    sentimentCounts,
    tagAnalysis,
    commonConcerns
  }
}