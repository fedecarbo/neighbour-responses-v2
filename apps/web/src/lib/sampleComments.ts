import { NeighborComment, SentimentType } from '@shared/types/comments'

// Story 1.4 prototype: Simple sample comments matching NeighborComment interface
export const sampleComments: NeighborComment[] = [
  {
    id: 'comment-001',
    neighborAddress: '13 Oxford Road, Manchester M1 5QA',
    coordinates: { latitude: 53.4720, longitude: -2.2372 },
    content: 'I strongly support this extension proposal. The design looks well thought out.',
    sentiment: 'positive' as SentimentType,
    submissionDate: '2024-01-20T14:30:00Z',
    officerNotes: ''
  },
  {
    id: 'comment-002', 
    neighborAddress: '17 Oxford Road, Manchester M1 5QA',
    coordinates: { latitude: 53.4724, longitude: -2.2376 },
    content: 'I have concerns about the height of the proposed extension blocking natural light.',
    sentiment: 'negative' as SentimentType,
    submissionDate: '2024-01-22T09:15:00Z',
    officerNotes: 'Follow up on light impact assessment needed'
  },
  {
    id: 'comment-003',
    neighborAddress: '19 Oxford Road, Manchester M1 5QA', 
    coordinates: { latitude: 53.4726, longitude: -2.2378 },
    content: 'The extension appears reasonable in size and design. No objections.',
    sentiment: 'neutral' as SentimentType,
    submissionDate: '2024-01-23T16:45:00Z',
    officerNotes: ''
  },
  {
    id: 'comment-004',
    neighborAddress: '11 Oxford Road, Manchester M1 5QA',
    coordinates: { latitude: 53.4718, longitude: -2.2370 },
    content: 'Excellent proposal that will improve the street appearance.',
    sentiment: 'positive' as SentimentType, 
    submissionDate: '2024-01-24T11:20:00Z',
    officerNotes: ''
  },
  {
    id: 'comment-005',
    neighborAddress: '14 Oxford Road, Manchester M1 5QA',
    coordinates: { latitude: 53.4721, longitude: -2.2371 },
    content: 'Concerned about construction noise affecting my home office work.',
    sentiment: 'neutral' as SentimentType,
    submissionDate: '2024-01-25T10:30:00Z',
    officerNotes: 'Construction hours condition recommended'
  }
]