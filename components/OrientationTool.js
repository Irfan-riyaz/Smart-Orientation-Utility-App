import { useEffect, useState } from 'react';
import Alarm from './Alarm';
import Timer from './Timer';
import Stopwatch from './Stopwatch';
import Weather from './Weather';

export default function OrientationTool() {
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const handleOrientation = () => {
      const angle = window.orientation;
      if (angle === 0 || angle === 180) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }
    };

    handleOrientation(); // Set initial
    window.addEventListener('orientationchange', handleOrientation);

    return () => {
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, []);

  const orientationContent = {
    portrait: (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Portrait Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Timer />
          <Stopwatch />
          <Alarm />
          <Weather />
        </div>
      </div>
    ),
    landscape: (
      <div className="text-center p-10">
        <h2 className="text-3xl font-bold mb-6">Landscape Mode</h2>
        <p className="text-lg">Rotate your device to portrait to access all features.</p>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center transition-all duration-700">
      {orientationContent[orientation]}
    </div>
  );
}
