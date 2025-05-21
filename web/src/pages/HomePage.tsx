import { useState, useRef } from 'react';

// 文件类型接口
interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  status: 'success' | 'uploading' | 'error';
  progress?: number;
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
      className={`bg-white dark:bg-slate-800 rounded-xl border-2 border-dashed p-10 
        transition-all duration-200 flex flex-col items-center justify-center text-center
        ${isDragging
          ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10 shadow-lg'
          : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800/80'
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
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">上传文件</h3>
      <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md">
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
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-5">
        支持所有常见文件类型，单个文件最大 500MB
      </p>
    </div>
  );
};

// 文件列表组件
const FileList = ({ files, onDeleteFile }: { files: FileItem[], onDeleteFile: (id: string) => void }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
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

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return (
        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
      );
    } else if (fileType.startsWith('video/')) {
      return (
        <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </div>
      );
    } else if (fileType.startsWith('audio/')) {
      return (
        <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
          </svg>
        </div>
      );
    } else if (fileType === 'application/pdf') {
      return (
        <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
          </svg>
        </div>
      );
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return (
        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
      );
    }
  };

  if (files.length === 0) {
    return (
      <div className="py-16 text-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <svg className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
        </svg>
        <p className="mt-4 text-slate-500 dark:text-slate-400">尚未上传任何文件</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <h3 className="font-medium text-slate-800 dark:text-white">已上传文件</h3>
        <span className="text-sm text-slate-500 dark:text-slate-400">{files.length} 个文件</span>
      </div>
      <div className="divide-y divide-slate-200 dark:divide-slate-700 max-h-[350px] overflow-y-auto">
        {files.map(file => (
          <div key={file.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
            <div className="flex items-center">
              {getFileIcon(file.type)}
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate" title={file.name}>
                    {file.name}
                  </h4>
                  <div className="flex items-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400 mr-4 whitespace-nowrap">
                      {formatFileSize(file.size)}
                    </span>
                    <button
                      onClick={() => onDeleteFile(file.id)}
                      className="text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(file.uploadDate)}
                  </span>

                  {file.status === 'uploading' && (
                    <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${file.progress || 0}%` }}
                      ></div>
                    </div>
                  )}
                  {file.status === 'success' && (
                    <span className="text-xs text-green-500 dark:text-green-400 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      已完成
                    </span>
                  )}
                  {file.status === 'error' && (
                    <span className="text-xs text-red-500 dark:text-red-400 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      上传失败
                    </span>
                  )}
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
            const fileIndex = prevFiles.findIndex(f => f.id === fileItem.id);
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
          // 上传成功
          setFiles(prevFiles => {
            const fileIndex = prevFiles.findIndex(f => f.id === fileItem.id);
            if (fileIndex === -1) return prevFiles;

            const updatedFiles = [...prevFiles];
            updatedFiles[fileIndex] = {
              ...updatedFiles[fileIndex],
              status: 'success',
              progress: 100
            };
            return updatedFiles;
          });
        } else {
          // 上传失败
          setFiles(prevFiles => {
            const fileIndex = prevFiles.findIndex(f => f.id === fileItem.id);
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
          const fileIndex = prevFiles.findIndex(f => f.id === fileItem.id);
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
        const fileIndex = prevFiles.findIndex(f => f.id === fileItem.id);
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
    const newFileItems: FileItem[] = newFiles.map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date(),
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
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  return (
    <div className="h-full w-full flex justify-center bg-slate-50 dark:bg-slate-900">
      <div className="w-full">
        <div className="grid gap-8 p-6">
          <UploadArea onFilesAdded={handleFilesAdded} />
          <FileList files={files} onDeleteFile={handleDeleteFile} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
