"use client"

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapTheme, getAvailableThemes } from '@/utils/mapConfig';

interface MapThemeSelectorProps {
  currentTheme: MapTheme;
  onThemeChange: (theme: MapTheme) => void;
  className?: string;
}

export const MapThemeSelector: React.FC<MapThemeSelectorProps> = ({ 
  currentTheme, 
  onThemeChange,
  className = ''
}) => {
  const themes = getAvailableThemes();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-muted-foreground">Map Style:</span>
      <Select value={currentTheme} onValueChange={onThemeChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme) => (
            <SelectItem 
              key={theme.value} 
              value={theme.value}
              className="cursor-pointer"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{theme.label}</span>
                <span className="text-xs text-muted-foreground">
                  {theme.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};