// src/pages/index.js
import React, { useState } from 'react';
import { 
  PlusCircle, Search, Calendar, Clock, Tag, MoreVertical, Edit3, 
  Trash2, Sun, Moon, Cloud, Smile, Music, 
  Palette, Camera, Mic, MapPin, Coffee, Brain,
  Sparkles, ChevronDown, ChevronUp
} from 'lucide-react';
import { AppProvider } from '@/contexts/AppContext';
import { MoodTracker } from '@/components/MoodTracker/MoodTracker';
import { FocusTimer } from '@/components/FocusTimer/FocusTimer';
import { QuickActions } from '@/components/QuickActions/QuickActions';
import { CategoryGrid } from '@/components/Categories/CategoryGrid';


// 示例备忘录数据
const longMemoExample = {
  id: 1,
  title: "产品设计会议纪要",
  content: `今天的产品设计会议讨论了多个重要议题：首先是用户反馈分析，我们发现用户对新界面的响应速度很满意，但对某些功能的入口位置提出了建议。其次讨论了下一版本的功能规划，包括数据分析模块的优化、批量处理功能的添加等。最后确定了时间节点，预计在下月初发布新版本。团队还特别提出了性能优化的重要性，准备进行专项优化...`,
  time: "11月07日 14:30",
  aiSummary: "• 讨论用户反馈：界面响应好，功能入口需优化\n• 规划新版本：改进数据分析，添加批量处理\n• 时间节点：下月初发布\n• 重点关注性能优化",
  tags: ["工作", "会议"]
};

export default function Home() {
  const [mode, setMode] = useState('light');
  const [expandedMemo, setExpandedMemo] = useState(null);

  // 渲染备忘录
  const renderMemoWithAI = (memo) => (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-violet-600" />
          <div className="flex gap-2">
            {memo.tags.map(tag => (
              <span key={tag} className="text-sm px-2 py-1 bg-violet-50 text-violet-600 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-500">{memo.time}</span>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">{memo.title}</h3>
      
      {/* AI 摘要部分 */}
      <div className="mb-4 bg-violet-50 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2 text-violet-600">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI 摘要</span>
        </div>
        <p className="text-sm text-gray-600 whitespace-pre-line">{memo.aiSummary}</p>
      </div>

      {/* 内容部分 */}
      <div className="relative">
        <p className={`text-sm text-gray-600 ${expandedMemo === memo.id ? '' : 'line-clamp-3'}`}>
          {memo.content}
        </p>
        {memo.content.length > 150 && (
          <button
            onClick={() => setExpandedMemo(expandedMemo === memo.id ? null : memo.id)}
            className="flex items-center gap-1 text-violet-600 text-sm mt-2"
          >
            {expandedMemo === memo.id ? (
              <>
                收起 <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                展开全文 <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-end gap-2 mt-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Edit3 className="w-4 h-4 text-gray-500" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Trash2 className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );

  return (
    <AppProvider>
      <div className={`min-h-screen ${mode === 'light' ? 'bg-gradient-to-b from-violet-50 to-white' : 'bg-gradient-to-b from-gray-900 to-violet-900'}`}>
        {/* Banner Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-500 opacity-90"></div>
          <div className="relative px-6 py-8 text-white">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Good Morning</h1>
                <p className="text-sm opacity-80">今天是个创造美好回忆的日子</p>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-8 h-8" />
                <span className="text-2xl font-semibold">24°</span>
              </div>
            </div>
            
            {/* 心情跟踪组件 */}
            <MoodTracker />
          </div>
        </div>

        {/* Focus Timer Section */}
        <div className="px-6 py-4">
          <FocusTimer />
        </div>

        {/* Category Chips */}
        <div className="px-6 py-4">
          <CategoryGrid />
        </div>

        {/* Memos Section */}
        <div className="px-6 py-4">
          <div className="space-y-4">
            {/* Text Memo */}
            {renderMemoWithAI(longMemoExample)}

            {/* Voice Memo */}
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Mic className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">语音备忘</h3>
                  <p className="text-sm text-gray-500">1分30秒</p>
                </div>
                <div className="flex-1 h-12 bg-gray-100 rounded-full">
                  {/* 音频波形图 */}
                  <div className="h-full flex items-center px-4">
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-1 bg-violet-400 mx-0.5 rounded-full"
                        style={{ height: `${Math.random() * 100}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Component */}
        <QuickActions />

        {/* Theme Toggle */}
        <button 
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          className="fixed bottom-8 left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          {mode === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        </button>
      </div>
    </AppProvider>
  );
}