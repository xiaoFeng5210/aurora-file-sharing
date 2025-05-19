import { useState } from 'react';
import FileItem from './FileItem';
import type { FileItem as FileItemType } from '../types';

// 示例数据
const MOCK_FILES: FileItemType[] = [
  // { id: 1, name: '个人文档', type: 'folder', size: null, modified: '2023-05-15', shared: false },
  // { id: 2, name: '工作文件', type: 'folder', size: null, modified: '2023-05-14', shared: true },
  // { id: 3, name: '项目计划.docx', type: 'doc', size: '2.3 MB', modified: '2023-05-13', shared: false },
  // { id: 4, name: '财务报表.xlsx', type: 'spreadsheet', size: '4.5 MB', modified: '2023-05-12', shared: true },
  // { id: 5, name: '演示文稿.pptx', type: 'presentation', size: '8.1 MB', modified: '2023-05-11', shared: false },
  // { id: 6, name: '产品图片.jpg', type: 'image', size: '1.2 MB', modified: '2023-05-10', shared: false },
  // { id: 7, name: '用户手册.pdf', type: 'pdf', size: '3.4 MB', modified: '2023-05-09', shared: true },
  // { id: 8, name: '视频教程.mp4', type: 'video', size: '15.7 MB', modified: '2023-05-08', shared: false },
];

const FileList = () => {
  const [files, setFiles] = useState(MOCK_FILES);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // 排序文件
  const sortedFiles = [...files].sort((a, b) => {
    if (a[sortField as keyof typeof a] === null) return 1;
    if (b[sortField as keyof typeof b] === null) return -1;

    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];

    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // 先显示文件夹，再显示文件
  const orderedFiles = [
    ...sortedFiles.filter(file => file.type === 'folder'),
    ...sortedFiles.filter(file => file.type !== 'folder')
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
      <div className="grid grid-cols-12 gap-4 px-6 py-3.5 text-sm font-medium text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
        <div className="col-span-6 sm:col-span-5 flex items-center gap-2">
          <button
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
            onClick={() => handleSort('name')}
          >
            文件名
            {sortField === 'name' && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sortDirection === 'asc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}></path>
              </svg>
            )}
          </button>
        </div>
        <div className="col-span-3 sm:col-span-2 hidden sm:block">
          <button
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
            onClick={() => handleSort('type')}
          >
            类型
            {sortField === 'type' && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sortDirection === 'asc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}></path>
              </svg>
            )}
          </button>
        </div>
        <div className="col-span-3 sm:col-span-2 hidden sm:block">
          <button
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
            onClick={() => handleSort('size')}
          >
            大小
            {sortField === 'size' && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sortDirection === 'asc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}></path>
              </svg>
            )}
          </button>
        </div>
        <div className="col-span-4 sm:col-span-2">
          <button
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
            onClick={() => handleSort('modified')}
          >
            修改日期
            {sortField === 'modified' && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sortDirection === 'asc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}></path>
              </svg>
            )}
          </button>
        </div>
        <div className="col-span-2 sm:col-span-1 text-right">操作</div>
      </div>

      {orderedFiles.length > 0 ? (
        <div>
          {orderedFiles.map((file, index) => (
            <FileItem
              key={file.id}
              file={file}
              isLast={index === orderedFiles.length - 1}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">没有文件</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6">上传您的第一个文件或创建一个文件夹开始使用</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"></path>
            </svg>
            上传文件
          </button>
        </div>
      )}
    </div>
  );
};

export default FileList; 
