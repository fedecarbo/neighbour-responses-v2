# Map Component Theming System

## Overview

The map component system provides a comprehensive theming solution for Leaflet maps in the UK Planning Officer application. It features professional tile providers, consistent styling with Shadcn UI, and enhanced pin designs for optimal user experience.

## Features

### 🎨 Professional Themes
- **Light**: Clean CartoDB theme ideal for planning applications
- **Dark**: High-contrast dark theme for data visualization  
- **Street**: Standard OpenStreetMap with detailed street information
- **Terrain**: Topographical map showing elevation and natural features
- **Satellite**: High-resolution Esri satellite imagery

### 🎯 Enhanced Pin Design
- **Application Pin**: Distinctive house icon with gradient styling and status indicator
- **Comment Pins**: Sentiment-colored pins with gradient effects and hover animations
- **Professional Styling**: Consistent with Shadcn UI design language

### 🎮 Interactive Controls
- **Theme Selector**: Dropdown component for switching map styles
- **Styled Controls**: Leaflet UI elements themed to match application design
- **Responsive Design**: Optimized for all screen sizes

## Components

### MapComponent
Main map container with theme selector and pin management.

```typescript
<MapComponent
  application={application}
  comments={comments}
  onCommentPinClick={handleCommentClick}
  onApplicationPinClick={handleAppClick}
  selectedCommentIds={selected}
  height="450px"
/>
```

### MapThemeSelector
Theme switching component with descriptive labels.

```typescript
<MapThemeSelector 
  currentTheme="light"
  onThemeChange={setTheme}
/>
```

### MapContainer
Core Leaflet wrapper with theme support.

```typescript
<MapContainer
  center={coordinates}
  zoom={18}
  theme="light"
  height="450px"
>
  {children}
</MapContainer>
```

## Configuration

### Map Themes
Themes are configured in `utils/mapConfig.ts`:

```typescript
export const MAP_THEMES: Record<MapTheme, TileLayerConfig> = {
  light: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    name: 'Light',
    description: 'Clean, professional light theme'
  },
  // ... other themes
};
```

### Styling Configuration
Centralized styling for pins and map elements:

```typescript
export const UK_MAP_CONFIG = {
  styling: {
    applicationPin: {
      color: '#2563eb',     // Blue-600
      size: 40,
      zIndex: 1000
    },
    sentimentPins: {
      positive: '#22c55e',  // Green-500
      neutral: '#eab308',   // Yellow-500
      negative: '#ef4444',  // Red-500
      size: 24,
      zIndex: 500
    }
  }
};
```

## Styling Integration

### CSS Variables
The map theming integrates with Shadcn UI CSS variables:

```css
.leaflet-control-zoom a {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}
```

### Custom Pin Styling
Enhanced pin designs with animations:

```css
.custom-application-pin:hover {
  filter: drop-shadow(0 6px 12px rgba(0,0,0,0.5));
  transform: scale(1.05);
}
```

## Usage Examples

### Basic Implementation
```typescript
import { MapComponent } from '@/components/map';

function CommentsPage() {
  return (
    <MapComponent
      application={applicationData}
      comments={commentsData}
      onCommentPinClick={(id) => console.log('Clicked:', id)}
    />
  );
}
```

### Theme Switching
```typescript
import { MapTheme } from '@/utils/mapConfig';

function MapWithThemes() {
  const [theme, setTheme] = useState<MapTheme>('light');
  
  return (
    <MapContainer theme={theme}>
      <MapThemeSelector 
        currentTheme={theme}
        onThemeChange={setTheme}
      />
    </MapContainer>
  );
}
```

### Custom Styling
```typescript
// Access configuration values
import { UK_MAP_CONFIG } from '@/utils/mapConfig';

const pinColor = UK_MAP_CONFIG.styling.applicationPin.color;
const size = UK_MAP_CONFIG.styling.sentimentPins.size;
```

## Performance Considerations

- **Memoized Components**: All map components use React.memo for performance
- **Stable Keys**: Theme changes force tile layer re-render with stable keys
- **Efficient Rendering**: Pin components optimized with stable identifiers
- **Lazy Loading**: Dynamic imports prevent SSR issues with Leaflet

## Accessibility

- **Keyboard Navigation**: Full keyboard support for map controls
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **High Contrast**: Dark theme provides excellent contrast ratios
- **Focus Management**: Visible focus indicators for all interactive elements

## Testing

Map components include comprehensive test coverage:

```bash
npm test tests/components/map
```

Tests cover:
- Theme switching functionality
- Pin rendering and interactions
- Error handling and edge cases
- Performance and memory usage

## Future Enhancements

Planned improvements for the theming system:

1. **Custom Theme Builder**: UI for creating custom tile configurations
2. **Theme Persistence**: Save user theme preferences
3. **Animation Controls**: Toggle pin animations for performance
4. **Accessibility Options**: High contrast and reduced motion modes
5. **Print Optimization**: Print-friendly theme variants