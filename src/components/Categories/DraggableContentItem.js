import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DraggableContentItem = ({ item, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      ref={setNodeRef}
      style={style}
      className="p-4 border rounded-lg hover:bg-gray-50 transition-all"
    >
      <div className="flex items-start gap-2">
        <button
          className="p-2 hover:bg-gray-200 rounded cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </button>
        <div className="flex-1">
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
            {item.type === 'schedule' && item.time && (
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {item.time}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 