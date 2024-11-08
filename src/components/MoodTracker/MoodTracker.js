// src/components/MoodTracker/MoodTracker.js
import React, { useState } from 'react';
import { Smile } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const moods = [
  { emoji: '😊', label: '开心', color: 'bg-green-100' },
  { emoji: '😔', label: '低落', color: 'bg-blue-100' },
  { emoji: '😤', label: '压力', color: 'bg-red-100' },
  { emoji: '🥳', label: '兴奋', color: 'bg-yellow-100' },
  { emoji: '😴', label: '疲惫', color: 'bg-purple-100' }
];

export function MoodTracker() {
  const { currentMood, setCurrentMood } = useApp();
  const [showPicker, setShowPicker] = useState(false);

  const handleMoodSelect = (mood) => {
    setCurrentMood(mood);
    setShowPicker(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-full"
      >
        <Smile className="w-5 h-5" />
        <span className="text-sm">
          {currentMood ? currentMood.label : '今日心情'}
        </span>
      </button>
      
      {showPicker && (
        <div className="absolute top-full mt-2 p-2 bg-white rounded-xl shadow-lg flex gap-2 animate-fadeIn">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => handleMoodSelect(mood)}
              className={`w-12 h-12 ${mood.color} rounded-full flex items-center justify-center 
                hover:scale-110 transition-transform`}
            >
              <span className="text-xl">{mood.emoji}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}