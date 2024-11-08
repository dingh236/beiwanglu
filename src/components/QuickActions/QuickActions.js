// src/components/QuickActions/QuickActions.js
import React, { useState } from 'react';
import { PlusCircle, Camera, Music, Mic, MapPin } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export function QuickActions() {
  const [showActions, setShowActions] = useState(false);
  const { setMemos } = useApp();

  const handleCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // 这里可以添加拍照逻辑
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Camera access error:', error);
    }
  };

  const handleVoice = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // 这里可以添加录音逻辑
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Microphone access error:', error);
    }
  };

  const handleLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      // 添加位置备忘录
      setMemos(prev => [{
        id: Date.now(),
        type: 'location',
        coordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        time: new Date().toISOString()
      }, ...prev]);
    } catch (error) {
      console.error('Location access error:', error);
    }
  };

  const actions = [
    { Icon: Camera, color: 'bg-pink-500', onClick: handleCamera },
    { Icon: Music, color: 'bg-green-500', onClick: () => {} },
    { Icon: Mic, color: 'bg-blue-500', onClick: handleVoice },
    { Icon: MapPin, color: 'bg-yellow-500', onClick: handleLocation }
  ];

  return (
    <div className="fixed bottom-24 right-6 flex flex-col-reverse items-end gap-3">
      {showActions && (
        <div className="flex flex-col gap-3 animate-slideUp">
          {actions.map(({ Icon, color, onClick }, index) => (
            <button
              key={index}
              onClick={onClick}
              className={`w-12 h-12 ${color} rounded-full flex items-center justify-center shadow-lg
                hover:scale-110 transition-transform`}
            >
              <Icon className="w-6 h-6 text-white" />
            </button>
          ))}
        </div>
      )}
      
      <button 
        onClick={() => setShowActions(!showActions)}
        className="w-14 h-14 bg-violet-600 rounded-full flex items-center justify-center shadow-lg
          transform transition-transform hover:scale-110"
      >
        <PlusCircle className="w-8 h-8 text-white" />
      </button>
    </div>
  );
}