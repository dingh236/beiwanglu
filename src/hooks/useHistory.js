import { useState, useCallback } from 'react';

export function useHistory(initialState) {
  const [history, setHistory] = useState([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setState = useCallback((action) => {
    const newState = typeof action === 'function' ? action(history[currentIndex]) : action;
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  }, [history, currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, history.length]);

  return [history[currentIndex], setState, undo, redo];
}

// 在组件中使用
const CategoryGrid = () => {
  const [contents, setContents, undo, redo] = useHistory([]);
  
  useHotkeys(['Control+z'], undo);
  useHotkeys(['Control+y'], redo);
  
  // ... 其余代码
}; 