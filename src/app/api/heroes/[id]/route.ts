import { NextResponse } from 'next/server';
import { charactersApi } from '@/data/characters';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('API Route - Fetching character with ID:', params.id);
    
    if (!params.id) {
      console.error('API Route - No ID provided');
      return NextResponse.json(
        { error: 'No character ID provided' },
        { status: 400 }
      );
    }
    
    // Chuyển đổi ID thành chữ thường để đảm bảo tìm kiếm không phân biệt chữ hoa chữ thường
    const lowercaseId = params.id.toLowerCase();
    console.log('API Route - Searching with lowercase ID:', lowercaseId);
    
    // Tìm nhân vật bằng ID đã chuyển đổi
    const character = charactersApi.getCharacterByIdIgnoreCase(lowercaseId);
    console.log('API Route - Character found:', character ? 'Yes' : 'No');
    
    if (!character) {
      return NextResponse.json(
        { error: `Character with ID ${params.id} not found` },
        { status: 404 }
      );
    }
    
    return NextResponse.json(character);
  } catch (error) {
    console.error('API Route - Error fetching character:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
