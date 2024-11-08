import React, { useState } from 'react';
import { 
  Calendar, Brain, Coffee, Tag, 
  Book, Lightbulb, Home, ShoppingBag,
  Briefcase, Heart, Plane, Music,
  Film, Gamepad2 as Gamepad, Flower2 as Plant, Settings,
  X, Plus, Pencil, Trash2
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

// 首先定义 CategoryButton 组件
const CategoryButton = ({ icon: Icon, label, color, onClick }) => {
  // 添加检查确保 Icon 是有效的
  if (!Icon) {
    console.warn(`Missing icon for category: ${label}`);
    return null;
  }

  return (
    <button 
      onClick={onClick}
      className={`p-4 rounded-xl ${color} flex flex-col items-center gap-2 
                  transition-all duration-200 hover:shadow-md hover:scale-105
                  active:scale-95`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

// 对话框标题组件
const DialogTitle = ({ children }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-semibold text-gray-900">{children}</h2>
  </div>
);

// 对话框内容包装组件
const StyledDialogContent = ({ children, ...props }) => (
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
    <Dialog.Content
      className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
                max-h-[85vh] w-[90vw] max-w-[600px] rounded-xl bg-white p-6
                shadow-lg animate-scale-in overflow-y-auto"
      {...props}
    >
      {children}
      <Dialog.Close className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100">
        <X className="w-4 h-4 text-gray-500" />
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
);

// 分类定义保持不变...
const categories = [
  { id: 1, icon: Calendar, label: '日程', color: 'bg-blue-100 text-blue-600', type: 'schedule' },
  { id: 2, icon: Brain, label: '灵感', color: 'bg-purple-100 text-purple-600', type: 'inspiration' },
  { id: 3, icon: Coffee, label: '生活', color: 'bg-yellow-100 text-yellow-600', type: 'life' },
  { id: 4, icon: Tag, label: '更多', color: 'bg-gray-100 text-gray-600', type: 'more' }
];

const extendedCategories = [
  { id: 5, icon: Book, label: '学习', color: 'bg-green-100 text-green-600', type: 'study' },
  { id: 6, icon: Lightbulb, label: '创意', color: 'bg-amber-100 text-amber-600', type: 'creative' },
  { id: 7, icon: Home, label: '家庭', color: 'bg-rose-100 text-rose-600', type: 'family' },
  { id: 8, icon: ShoppingBag, label: '购物', color: 'bg-pink-100 text-pink-600', type: 'shopping' },
  { id: 9, icon: Briefcase, label: '工作', color: 'bg-slate-100 text-slate-600', type: 'work' },
  { id: 10, icon: Heart, label: '健康', color: 'bg-red-100 text-red-600', type: 'health' },
  { id: 11, icon: Plane, label: '旅行', color: 'bg-sky-100 text-sky-600', type: 'travel' },
  { id: 12, icon: Music, label: '音乐', color: 'bg-indigo-100 text-indigo-600', type: 'music' },
  { id: 13, icon: Film, label: '影视', color: 'bg-violet-100 text-violet-600', type: 'movie' },
  { id: 14, icon: Gamepad, label: '游戏', color: 'bg-emerald-100 text-emerald-600', type: 'game' },
  { id: 15, icon: Plant, label: '兴趣', color: 'bg-lime-100 text-lime-600', type: 'hobby' },
  { id: 16, icon: Settings, label: '设置', color: 'bg-zinc-100 text-zinc-600', type: 'settings' }
];

// 内容项组件
const ContentItem = ({ item, onEdit, onDelete }) => (
  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-all">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-medium">{item.title}</h3>
      <div className="flex gap-2">
        <button 
          onClick={() => onEdit(item)}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
        >
          <Pencil className="w-4 h-4 text-gray-600" />
        </button>
        <button 
          onClick={() => onDelete(item.id)}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
    <p className="text-sm text-gray-600">{item.description}</p>
    <div className="flex justify-between items-center mt-2">
      <span className="text-xs text-gray-500">
        {new Date(item.date).toLocaleDateString()}
      </span>
      {item.type === 'schedule' && (
        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
          {item.time}
        </span>
      )}
    </div>
  </div>
);

// 内容表单组件
const ContentForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    type: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          rows="3"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            required
          />
        </div>
        {formData.type === 'schedule' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">时间</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          {initialData ? '保存修改' : '创建'}
        </button>
      </div>
    </form>
  );
};

// 主组件
export const CategoryGrid = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [contents, setContents] = useState([]);

  const handleCategoryClick = (category) => {
    if (category.type === 'more') {
      setShowAllCategories(true);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleCreateContent = (data) => {
    const newItem = {
      id: Date.now(),
      ...data,
      type: selectedCategory.type
    };
    setContents([...contents, newItem]);
    setShowForm(false);
  };

  const handleEditContent = (data) => {
    const updatedContents = contents.map(item =>
      item.id === editingItem.id ? { ...item, ...data } : item
    );
    setContents(updatedContents);
    setEditingItem(null);
  };

  const handleDeleteContent = (id) => {
    if (window.confirm('确定要删除这项内容吗？')) {
      setContents(contents.filter(item => item.id !== id));
    }
  };

  const handleQuickTemplate = (template) => {
    setShowForm(true);
    // 根据模板类型预填充表单
    if (template === 'meeting') {
      setEditingItem({
        title: '新会议记录',
        description: '',
        date: new Date().toISOString().split('T')[0],
        time: '',
        type: 'schedule'
      });
    } else if (template === 'reminder') {
      setEditingItem({
        title: '新提醒事项',
        description: '',
        date: new Date().toISOString().split('T')[0],
        time: '',
        type: 'schedule'
      });
    }
  };

  const categoryContents = contents.filter(
    item => selectedCategory && item.type === selectedCategory.type
  );

  // 渲染主网格和弹窗...
  return (
    <>
      {/* 主要分类网格 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            {...category}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>

      {/* 所有分类对话框 */}
      <Dialog.Root open={showAllCategories} onOpenChange={setShowAllCategories}>
        <StyledDialogContent>
          <DialogTitle>所有分类</DialogTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {extendedCategories.map(category => (
              <CategoryButton
                key={category.id}
                {...category}
                onClick={() => {
                  setShowAllCategories(false);
                  setSelectedCategory(category);
                }}
              />
            ))}
          </div>
        </StyledDialogContent>
      </Dialog.Root>

      {/* 分类详情对话框 */}
      <Dialog.Root open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
        <StyledDialogContent>
          {selectedCategory && (
            <>
              <DialogTitle className="flex items-center gap-2">
                <selectedCategory.icon className={`w-5 h-5 ${selectedCategory.color.split(' ')[1]}`} />
                <span>{selectedCategory.label}</span>
              </DialogTitle>

              {showForm ? (
                <ContentForm
                  onSubmit={editingItem ? handleEditContent : handleCreateContent}
                  initialData={editingItem}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                />
              ) : (
                <div className="space-y-6">
                  {categoryContents.length === 0 ? (
                    <div className="text-center py-6">
                      <div className={`w-16 h-16 mx-auto rounded-full ${selectedCategory.color} 
                                   flex items-center justify-center mb-4`}>
                        <selectedCategory.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        还没有{selectedCategory.label}相关的内容
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        点击下方按钮创建新的{selectedCategory.label}内容
                      </p>
                      <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-violet-600 text-white rounded-lg 
                                 hover:bg-violet-700 transition-colors active:scale-95"
                      >
                        创建新内容
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">内容列表</h3>
                        <button
                          onClick={() => setShowForm(true)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-violet-600 text-white rounded-lg 
                                   hover:bg-violet-700 transition-colors text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          新建
                        </button>
                      </div>
                      <div className="space-y-3">
                        {categoryContents.map(item => (
                          <ContentItem
                            key={item.id}
                            item={item}
                            onEdit={(item) => {
                              setEditingItem(item);
                              setShowForm(true);
                            }}
                            onDelete={handleDeleteContent}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {selectedCategory.type === 'schedule' && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">快速模板</h4>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleQuickTemplate('meeting')}
                          className="w-full p-3 text-left rounded-lg border 
                                   hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>创建会议记录</span>
                        </button>
                        <button
                          onClick={() => handleQuickTemplate('reminder')}
                          className="w-full p-3 text-left rounded-lg border 
                                   hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                          <Tag className="w-4 h-4 text-violet-600" />
                          <span>添加提醒事项</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </StyledDialogContent>
      </Dialog.Root>
    </>
  );
};