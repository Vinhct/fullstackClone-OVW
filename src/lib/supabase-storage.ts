import { supabase } from '@/lib/supabase';

export const STORAGE_BUCKETS = {
  HEROES: 'heroes-media',
  NEWS: 'news-images',
  MEDIA: 'media-gallery',
  GAME: 'game-assets',
};

/**
 * Upload a file to a specific Supabase Storage bucket
 * @param bucket The bucket name
 * @param filePath The path where the file will be stored
 * @param file The file to upload
 * @returns Object containing the data and error if any
 */
export const uploadFile = async (
  bucket: string,
  filePath: string,
  file: File
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  return { data, error };
};

/**
 * Get a public URL for a file in Supabase Storage
 * @param bucket The bucket name
 * @param filePath The path of the file
 * @returns The public URL of the file
 */
export const getPublicUrl = (bucket: string, filePath: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
};

/**
 * Delete a file from Supabase Storage
 * @param bucket The bucket name
 * @param filePath The path of the file to delete
 * @returns Object containing the data and error if any
 */
export const deleteFile = async (bucket: string, filePath: string) => {
  const { data, error } = await supabase.storage.from(bucket).remove([filePath]);
  return { data, error };
};

/**
 * List all files in a specific bucket or folder
 * @param bucket The bucket name
 * @param folderPath Optional folder path within the bucket
 * @returns Object containing the files list and error if any
 */
export const listFiles = async (bucket: string, folderPath?: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folderPath || '');

  return { data, error };
};
