"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  const [showPixelTrail, setShowPixelTrail] = useState(true);

  return (
    <section id="settings" className="py-16 px-4">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">Settings</h2>
      <Card className="bg-card border-primary p-5 w-full max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <Label htmlFor="pixel-trail-switch" className="text-lg">
            Pixel Trail
          </Label>
          <Switch
            id="pixel-trail-switch"
            checked={showPixelTrail}
            onCheckedChange={setShowPixelTrail}
          />
        </div>
      </Card>
    </section>
  );
}
