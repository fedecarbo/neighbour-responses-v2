import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MapThemeSelector } from '@/components/map/MapThemeSelector';
import { MapTheme } from '@/utils/mapConfig';

describe('MapThemeSelector', () => {
  const mockOnThemeChange = vi.fn();

  beforeEach(() => {
    mockOnThemeChange.mockClear();
  });

  it('renders with current theme selected', () => {
    render(
      <MapThemeSelector 
        currentTheme="light" 
        onThemeChange={mockOnThemeChange}
      />
    );

    expect(screen.getByText('Map Style:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays all available themes in dropdown', async () => {
    const user = userEvent.setup();
    
    render(
      <MapThemeSelector 
        currentTheme="light" 
        onThemeChange={mockOnThemeChange}
      />
    );

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    // Check that all theme options are available
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('Street')).toBeInTheDocument();
    expect(screen.getByText('Terrain')).toBeInTheDocument();
    expect(screen.getByText('Satellite')).toBeInTheDocument();
  });

  it('shows theme descriptions in dropdown options', async () => {
    const user = userEvent.setup();
    
    render(
      <MapThemeSelector 
        currentTheme="light" 
        onThemeChange={mockOnThemeChange}
      />
    );

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    expect(screen.getByText('Clean, professional light theme ideal for planning applications')).toBeInTheDocument();
    expect(screen.getByText('Professional dark theme with excellent contrast for data visualization')).toBeInTheDocument();
  });

  it('calls onThemeChange when theme is selected', async () => {
    const user = userEvent.setup();
    
    render(
      <MapThemeSelector 
        currentTheme="light" 
        onThemeChange={mockOnThemeChange}
      />
    );

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    const darkOption = screen.getByText('Dark');
    await user.click(darkOption);

    expect(mockOnThemeChange).toHaveBeenCalledWith('dark');
    expect(mockOnThemeChange).toHaveBeenCalledTimes(1);
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <MapThemeSelector 
        currentTheme="light" 
        onThemeChange={mockOnThemeChange}
        className="custom-class"
      />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('handles all theme types correctly', async () => {
    const user = userEvent.setup();
    const themes: MapTheme[] = ['light', 'dark', 'street', 'terrain', 'satellite'];
    
    for (const theme of themes) {
      mockOnThemeChange.mockClear();
      
      render(
        <MapThemeSelector 
          currentTheme="light" 
          onThemeChange={mockOnThemeChange}
        />
      );

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      const option = screen.getByText(theme === 'light' ? 'Light' : 
                                      theme === 'dark' ? 'Dark' :
                                      theme === 'street' ? 'Street' :
                                      theme === 'terrain' ? 'Terrain' : 'Satellite');
      await user.click(option);

      expect(mockOnThemeChange).toHaveBeenCalledWith(theme);
    }
  });

  it('renders with proper accessibility attributes', () => {
    render(
      <MapThemeSelector 
        currentTheme="light" 
        onThemeChange={mockOnThemeChange}
      />
    );

    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows current theme value in select trigger', () => {
    render(
      <MapThemeSelector 
        currentTheme="dark" 
        onThemeChange={mockOnThemeChange}
      />
    );

    // The value should be displayed in the trigger
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('data-placeholder', 'false');
  });
});