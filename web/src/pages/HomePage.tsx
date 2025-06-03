import { useState, useRef, useEffect } from 'react';
import TagFilter from '../components/TagFilter';

// 标签接口
interface Tag {
  id: number;
  tagId: string;
  tagName: string;
  createdAt: string;
  updatedAt: string;
}

// 文件类型接口 - 更新以匹配后端返回的数据结构
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
  tags?: Tag[]; // 添加标签数组字段
  // 前端状态字段
  status?: 'success' | 'uploading' | 'error';
  progress?: number;
}

// 后端API响应接口
interface FileListResponse {
  code: number;
  data: {
    list: FileItem[];
    total: number;
  }
}

// 上传区域组件
const UploadArea = ({ onFilesAdded }: { onFilesAdded: (files: File[]) => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesAdded(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(Array.from(e.target.files));
      // 清空input，允许重复选择相同文件
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`bg-white rounded-xl border-2 border-dashed p-10 
        transition-all duration-200 flex flex-col items-center justify-center text-center
        ${isDragging
          ? 'border-indigo-500 bg-indigo-50 shadow-lg'
          : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="w-20 h-20 mb-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">上传文件</h3>
      <p className="text-gray-600 mb-6 max-w-md">
        拖放文件到此处，或者点击下方按钮选择文件
      </p>
      <button
        onClick={triggerFileInput}
        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
      >
        选择文件
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          onChange={handleFileInputChange}
        />
      </button>
      <p className="text-gray-500 mt-5 text-sm">
        支持所有常见文件类型，单个文件最大 500MB
      </p>
    </div>
  );
};

// 文件列表组件
const FileList = ({ files, onDeleteFile }: { files: FileItem[], onDeleteFile: (id: string) => void }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1000) return bytes + ' B';
    if (bytes < 1000 * 1000) return Math.round(bytes / 1000) + ' KB';
    if (bytes < 1000 * 1000 * 1000) return Math.round(bytes / (1000 * 1000)) + ' MB';
    return Math.round(bytes / (1000 * 1000 * 1000)) + ' GB';
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 获取文件类型显示名称
  const getFileTypeDisplay = (fileType: string): string => {
    if (fileType.startsWith('image/')) return '图片';
    if (fileType.startsWith('video/')) return '视频';
    if (fileType.startsWith('audio/')) return '音频';
    if (fileType === 'application/pdf') return 'PDF';
    if (fileType.includes('word') || fileType.includes('document')) return 'Word';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'Excel';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return 'PPT';
    if (fileType.startsWith('text/')) return '文本';
    if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('7z')) return '压缩包';
    return fileType;
  };

  // 下载文件
  const handleDownload = (file: FileItem) => {
    const link = document.createElement('a');
    link.href = `http://localhost:8000/${file.fileOssPath}`;
    link.download = file.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 删除文件
  const handleDelete = async (file: FileItem) => {
    if (window.confirm(`确定要删除文件 "${file.fileName}" 吗？`)) {
      try {
        const response = await fetch(`http://localhost:8000/file_delete`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileId: file.fileId })
        });

        if (response.ok) {
          const result = await response.json();
          // 删除成功，更新UI
          if (result.code === 0) {
            onDeleteFile(file.fileId);
          } else {
            alert(result.message);
            console.error('删除文件失败:', result.message);
          }
          // 可选：重新获取文件列表
          // fetchFileList();
        } else {
          console.error('删除文件失败:', await response.text());
        }
      } catch (error) {
        console.error('删除文件失败:', error);
      }
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return (
        <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
      );
    } else if (fileType.startsWith('video/')) {
      return (
        <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </div>
      );
    } else if (fileType.startsWith('audio/')) {
      return (
        <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
          </svg>
        </div>
      );
    } else if (fileType === 'application/pdf') {
      return (
        <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
          </svg>
        </div>
      );
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return (
        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
      );
    }
  };

  if (files.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-xl border border-slate-200">
        <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
        </svg>
        <p className="mt-4 text-gray-600">尚未上传任何文件</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-medium text-slate-800">文件列表</h3>
        <span className="text-sm text-slate-500">{files.length} 个文件</span>
      </div>
      <div className="divide-y divide-slate-200">
        {files.map(file => (
          <div key={file.fileId} className="p-4 hover:bg-slate-50 transition-colors group">
            <div className="flex items-start">
              {getFileIcon(file.fileType)}
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-slate-800 truncate" title={file.fileName}>
                      {file.fileName}
                    </h4>
                    <div className="mt-1">
                      <div className="flex items-center text-xs text-slate-500">
                        <span className="inline-block px-2 py-0.5 bg-gray-100 rounded text-gray-700 mr-2">
                          {getFileTypeDisplay(file.fileType)}
                        </span>
                        <span>{formatFileSize(file.fileSize)}</span>
                      </div>

                      {/* 标签显示 */}
                      {file.tags && file.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {file.tags.map((tag) => (
                            <span
                              key={tag.tagId}
                              className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                              {tag.tagName}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-2 flex items-center">
                        <span className="text-xs text-slate-500 mr-3">
                          {formatDate(new Date(file.createdAt))}
                        </span>

                        {file.status === 'uploading' && (
                          <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                              style={{ width: `${file.progress || 0}%` }}
                            ></div>
                          </div>
                        )}
                        {file.status === 'success' && (
                          <span className="text-xs text-green-600 flex items-center">
                            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            已完成
                          </span>
                        )}
                        {file.status === 'error' && (
                          <span className="text-xs text-red-600 flex items-center">
                            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            上传失败
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center space-x-1 ml-4">
                    <button
                      onClick={() => handleDownload(file)}
                      className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                      title="下载文件"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15L12 3M12 15L8.5 11.5M12 15L15.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 21H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(file)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="删除文件"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16M10 11V16M14 11V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 主页组件
const HomePage = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  // 获取文件列表
  const fetchFileList = async (tagId?: string | null) => {
    try {
      // 构建查询参数
      const params = new URLSearchParams({
        page: '1',
        pageSize: '100'
      });

      // 如果有选中的标签，添加到查询参数
      if (tagId) {
        params.append('tagId', tagId);
      }

      const response = await fetch(`http://localhost:8000/file_list?${params.toString()}`);
      if (response.ok) {
        const result: FileListResponse = await response.json();
        if (result.code === 0) {
          // 为从服务器获取的文件添加成功状态
          const filesWithStatus = result.data.list.map(file => ({
            ...file,
            status: 'success' as const
          }));
          setFiles(filesWithStatus);
        } else {
          return Promise.reject()
        }

      }
    } catch (error) {
      console.error('获取文件列表失败:', error);
    }
  };

  // 组件加载时获取文件列表
  useEffect(() => {
    fetchFileList(selectedTagId);
  }, [selectedTagId]);

  // 处理标签选择
  const handleTagSelect = (tagId: string | null) => {
    setSelectedTagId(tagId);
  };

  // 上传文件到服务器
  const uploadFileToServer = async (file: File, fileItem: FileItem) => {
    try {
      // 创建FormData对象
      const formData = new FormData();
      formData.append('file', file);

      // 可以添加其他需要的字段
      formData.append('fileName', file.name);

      // 创建上传请求
      const xhr = new XMLHttpRequest();

      // 设置进度监听
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);

          // 更新文件状态
          setFiles(prevFiles => {
            const fileIndex = prevFiles.findIndex(f => f.fileId === fileItem.fileId);
            if (fileIndex === -1) return prevFiles;

            const updatedFiles = [...prevFiles];
            updatedFiles[fileIndex] = {
              ...updatedFiles[fileIndex],
              progress: percentComplete
            };
            return updatedFiles;
          });
        }
      });

      // 设置请求完成处理
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          // 上传成功，重新获取文件列表
          fetchFileList(selectedTagId);
        } else {
          // 上传失败
          setFiles(prevFiles => {
            const fileIndex = prevFiles.findIndex(f => f.fileId === fileItem.fileId);
            if (fileIndex === -1) return prevFiles;

            const updatedFiles = [...prevFiles];
            updatedFiles[fileIndex] = {
              ...updatedFiles[fileIndex],
              status: 'error',
              progress: 0
            };
            return updatedFiles;
          });
        }
      });

      // 设置错误处理
      xhr.addEventListener('error', () => {
        setFiles(prevFiles => {
          const fileIndex = prevFiles.findIndex(f => f.fileId === fileItem.fileId);
          if (fileIndex === -1) return prevFiles;

          const updatedFiles = [...prevFiles];
          updatedFiles[fileIndex] = {
            ...updatedFiles[fileIndex],
            status: 'error',
            progress: 0
          };
          return updatedFiles;
        });
      });

      // 打开连接并发送请求
      xhr.open('POST', 'http://localhost:8000/upload', true);
      xhr.send(formData);

    } catch (error) {
      console.error('上传文件出错:', error);

      // 更新文件状态为错误
      setFiles(prevFiles => {
        const fileIndex = prevFiles.findIndex(f => f.fileId === fileItem.fileId);
        if (fileIndex === -1) return prevFiles;

        const updatedFiles = [...prevFiles];
        updatedFiles[fileIndex] = {
          ...updatedFiles[fileIndex],
          status: 'error',
          progress: 0
        };
        return updatedFiles;
      });
    }
  };

  // 处理添加文件
  const handleFilesAdded = (newFiles: File[]) => {
    const newFileItems: FileItem[] = newFiles.map((file, index) => ({
      id: Date.now() + index, // 使用时间戳确保唯一性
      fileId: Math.random().toString(36).substring(2, 9),
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileLocalPath: '',
      fileOssPath: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tagId: '',
      status: 'uploading',
      progress: 0
    }));

    // 添加新文件
    setFiles(prev => [...prev, ...newFileItems]);

    // 上传每个文件
    newFiles.forEach((file, index) => {
      uploadFileToServer(file, newFileItems[index]);
    });
  };

  // 处理删除文件
  const handleDeleteFile = (id: string) => {
    // 直接从状态中移除该文件
    setFiles(prev => prev.filter(file => file.fileId !== id));

    // 可选：显示删除成功消息
    // TODO: 添加一个消息提示组件
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="space-y-8">
          <UploadArea onFilesAdded={handleFilesAdded} />
          <TagFilter selectedTagId={selectedTagId} onTagSelect={handleTagSelect} />
          <FileList files={files} onDeleteFile={handleDeleteFile} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
