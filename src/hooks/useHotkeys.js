import { useEffect } from 'react';

export function useHotkeys(keys, callback) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (keys.includes(event.key)) {
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys, callback]);
}

// 在组件中使用
const CategoryGrid = () => {
  useHotkeys(['n'], () => setShowForm(true)); // 按 'n' 创建新内容
  useHotkeys(['Escape'], () => setShowForm(false)); // 按 ESC 关闭表单
  
  // ... 其余代码
}; 