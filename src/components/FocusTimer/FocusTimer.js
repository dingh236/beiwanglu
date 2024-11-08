import React, { useEffect, useState, useRef } from 'react';
import { Brain, Coffee, X, RotateCcw, Volume2, VolumeX, LineChart } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export function FocusTimer() {
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState(focusTime);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerType, setTimePickerType] = useState('minutes');
  const [isSoundEnabled, setSoundEnabled] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const { focusHistory, setFocusHistory } = useApp(); // 正确的用法

  // Timer 控制函数
  const startTimer = () => {
    setIsTimerActive(true);
  };

  const cancelTimer = () => {
    setIsTimerActive(false);
  };

  const resetTimer = () => {
    setCurrentTime(isBreakTime ? breakTime : focusTime);
    setIsTimerActive(false);
  };


  const audioRef = useRef(null);
  useEffect(() => {
    // 创建音频实例
    audioRef.current = new Audio('/shuidi.mp3');
    
    // 预加载音频
    audioRef.current.load();
    
    // 错误处理
    audioRef.current.onerror = (error) => {
      console.error('音频加载失败:', error);
    };
    
    // 清理函数
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []); // 空依赖数组
  
  // 播放音频的函数
  const playNotification = () => {
    if (audioRef.current && isSoundEnabled) {
      audioRef.current.play().catch(error => {
        console.error('播放失败:', error);
      });
    }
  };
  
  useEffect(() => {
    let interval;
    if (isTimerActive && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(time => time - 1);
      }, 1000);
    } else if (currentTime === 0) {
      setIsTimerActive(false);
      if (isSoundEnabled) {
        playNotification(); // 在计时结束时播放声音
      }
      if (!isBreakTime) {
        setFocusHistory(prev => [
          {
            date: new Date().toISOString(),
            duration: focusTime - currentTime,
            completed: true
          },
          ...prev
        ]);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerActive, currentTime, focusTime, isBreakTime, isSoundEnabled]);
  
  // 如果你需要在其他地方播放声音，可以这样使用
  const startBreak = () => {
    setIsBreakTime(true);
    setCurrentTime(breakTime);
    setIsTimerActive(true);
    playNotification(); // 开始休息时播放声音
  };

  const endBreak = () => {
    setIsBreakTime(false);
    setCurrentTime(focusTime);
    setIsTimerActive(false);
    playNotification(); // 结束休息时播放声音
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const updateTime = (value, type) => {
    const currentMins = Math.floor((isBreakTime ? breakTime : focusTime) / 60);
    const currentSecs = (isBreakTime ? breakTime : focusTime) % 60;
    
    let newTime;
    if (type === 'minutes') {
      newTime = value * 60 + currentSecs;
    } else {
      newTime = currentMins * 60 + value;
    }
    
    if (isBreakTime) {
      setBreakTime(newTime);
      setCurrentTime(newTime);
    } else {
      setFocusTime(newTime);
      setCurrentTime(newTime);
    }
    setShowTimePicker(false);
  };

  const TimePicker = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-64 max-h-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            选择{timePickerType === 'minutes' ? '分钟' : '秒数'}
          </h3>
          <button
            onClick={() => setShowTimePicker(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-auto h-64 rounded-lg">
          {[...Array(timePickerType === 'minutes' ? 60 : 60)].map((_, i) => (
            <div
              key={i}
              onClick={() => updateTime(i, timePickerType)}
              className="p-3 text-center hover:bg-violet-50 cursor-pointer"
            >
              {i.toString().padStart(2, '0')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const StatsModal = () => {
    const stats = {
      totalSessions: focusHistory.length,
      totalMinutes: Math.round(focusHistory.reduce((acc, curr) => acc + curr.duration, 0) / 60),
      completedSessions: focusHistory.filter(session => session.completed).length,
      averageMinutes: focusHistory.length ? 
        Math.round(focusHistory.reduce((acc, curr) => acc + curr.duration, 0) / 60 / focusHistory.length) : 0,
      byDay: focusHistory.reduce((acc, curr) => {
        const date = new Date(curr.date).toLocaleDateString();
        acc[date] = (acc[date] || 0) + curr.duration / 60;
        return acc;
      }, {})
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">专注统计</h3>
            <button
              onClick={() => setShowStats(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-violet-50 rounded-lg">
                <div className="text-sm text-gray-600">总专注次数</div>
                <div className="text-2xl font-bold text-violet-600">{stats.totalSessions}</div>
              </div>
              <div className="p-4 bg-violet-50 rounded-lg">
                <div className="text-sm text-gray-600">总专注时间</div>
                <div className="text-2xl font-bold text-violet-600">{stats.totalMinutes}分钟</div>
              </div>
              <div className="p-4 bg-violet-50 rounded-lg">
                <div className="text-sm text-gray-600">完成率</div>
                <div className="text-2xl font-bold text-violet-600">
                  {stats.totalSessions ? Math.round(stats.completedSessions / stats.totalSessions * 100) : 0}%
                </div>
              </div>
              <div className="p-4 bg-violet-50 rounded-lg">
                <div className="text-sm text-gray-600">平均专注时长</div>
                <div className="text-2xl font-bold text-violet-600">{stats.averageMinutes}分钟</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">每日统计</h4>
              <div className="space-y-2">
                {Object.entries(stats.byDay).map(([date, minutes]) => (
                  <div key={date} className="flex justify-between items-center text-sm">
                    <span>{date}</span>
                    <span>{Math.round(minutes)}分钟</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-violet-600" />
          <h2 className="text-lg font-semibold">
            {isBreakTime ? '休息时间' : '专注模式'}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!isSoundEnabled)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isSoundEnabled ? (
              <Volume2 className="w-5 h-5 text-gray-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <button
            onClick={() => setShowStats(true)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <LineChart className="w-5 h-5 text-gray-600" />
          </button>
          <Coffee className={`w-6 h-6 ${isBreakTime ? 'text-amber-700' : 'text-gray-400'}`} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 mb-4">
        <div className="text-4xl font-bold text-violet-600">
          <span
            className={`cursor-pointer ${!isTimerActive && 'hover:text-violet-700'}`}
            onClick={() => {
              if (!isTimerActive) {
                setTimePickerType('minutes');
                setShowTimePicker(true);
              }
            }}
          >
            {Math.floor(currentTime / 60).toString().padStart(2, '0')}
          </span>
          :
          <span
            className={`cursor-pointer ${!isTimerActive && 'hover:text-violet-700'}`}
            onClick={() => {
              if (!isTimerActive) {
                setTimePickerType('seconds');
                setShowTimePicker(true);
              }
            }}
          >
            {(currentTime % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        {!isTimerActive ? (
          <>
            <button
              onClick={startTimer}
              className="flex-1 py-2 rounded-xl bg-violet-100 text-violet-600 text-sm hover:bg-violet-200"
            >
              {isBreakTime ? '开始休息' : '开始专注'}
            </button>
            {!isBreakTime && (
              <button
                onClick={startBreak}
                className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm hover:bg-gray-200"
              >
                休息一下
              </button>
            )}
          </>
        ) : (
          <div className="flex gap-3 w-full">
            <button
              onClick={cancelTimer}
              className="flex-1 py-2 rounded-xl bg-red-100 text-red-600 text-sm hover:bg-red-200 flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              暂停
            </button>
            <button
              onClick={resetTimer}
              className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              重置
            </button>
          </div>
        )}
      </div>

      {isBreakTime && !isTimerActive && (
        <button
          onClick={() => {
            setIsBreakTime(false);
            setCurrentTime(focusTime);
          }}
          className="w-full mt-3 py-2 rounded-xl bg-violet-600 text-white text-sm hover:bg-violet-700"
        >
          结束休息
        </button>
      )}

      {focusHistory.length > 0 && !isBreakTime && (
        <div className="mt-4 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-600 mb-2">专注记录</h3>
          <div className="space-y-2">
            {focusHistory.slice(0, 3).map((record, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm text-gray-500"
              >
                <span>{new Date(record.date).toLocaleDateString()}</span>
                <span>{Math.floor(record.duration / 60)}分钟</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {showTimePicker && <TimePicker />}
      {showStats && <StatsModal />}
    </div>
  );
}

export default FocusTimer;