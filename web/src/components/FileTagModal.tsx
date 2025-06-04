import { useState, useEffect } from 'react';

// 标签接口
interface Tag {
  id: number;
  tagId: string;
  tagName: string;
  createdAt: string;
  updatedAt: string;
}

// 文件接口
interface FileItem {
  id: number;
  fileId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileLocalPath: string;
  fileOssPath: string;
  createdAt: string;
  updatedAt: string;
  tagId: string;
  tags?: Tag[];
}

interface FileTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: FileItem | null;
  onTagsUpdated: () => void;
}

const FileTagModal = ({ isOpen, onClose, file, onTagsUpdated }: FileTagModalProps) => {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [fileTags, setFileTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);

  // 获取所有标签
  const fetchAllTags = async () => {
    try {
      const response = await fetch('http://localhost:8000/tags?page=1&pageSize=100');
      if (response.ok) {
        const result = await response.json();
        if (result.code === 0) {
          setAllTags(result.data.list || []);
        }
      }
    } catch (error) {
      console.error('获取标签列表失败:', error);
    }
  };

  // 绑定标签
  const bindTag = async (tagId: string) => {
    if (!file) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/tags/bind', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileId: file.fileId,
          tagId: tagId
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.code === 0) {
          // 更新文件标签列表
          const newTag = allTags.find(tag => tag.tagId === tagId);
          if (newTag) {
            setFileTags(prev => [...prev, newTag]);
          }
          onTagsUpdated(); // 通知父组件更新
        } else {
          alert(result.message || '绑定标签失败');
        }
      } else {
        alert('绑定标签失败');
      }
    } catch (error) {
      console.error('绑定标签失败:', error);
      alert('绑定标签失败');
    } finally {
      setLoading(false);
    }
  };

  // 解绑标签
  const unbindTag = async (tagId: string) => {
    if (!file) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/tags/unbind', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileId: file.fileId,
          tagId: tagId
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.code === 0) {
          // 从文件标签列表中移除
          setFileTags(prev => prev.filter(tag => tag.tagId !== tagId));
          onTagsUpdated(); // 通知父组件更新
        } else {
          alert(result.message || '解绑标签失败');
        }
      } else {
        alert('解绑标签失败');
      }
    } catch (error) {
      console.error('解绑标签失败:', error);
      alert('解绑标签失败');
    } finally {
      setLoading(false);
    }
  };

  // 检查标签是否已绑定
  const isTagBound = (tagId: string) => {
    return fileTags.some(tag => tag.tagId === tagId);
  };

  useEffect(() => {
    if (isOpen && file) {
      fetchAllTags();
      setFileTags(file.tags || []);
    }
  }, [isOpen, file]);

  if (!isOpen || !file) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* 头部 */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              管理文件标签
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500 truncate" title={file.fileName}>
            {file.fileName}
          </p>
        </div>

        {/* 内容 */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">
          {/* 已绑定标签 */}
          {fileTags.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">已绑定标签</h4>
              <div className="flex flex-wrap gap-2">
                {fileTags.map((tag) => (
                  <div
                    key={tag.tagId}
                    className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{tag.tagName}</span>
                    <button
                      onClick={() => unbindTag(tag.tagId)}
                      disabled={loading}
                      className="ml-2 text-blue-600 hover:text-blue-800 disabled:opacity-50"
                      title="解绑标签"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 可绑定标签 */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">可绑定标签</h4>
            <div className="flex flex-wrap gap-2">
              {allTags
                .filter(tag => !isTagBound(tag.tagId))
                .map((tag) => (
                  <button
                    key={tag.tagId}
                    onClick={() => bindTag(tag.tagId)}
                    disabled={loading}
                    className="flex items-center bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 rounded-full text-sm transition-colors disabled:opacity-50"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    {tag.tagName}
                  </button>
                ))}
            </div>

            {allTags.filter(tag => !isTagBound(tag.tagId)).length === 0 && (
              <p className="text-gray-500 text-sm">没有可绑定的标签</p>
            )}
          </div>
        </div>

        {/* 底部 */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileTagModal; 
