import { useState, useEffect } from 'react';

// 标签接口
interface Tag {
  id: number;
  tagId: string;
  tagName: string;
  createdAt: string;
  updatedAt: string;
}

// 标签API响应接口
interface TagsResponse {
  code: number;
  data: {
    list: Tag[];
    total: number;
  };
}

interface TagFilterProps {
  selectedTagId?: string | null;
  onTagSelect: (tagId: string | null) => void;
}

const TagFilter = ({ selectedTagId, onTagSelect }: TagFilterProps) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);

  // 获取所有标签
  const fetchTags = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/tags?page=1&pageSize=100');
      if (response.ok) {
        const result: TagsResponse = await response.json();
        if (result.code === 0) {
          setTags(result.data.list);
        } else {
          console.error('获取标签列表失败:', result);
        }
      } else {
        console.error('获取标签列表失败:', await response.text());
      }
    } catch (error) {
      console.error('获取标签列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 组件加载时获取标签列表
  useEffect(() => {
    fetchTags();
  }, []);

  // 处理标签点击
  const handleTagClick = (tagId: string) => {
    if (selectedTagId === tagId) {
      // 如果点击的是已选中的标签，则取消选择
      onTagSelect(null);
    } else {
      // 选择新标签
      onTagSelect(tagId);
    }
  };

  // 处理"全部"按钮点击
  const handleAllClick = () => {
    onTagSelect(null);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-medium text-slate-800 mb-4">标签筛选</h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
          <span className="ml-2 text-slate-500">加载中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="font-medium text-slate-800 mb-4">标签筛选</h3>

      <div className="flex flex-wrap gap-2">
        {/* 全部按钮 */}
        <button
          onClick={handleAllClick}
          className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${!selectedTagId
            ? 'bg-indigo-500 text-white border-indigo-500 shadow-md'
            : 'bg-white text-slate-600 border-slate-300 hover:border-indigo-300 hover:text-indigo-600'
            }`}
        >
          全部
        </button>

        {/* 标签列表 */}
        {tags.map((tag) => (
          <button
            key={tag.tagId}
            onClick={() => handleTagClick(tag.tagId)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${selectedTagId === tag.tagId
              ? 'bg-indigo-500 text-white border-indigo-500 shadow-md'
              : 'bg-white text-slate-600 border-slate-300 hover:border-indigo-300 hover:text-indigo-600'
              }`}
          >
            {tag.tagName}
          </button>
        ))}
      </div>

      {/* 空状态 */}
      {tags.length === 0 && !loading && (
        <div className="text-center py-8">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
          </svg>
          <p className="text-slate-500">暂无标签</p>
        </div>
      )}

      {/* 选中状态提示 */}
      {selectedTagId && (
        <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-indigo-700">
              已选择标签: <strong>{tags.find(tag => tag.tagId === selectedTagId)?.tagName}</strong>
            </span>
            <button
              onClick={handleAllClick}
              className="text-xs text-indigo-600 hover:text-indigo-800 underline"
            >
              清除筛选
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFilter; 
