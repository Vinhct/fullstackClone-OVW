import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { uploadFile, getPublicUrl, STORAGE_BUCKETS } from '@/lib/supabase-storage';

interface FileUploaderProps {
  bucket: string;
  folder?: string;
  onUploadComplete: (url: string, path: string) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  bucket,
  folder = '',
  onUploadComplete,
  accept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    'video/*': ['.mp4', '.webm', '.ogg'],
  },
  maxSize = 10 * 1024 * 1024, // 10MB default
  className = '',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setIsUploading(true);
      setError(null);
      setUploadProgress(0);

      try {
        // Create a unique file path
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = folder ? `${folder}/${fileName}` : fileName;

        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            const newProgress = prev + 10;
            return newProgress >= 90 ? 90 : newProgress;
          });
        }, 300);

        // Upload file to Supabase
        const { data, error } = await uploadFile(bucket, filePath, file);

        clearInterval(progressInterval);

        if (error) {
          setError(error.message);
          setUploadProgress(0);
        } else {
          setUploadProgress(100);
          const publicUrl = getPublicUrl(bucket, filePath);
          onUploadComplete(publicUrl, filePath);
        }
      } catch (err) {
        setError('Đã xảy ra lỗi khi tải lên tệp');
        console.error('Upload error:', err);
      } finally {
        setIsUploading(false);
      }
    },
    [bucket, folder, onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  return (
    <div className={`w-full ${className}`}>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="w-full">
            <p className="mb-2">Đang tải lên... {uploadProgress}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-600">
              {isDragActive
                ? 'Thả tệp vào đây...'
                : 'Kéo và thả tệp vào đây, hoặc nhấp để chọn tệp'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              (Kích thước tối đa: {Math.round(maxSize / (1024 * 1024))}MB)
            </p>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default FileUploader;
