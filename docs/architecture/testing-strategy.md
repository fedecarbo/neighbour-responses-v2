# Testing Strategy

## Testing Pyramid
```
               E2E Tests (Playwright)
              /                    \
         Integration Tests (Vitest)
        /                          \
   Frontend Unit Tests          API Route Tests
   (React Testing Library)      (Vitest)
```

## Test Organization

### Frontend Tests
```
apps/web/tests/
├── components/           # Component unit tests
│   ├── map/
│   │   ├── MapComponent.test.tsx
│   │   └── CommentPin.test.tsx
│   └── comments/
│       └── CommentList.test.tsx
├── integration/          # Integration tests
│   └── map-comment-sync.test.tsx
└── e2e/                  # End-to-end tests
    ├── dashboard-workflow.spec.ts
    └── spatial-filtering.spec.ts
```

## Test Examples

### Frontend Component Test
```typescript
import { render, fireEvent } from '@testing-library/react';
import { CommentPin } from '@/components/map/CommentPin';

describe('CommentPin', () => {
  it('renders with correct sentiment color', () => {
    const mockComment = {
      id: 'test-comment',
      sentiment: 'negative',
      coordinates: { latitude: 53.4808, longitude: -2.2426 }
    };

    const { container } = render(
      <CommentPin 
        comment={mockComment}
        isSelected={false}
        onPinClick={jest.fn()}
        onPinHover={jest.fn()}
      />
    );
    
    const pin = container.querySelector('.comment-pin');
    expect(pin).toHaveStyle('backgroundColor: #ef4444'); // red for negative
  });
});
```

### E2E Test
```typescript
import { test, expect } from '@playwright/test';

test('map pin selection filters comment list', async ({ page }) => {
  await page.goto('/comments/APP/2024/0123');
  
  // Wait for map to load
  await page.waitForSelector('.leaflet-container');
  
  // Click on a map pin
  await page.click('[data-testid="comment-pin-negative"]');
  
  // Verify comment list is filtered
  const commentItems = page.locator('[data-testid="comment-item"]');
  await expect(commentItems).toHaveCount(5);
});
```
