
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { usePixelTrailSettings } from '@/context/pixel-trail-settings-context';

export default function SettingsPage() {
  const { settings, setSettings } = usePixelTrailSettings();

  const handleSliderChange = (key: string) => (value: number[]) => {
    setSettings(prev => ({ ...prev, [key]: value[0] }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, color: e.target.value }));
  };

  const handleGooeyChange = (checked: boolean) => {
    setSettings(prev => ({ ...prev, gooey: checked }));
  };

  return (
    <section id="settings" className="py-16 px-4">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">Pixel Trail Settings</h2>
      <Card className="bg-card border-primary p-5 w-full max-w-md mx-auto">
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="grid-size">Grid Size: {settings.gridSize}</Label>
            <Slider
              id="grid-size"
              min={10}
              max={100}
              step={1}
              value={[settings.gridSize]}
              onValueChange={handleSliderChange('gridSize')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trail-size">Trail Size: {settings.trailSize.toFixed(2)}</Label>
            <Slider
              id="trail-size"
              min={0.01}
              max={0.5}
              step={0.01}
              value={[settings.trailSize]}
              onValueChange={handleSliderChange('trailSize')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-age">Max Age: {settings.maxAge}</Label>
            <Slider
              id="max-age"
              min={50}
              max={1000}
              step={10}
              value={[settings.maxAge]}
              onValueChange={handleSliderChange('maxAge')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interpolate">Interpolate: {settings.interpolate}</Label>
            <Slider
              id="interpolate"
              min={1}
              max={20}
              step={1}
              value={[settings.interpolate]}
              onValueChange={handleSliderChange('interpolate')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="color"
                type="color"
                value={settings.color}
                onChange={handleColorChange}
                className="w-16 h-10 p-1"
              />
              <Input
                type="text"
                value={settings.color}
                onChange={handleColorChange}
                className="flex-1"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="gooey-filter" className="flex flex-col gap-1">
              <span>Gooey Filter</span>
              <span className="text-xs text-muted-foreground">Adds a 'blobby' effect</span>
            </Label>
            <Switch
              id="gooey-filter"
              checked={settings.gooey}
              onCheckedChange={handleGooeyChange}
            />
          </div>
          {settings.gooey && (
            <div className="space-y-2">
              <Label htmlFor="gooey-strength">Gooey Strength: {settings.gooeyStrength}</Label>
              <Slider
                id="gooey-strength"
                min={1}
                max={20}
                step={1}
                value={[settings.gooeyStrength]}
                onValueChange={handleSliderChange('gooeyStrength')}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
