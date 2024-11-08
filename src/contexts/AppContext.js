// src/contexts/AppContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 心情状态
  const [currentMood, setCurrentMood] = useState(null);
  
  // 专注模式状态
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [focusHistory, setFocusHistory] = useState([]);
  
  // 分类状态
  const [categories, setCategories] = useState([]);
  
  // 备忘录状态
  const [memos, setMemos] = useState([]);
  
  // 从本地存储加载数据
  useEffect(() => {
    const loadFromLocal = (key, defaultValue) => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    };
    
    setCurrentMood(loadFromLocal('currentMood', null));
    setFocusHistory(loadFromLocal('focusHistory', []));
    setCategories(loadFromLocal('categories', []));
    setMemos(loadFromLocal('memos', []));
  }, []);
  
  // 保存数据到本地存储
  useEffect(() => {
    const saveToLocal = (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    };
    
    if (currentMood) saveToLocal('currentMood', currentMood);
    if (focusHistory.length) saveToLocal('focusHistory', focusHistory);
    if (categories.length) saveToLocal('categories', categories);
    if (memos.length) saveToLocal('memos', memos);
  }, [currentMood, focusHistory, categories, memos]);

  return (
    <AppContext.Provider value={{
      currentMood,
      setCurrentMood,
      focusTime,
      setFocusTime,
      isTimerActive,
      setIsTimerActive,
      focusHistory,
      setFocusHistory,
      categories,
      setCategories,
      memos,
      setMemos,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
