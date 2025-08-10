import { describe, it, expect, beforeEach } from 'vitest'
import { loadApplication, clearCache } from '@/utils/fileOperations'

describe('File Operations', () => {
  beforeEach(() => {
    clearCache()
  })

  it('loads the single application from JSON file', async () => {
    const application = await loadApplication()
    expect(application).toBeDefined()
    expect(application.id).toBeDefined()
    expect(application.comments).toBeDefined()
    expect(Array.isArray(application.comments)).toBe(true)
  })

  it('loads application with enhanced comment volume', async () => {
    const application = await loadApplication()
    expect(application).toBeDefined()
    expect(application.id).toBe('APP-2024-0001')
    expect(application.reference).toBe('24/00001/FUL')
    expect(application.comments.length).toBeGreaterThanOrEqual(25)
    expect(application.comments.length).toBeLessThanOrEqual(30)
  })

  it('validates geographic coordinates are within Manchester bounds', async () => {
    const application = await loadApplication()
    expect(application.coordinates.latitude).toBeGreaterThanOrEqual(53.4)
    expect(application.coordinates.latitude).toBeLessThanOrEqual(53.5)
    expect(application.coordinates.longitude).toBeGreaterThanOrEqual(-2.3)
    expect(application.coordinates.longitude).toBeLessThanOrEqual(-2.1)
    
    // Check all comment coordinates are within bounds
    application.comments.forEach(comment => {
      expect(comment.coordinates.latitude).toBeGreaterThanOrEqual(53.4)
      expect(comment.coordinates.latitude).toBeLessThanOrEqual(53.5)
      expect(comment.coordinates.longitude).toBeGreaterThanOrEqual(-2.3)
      expect(comment.coordinates.longitude).toBeLessThanOrEqual(-2.1)
    })
  })

  it('includes enhanced comments with proper structure and sentiment distribution', async () => {
    const application = await loadApplication()
    expect(application.comments).toBeDefined()
    expect(Array.isArray(application.comments)).toBe(true)
    expect(application.comments.length).toBe(28)
    
    // Verify sentiment distribution is balanced
    const sentiments = application.comments.reduce((acc, comment) => {
      acc[comment.sentiment] = (acc[comment.sentiment] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    expect(sentiments.positive).toBeGreaterThan(0)
    expect(sentiments.negative).toBeGreaterThan(0)
    expect(sentiments.neutral).toBeGreaterThan(0)
    
    // Each comment should have required fields
    application.comments.forEach(comment => {
      expect(comment.id).toBeDefined()
      expect(comment.neighborAddress).toBeDefined()
      expect(comment.coordinates).toBeDefined()
      expect(comment.content).toBeDefined()
      expect(['positive', 'neutral', 'negative']).toContain(comment.sentiment)
      expect(comment.submissionDate).toBeDefined()
      expect(comment.officerNotes).toBeDefined()
    })
  })
})