'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MediaGallery from '@/components/admin/MediaGallery';
import { STORAGE_BUCKETS } from '@/lib/supabase-storage';

export default function MediaManagementPage() {
  const [selectedTab, setSelectedTab] = useState('heroes');
  const [selectedMedia, setSelectedMedia] = useState<{url: string, path: string} | null>(null);

  const handleMediaSelect = (url: string, path: string) => {
    setSelectedMedia({ url, path });
    // Copy URL to clipboard
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('URL đã được sao chép vào clipboard!');
      })
      .catch(err => {
        console.error('Không thể sao chép URL:', err);
      });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Media</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Tabs defaultValue="heroes" onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="heroes">Heroes Media</TabsTrigger>
            <TabsTrigger value="news">News Images</TabsTrigger>
            <TabsTrigger value="media">Media Gallery</TabsTrigger>
            <TabsTrigger value="game">Game Assets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="heroes">
            <MediaGallery 
              bucket={STORAGE_BUCKETS.HEROES} 
              onSelect={handleMediaSelect}
            />
          </TabsContent>
          
          <TabsContent value="news">
            <MediaGallery 
              bucket={STORAGE_BUCKETS.NEWS} 
              onSelect={handleMediaSelect}
            />
          </TabsContent>
          
          <TabsContent value="media">
            <MediaGallery 
              bucket={STORAGE_BUCKETS.MEDIA} 
              onSelect={handleMediaSelect}
            />
          </TabsContent>
          
          <TabsContent value="game">
            <MediaGallery 
              bucket={STORAGE_BUCKETS.GAME} 
              onSelect={handleMediaSelect}
            />
          </TabsContent>
        </Tabs>

        {selectedMedia && (
          <div className="mt-8 p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-2">Media đã chọn</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                {selectedMedia.path.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                  <img 
                    src={selectedMedia.url} 
                    alt="Selected media" 
                    className="w-full h-auto rounded-lg"
                  />
                ) : selectedMedia.path.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video 
                    src={selectedMedia.url} 
                    controls 
                    className="w-full h-auto rounded-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Không thể hiển thị preview</p>
                  </div>
                )}
              </div>
              <div className="w-full md:w-2/3">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={selectedMedia.url}
                      readOnly
                      className="flex-1 p-2 border rounded-l-md bg-gray-50"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(selectedMedia.url)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                    >
                      Sao chép
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Path
                  </label>
                  <input
                    type="text"
                    value={selectedMedia.path}
                    readOnly
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
