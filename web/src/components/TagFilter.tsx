import { useState, useEffect } from 'react';

// 标签接口
interface Tag {
  id: number;
  tagId: string;
  tagName: string;
  createdAt: string;
  updatedAt: string;
}

interface TagFilterProps {
  selectedTagId: string | null;
  onTagSelect: (tagId: string | null) => void;
  onTagsChange?: () => void; // 标签变化时的回调
}

const TagFilter = ({ selectedTagId, onTagSelect, onTagsChange }: TagFilterProps) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  // 获取标签列表
  const fetchTags = async () => {
    try {
      const response = await fetch('http://localhost:8000/tags?page=1&pageSize=100');
      if (response.ok) {
        const result = await response.json();
        if (result.code === 0) {
          setTags(result.data.list || []);
        }
      }
    } catch (error) {
      console.error('获取标签列表失败:', error);
    }
  };

  // 创建新标签
  const createTag = async () => {
    if (!newTagName.trim()) return;

    try {
      const response = await fetch('http://localhost:8000/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tagName: newTagName.trim()
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.code === 0) {
          setNewTagName('');
          setIsCreating(false);
          await fetchTags(); // 重新获取标签列表
          onTagsChange?.(); // 通知父组件标签列表变化
        } else {
          alert(result.message || '创建标签失败');
        }
      } else {
        alert('创建标签失败');
      }
    } catch (error) {
      console.error('创建标签失败:', error);
      alert('创建标签失败');
    }
  };

  // 删除标签
  const deleteTag = async (tagId: string) => {
    if (!confirm('确定要删除这个标签吗？')) return;

    try {
      const response = await fetch('http://localhost:8000/tags', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tagId })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.code === 0) {
          await fetchTags(); // 重新获取标签列表
          if (selectedTagId === tagId) {
            onTagSelect(null); // 如果删除的是当前选中的标签，清除选择
          }
          onTagsChange?.(); // 通知父组件标签列表变化
        } else {
          alert(result.message || '删除标签失败');
        }
      } else {
        alert('删除标签失败');
      }
    } catch (error) {
      console.error('删除标签失败:', error);
      alert('删除标签失败');
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-slate-800">标签筛选</h3>
        <button
          onClick={() => setIsCreating(true)}
          className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded-lg transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          新建标签
        </button>
      </div>

      {/* 新建标签输入框 */}
      {isCreating && (
        <div className="mb-4 p-3 border border-slate-200 rounded-lg bg-slate-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="请输入标签名称"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && createTag()}
            />
            <button
              onClick={createTag}
              className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md transition-colors"
            >
              确定
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewTagName('');
              }}
              className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-md transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {/* 全部标签 */}
        <button
          onClick={() => onTagSelect(null)}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedTagId === null
            ? 'bg-indigo-500 text-white'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
        >
          全部
        </button>

        {/* 标签列表 */}
        {tags.map((tag) => (
          <div key={tag.tagId} className="flex items-center group">
            <button
              onClick={() => onTagSelect(tag.tagId)}
              className={`px-3 py-1.5 rounded-l-full text-sm transition-colors ${selectedTagId === tag.tagId
                ? 'bg-indigo-500 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              {tag.tagName}
            </button>
            <button
              onClick={() => deleteTag(tag.tagId)}
              className={`px-2 py-1.5 rounded-r-full text-sm transition-colors opacity-0 group-hover:opacity-100 ${selectedTagId === tag.tagId
                ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                : 'bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600'
                }`}
              title="删除标签"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagFilter; 
