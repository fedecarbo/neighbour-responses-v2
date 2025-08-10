/**
 * Simple API response utilities for prototype
 * Story 1.4: Basic error handling
 */

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  total?: number;
}

export function createSuccessResponse<T>(data: T, total?: number): ApiResponse<T> {
  return {
    data,
    success: true,
    ...(total !== undefined && { total })
  }
}

export function createErrorResponse<T = null>(error: string): ApiResponse<T> {
  return {
    data: null as T,
    success: false,
    error
  }
}