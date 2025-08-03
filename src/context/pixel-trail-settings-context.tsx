
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PixelTrailSettings {
  gridSize: number;
  trailSize: number;
  maxAge: number;
  interpolate: number;
  color: string;
  gooey: boolean;
  gooeyStrength: number;
}

interface PixelTrailSettingsContextType {
  settings: PixelTrailSettings;
  setSettings: React.Dispatch<React.SetStateAction<PixelTrailSettings>>;
}

const defaultSettings: PixelTrailSettings = {
  gridSize: 50,
  trailSize: 0.1,
  maxAge: 250,
  interpolate: 5,
  color: '#5227FF',
  gooey: true,
  gooeyStrength: 2,
};

const PixelTrailSettingsContext = createContext<PixelTrailSettingsContextType | undefined>(undefined);

export const PixelTrailSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<PixelTrailSettings>(defaultSettings);

  return (
    <PixelTrailSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </PixelTrailSettingsContext.Provider>
  );
};

export const usePixelTrailSettings = () => {
  const context = useContext(PixelTrailSettingsContext);
  if (context === undefined) {
    throw new Error('usePixelTrailSettings must be used within a PixelTrailSettingsProvider');
  }
  return context;
};
