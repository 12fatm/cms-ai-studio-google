import React, { useState } from 'react';
import { Edit3, XCircle, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

interface InlineEditorProps {
  initialValue: string;
  onSave: (newValue: string) => Promise<void>;
  maxLength?: number;
  label?: string;
}

export const InlineEditor: React.FC<InlineEditorProps> = ({
  initialValue,
  onSave,
  maxLength = 500,
  label,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    if (value === initialValue) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(value);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="group relative p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-brand transition-all">
        {label && <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{label}</span>}
        <p className="text-sm text-slate-700 whitespace-pre-wrap">{value}</p>
        <button
          onClick={handleEdit}
          className="absolute top-2 right-2 p-2 text-slate-400 hover:text-brand opacity-0 group-hover:opacity-100 transition-all"
          aria-label="Edit"
        >
          <Edit3 size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4 bg-white border border-brand/30 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-1">
        {label && <span className="text-[10px] font-bold text-brand uppercase">{label}</span>}
        <span className={cn("text-[10px]", value.length >= maxLength ? "text-red-500" : "text-slate-400")}>
          {value.length} / {maxLength}
        </span>
      </div>
      
      <textarea
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, maxLength))}
        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-sm min-h-[100px] resize-none"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={handleCancel}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2 border border-slate-200 rounded-full text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-50"
        >
          <XCircle size={18} />
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          disabled={isSaving || value === initialValue}
          className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-full text-sm font-semibold hover:bg-brand-hover shadow-lg shadow-brand/20 transition-all disabled:opacity-50 disabled:shadow-none"
        >
          <RefreshCw size={18} className={cn(isSaving && "animate-spin")} />
          {isSaving ? 'Updating...' : 'Update'}
        </button>
      </div>
    </div>
  );
};
