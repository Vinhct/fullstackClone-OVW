import React, { useState, useEffect } from 'react';
import { listFiles, getPublicUrl, STORAGE_BUCKETS } from '@/lib/supabase-storage';
import ImagePreview from './ImagePreview';
import FileUploader from './FileUploader';

interface StorageItem {
  id: string;
  name: string;
  [key: string]: any;
}

interface MediaGalleryProps {
  bucket: string;
  folder?: string;
  onSelect?: (url: string, path: string) => void;
  showUploader?: boolean;
  maxItems?: number;
  className?: string;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  bucket,
  folder = '',
  onSelect,
  showUploader = true,
  maxItems = 50,
  className = '',
}) => {
  const [files, setFiles] = useState<Array<{ name: string; url: string; path: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await listFiles(bucket, folder);
      
      if (error) {
        setError(error.message);
        return;
      }

      if (!data) {
        setFiles([]);
        return;
      }

      // Filter out folders and only get files
      const fileObjects = data
        .filter((item: StorageItem) => !item.id.endsWith('/'))
        .slice(0, maxItems)
        .map((item: StorageItem) => {
          const path = folder ? `${folder}/${item.name}` : item.name;
          return {
            name: item.name,
            path,
            url: getPublicUrl(bucket, path),
          };
        });

      setFiles(fileObjects);
    } catch (err) {
      setError('Đã xảy ra lỗi khi tải danh sách tệp');
      console.error('List files error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [bucket, folder]);

  const handleUploadComplete = (url: string, path: string) => {
    // Add the new file to the list
    setFiles(prev => [{ name: path.split('/').pop() || '', url, path }, ...prev]);
    
    // If onSelect is provided, call it with the new file
    if (onSelect) {
      onSelect(url, path);
    }
  };

  const handleDelete = (path: string) => {
    setFiles(prev => prev.filter(file => file.path !== path));
    loadFiles(); // Reload the list after deletion
  };

  const isImage = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '');
  };

  const isVideo = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    return ['mp4', 'webm', 'ogg'].includes(ext || '');
  };

  return (
    <div className={`w-full ${className}`}>
      {showUploader && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Tải lên tệp mới</h3>
          <FileUploader
            bucket={bucket}
            folder={folder}
            onUploadComplete={handleUploadComplete}
          />
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Thư viện media</h3>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : files.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            Không có tệp nào trong thư viện
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {files.map((file) => (
              <div
                key={file.path}
                className="relative cursor-pointer"
                onClick={() => onSelect && onSelect(file.url, file.path)}
              >
                {isImage(file.name) ? (
                  <ImagePreview
                    url={file.url}
                    path={file.path}
                    bucket={bucket}
                    onDelete={() => handleDelete(file.path)}
                    width={200}
                    height={200}
                    className="w-full h-40"
                  />
                ) : isVideo(file.name) ? (
                  <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                    <video
                      src={file.url}
                      className="w-full h-full object-cover"
                      controls={false}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-50 rounded-full p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
                    <div className="text-center p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mx-auto text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-gray-500 truncate">
                        {file.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
