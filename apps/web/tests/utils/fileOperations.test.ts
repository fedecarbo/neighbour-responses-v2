import { describe, it, expect, beforeEach } from 'vitest'
import { loadApplication, getComments, clearCache, updateComment } from '@/utils/fileOperations'
import type { SentimentType } from '@shared/types'

describe('File Operations - Enhanced Data Volume', () => {
  beforeEach(() => {
    clearCache()
  })

  it('loads application efficiently with enhanced comment volume', async () => {
    const startTime = performance.now()
    const application = await loadApplication()
    const loadTime = performance.now() - startTime
    
    expect(loadTime).toBeLessThan(100) // Should load within 100ms
    expect(application.comments.length).toBe(28)
  })

  it('filters comments by sentiment efficiently', async () => {
    const startTime = performance.now()
    const positiveComments = await getComments({ sentiment: ['positive'] })
    const filterTime = performance.now() - startTime
    
    expect(filterTime).toBeLessThan(50) // Should filter within 50ms
    expect(positiveComments.length).toBeGreaterThan(0)
    expect(positiveComments.every(c => c.sentiment === 'positive')).toBe(true)
  })

  it('searches comments efficiently with enhanced dataset', async () => {
    const startTime = performance.now()
    const searchResults = await getComments({ search: 'extension' })
    const searchTime = performance.now() - startTime
    
    expect(searchTime).toBeLessThan(50) // Should search within 50ms
    expect(searchResults.length).toBeGreaterThan(0)
    expect(searchResults.every(c => 
      c.content.toLowerCase().includes('extension') ||
      c.neighborAddress.toLowerCase().includes('extension') ||
      (c.officerNotes && c.officerNotes.toLowerCase().includes('extension'))
    )).toBe(true)
  })

  it('updates comments correctly in enhanced dataset', async () => {
    const application = await loadApplication()
    const firstComment = application.comments[0]
    
    const success = await updateComment(firstComment.id, {
      officerNotes: 'Updated during QA review - test note'
    })
    
    expect(success).toBe(true)
    
    // Verify the update persisted
    const updatedApplication = await loadApplication()
    const updatedComment = updatedApplication.comments.find(c => c.id === firstComment.id)
    expect(updatedComment?.officerNotes).toBe('Updated during QA review - test note')
  })

  it('caches application data correctly for performance', async () => {
    clearCache()
    
    // First load - should read from file
    const start1 = performance.now()
    const app1 = await loadApplication()
    const time1 = performance.now() - start1
    
    // Second load - should use cache
    const start2 = performance.now()
    const app2 = await loadApplication()
    const time2 = performance.now() - start2
    
    expect(time2).toBeLessThan(time1) // Cache should be faster
    expect(app1.id).toBe(app2.id)
    expect(app1.comments.length).toBe(app2.comments.length)
  })

  it('handles multiple simultaneous requests efficiently', async () => {
    const promises = Array(10).fill(null).map(() => loadApplication())
    const startTime = performance.now()
    
    const results = await Promise.all(promises)
    const totalTime = performance.now() - startTime
    
    expect(totalTime).toBeLessThan(500) // 10 concurrent loads within 500ms
    expect(results.every(r => r.id === 'APP-2024-0001')).toBe(true)
    expect(results.every(r => r.comments.length === 28)).toBe(true)
  })
})