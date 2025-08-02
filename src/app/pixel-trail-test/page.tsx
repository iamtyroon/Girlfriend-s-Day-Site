"use client";

export default function PixelTrailTestPage() {
  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* Test content to verify the trail appears behind elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-white text-center space-y-4 pointer-events-auto">
          <h1 className="text-4xl font-bold">Pixel Trail Test Page</h1>
          <p className="text-lg">Move your mouse around to see the pixel trail effect</p>
          <div className="mt-8 p-6 bg-gray-800 rounded-lg">
            <p>This box should appear above the pixel trail</p>
          </div>
        </div>
      </div>
    </div>
  );
}
