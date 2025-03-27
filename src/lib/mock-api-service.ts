import mockHeroes from '@/data/mock-heroes.json';

// Dịch vụ API giả lập (mock) để thay thế Supabase khi gặp vấn đề kết nối
export class MockApiService {
  // Trả về dữ liệu heroes giả lập
  static async getHeroes() {
    // Mô phỏng độ trễ mạng
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: mockHeroes,
      error: null,
      status: 200
    };
  }
  
  // Trả về thông tin chi tiết của một hero
  static async getHeroById(id: string) {
    // Mô phỏng độ trễ mạng
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const hero = mockHeroes.find(h => h.id === id);
    
    if (!hero) {
      return {
        data: null,
        error: { message: "Hero not found", code: "404" },
        status: 404
      };
    }
    
    return {
      data: hero,
      error: null,
      status: 200
    };
  }
  
  // Hàm giả lập để tạo hero mới (chỉ trả về thành công giả)
  static async createHero(heroData: any) {
    // Mô phỏng độ trễ mạng
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      data: { ...heroData, id: `new-${Date.now()}` },
      error: null,
      status: 201
    };
  }
}

// Kiểm tra xem Supabase API có hoạt động không
export async function isSupabaseAvailable(url: string, apiKey: string) {
  try {
    console.log('Kiểm tra kết nối Supabase...');
    const response = await fetch(`${url}/rest/v1/?apikey=${apiKey}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });
    
    console.log('Supabase connection check status:', response.status);
    
    return response.ok;
  } catch (error) {
    console.error('Lỗi khi kiểm tra kết nối Supabase:', error);
    return false;
  }
} 