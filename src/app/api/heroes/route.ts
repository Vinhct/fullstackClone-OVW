import { NextResponse } from 'next/server';
import { charactersApi } from '@/data/characters';

export async function GET() {
  try {
    console.log('API Route - Fetching all characters');
    
    const characters = charactersApi.getAllCharacters();
    console.log('API Route - Characters found:', characters.length);
    
    return NextResponse.json(characters);
  } catch (error) {
    console.error('API Route - Error fetching characters:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
