import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Get the URL and parse out the image path
    const url = request.url;
    const urlObj = new URL(url);
    const imagePath = urlObj.pathname.replace('/api/image', '');
    
    // Define paths to check - first in /image then in /images
    const publicDirRoot = path.join(process.cwd(), 'public');
    const imageDir = path.join(publicDirRoot, 'image', imagePath);
    const imagesDir = path.join(publicDirRoot, 'images', imagePath);
    
    // Check if file exists in image directory
    if (fs.existsSync(imageDir)) {
      // If it exists in /image, redirect there
      return NextResponse.redirect(new URL(`/image${imagePath}`, request.url));
    } else if (fs.existsSync(imagesDir)) {
      // If it exists in /images, redirect there
      return NextResponse.redirect(new URL(`/images${imagePath}`, request.url));
    } else {
      // If neither exists, return 404
      return new NextResponse('Image not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error handling image request:', error);
    return new NextResponse('Error processing image request', { status: 500 });
  }
} 