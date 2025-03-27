import React, { useState } from 'react';
import Image from 'next/image';
import { deleteFile } from '@/lib/supabase-storage';

interface ImagePreviewProps {
  url: string;
  path: string;
  bucket: string;
  onDelete?: () => void;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  url,
  path,
  bucket,
  onDelete,
  alt = 'Preview image',
  width = 200,
  height = 200,
  className = '',
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa hình ảnh này không?')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const { error } = await deleteFile(bucket, path);
      
      if (error) {
        setError(error.message);
      } else {
        if (onDelete) onDelete();
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi xóa tệp');
      console.error('Delete error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={url}
          alt={alt}
          width={width}
          height={height}
          className="object-cover"
        />
        
        {onDelete && (
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
              title="Xóa hình ảnh"
            >
              {isDeleting ? (
                <span className="animate-spin">⟳</span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
      
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default ImagePreview;
