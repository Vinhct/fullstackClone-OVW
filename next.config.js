/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // Game content
      'media.valorant-api.com',
      'images.blz-contentstack.com',
      'overwatch.blizzard.com',
      'blz-contentstack.com',
      
      // Storage services
      'supabase.io',
      'dyuvxmueqeiwrpeoxubp.supabase.co',
      'storage.googleapis.com',
      'firebasestorage.googleapis.com',
      'amazonaws.com',
      's3.amazonaws.com',
      
      // Common image hosting
      'raw.githubusercontent.com',
      'github.com',
      'lh3.googleusercontent.com',
      'scr.vn',
      'i.imgur.com',
      'imgur.com',
      'cloudinary.com',
      'res.cloudinary.com',
      'images.unsplash.com',
      'unsplash.com',
      'picsum.photos',
      'placekitten.com',
      'placehold.co',
      'placeholdit.imgix.net',
      'via.placeholder.com'
    ],
  },
  trailingSlash: true,
}

module.exports = nextConfig
