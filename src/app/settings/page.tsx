
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState, useCallback } from 'react';

export default function SettingsPage() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('bgAudioMuted') === 'true';
    setMuted(saved);

    // If the controller exists (client nav), sync the toggle with actual state
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controller = (window as any).__BG_AUDIO__;
    if (controller && typeof controller.isMuted === 'function') {
      setMuted(!!controller.isMuted());
    }
  }, []);



  const handleMuteToggle = useCallback((checked: boolean) => {
    setMuted(checked);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controller = (typeof window !== 'undefined') ? (window as any).__BG_AUDIO__ : undefined;
    if (controller) {
      if (checked) controller.mute();
      else controller.unmute();
    } else {
      // Fallback to just persist if controller not mounted yet
      localStorage.setItem('bgAudioMuted', checked ? 'true' : 'false');
    }
  }, []);

  return (
    <section id="settings" className="py-16 px-4">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">Settings</h2>
      <Card className="bg-card border-primary p-5 w-full max-w-md mx-auto">
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="mute-music" className="flex flex-col gap-1">
              <span>Background Music</span>
              <span className="text-xs text-muted-foreground">Mute/Unmute the site music</span>
            </Label>
            <Switch
              id="mute-music"
              checked={muted}
              onCheckedChange={handleMuteToggle}
            />
          </div>

        </CardContent>
      </Card>
    </section>
  );
}
