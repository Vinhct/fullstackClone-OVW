import { supabaseUrl, supabaseAnonKey } from './supabase';

/**
 * Hàm kiểm tra xem bảng heroes có tồn tại hay không thông qua API trực tiếp
 */
export async function checkHeroesTableExists() {
  try {
    console.log('Kiểm tra sự tồn tại của bảng heroes...');
    
    // Gọi API để lấy thông tin schema
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`API trả về mã lỗi: ${response.status}`);
    }
    
    console.log('Schema API trả về thành công');
    
    // Thử truy cập bảng heroes
    const heroesResponse = await fetch(`${supabaseUrl}/rest/v1/heroes?limit=1`, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    
    // Nếu status là 404, có thể bảng không tồn tại
    if (heroesResponse.status === 404) {
      console.log('Bảng heroes không tồn tại');
      return false;
    }
    
    // Có thể truy cập bảng, thử đọc dữ liệu
    const data = await heroesResponse.json();
    console.log('Dữ liệu từ bảng heroes:', data);
    
    return true;
  } catch (error) {
    console.error('Lỗi khi kiểm tra bảng heroes:', error);
    return false;
  }
}

/**
 * Chèn dữ liệu mẫu vào bảng heroes nếu bảng tồn tại nhưng trống
 */
export async function insertSampleData() {
  try {
    // Kiểm tra bảng trước
    const tableExists = await checkHeroesTableExists();
    if (!tableExists) {
      console.error('Không thể thêm dữ liệu mẫu vì bảng heroes không tồn tại');
      return {
        success: false,
        error: 'Bảng heroes không tồn tại'
      };
    }
    
    // Kiểm tra xem bảng đã có dữ liệu chưa
    const countResponse = await fetch(`${supabaseUrl}/rest/v1/heroes?select=count`, {
      method: 'HEAD',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Prefer': 'count=exact'
      }
    });
    
    const count = parseInt(countResponse.headers.get('content-range')?.split('/')[1] || '0', 10);
    
    if (count > 0) {
      console.log(`Bảng heroes đã có ${count} bản ghi, không cần thêm dữ liệu mẫu`);
      return {
        success: true,
        message: 'Dữ liệu đã tồn tại'
      };
    }
    
    // Thêm dữ liệu mẫu
    const sampleHeroes = [
      {
        id: 'jett',
        name: 'Jett',
        role: 'Duelist',
        difficulty: 2,
        bio: 'Representing her home country of South Korea, Jett\'s agile and evasive fighting style lets her take risks no one else can.',
        portrait_url: '/images/agents/jett/jett-bust.png',
        banner_url: '/images/valorant-hero-bg.jpg'
      },
      {
        id: 'sage',
        name: 'Sage',
        role: 'Sentinel',
        difficulty: 1,
        bio: 'The stronghold of China, Sage creates safety for herself and her team wherever she goes.',
        portrait_url: '/images/agents/sage/sage-bust.png',
        banner_url: '/images/valorant-hero-bg.jpg'
      },
      {
        id: 'phoenix',
        name: 'Phoenix',
        role: 'Duelist',
        difficulty: 1,
        bio: 'Hailing from the U.K., Phoenix\'s star power shines through in his fighting style, igniting the battlefield with flash and flare.',
        portrait_url: '/images/valorant-hero-bg.jpg',
        banner_url: '/images/valorant-hero-bg.jpg'
      }
    ];
    
    // Thêm từng hero một để tránh lỗi
    for (const hero of sampleHeroes) {
      const response = await fetch(`${supabaseUrl}/rest/v1/heroes`, {
        method: 'POST',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(hero)
      });
      
      if (!response.ok) {
        console.error(`Lỗi khi thêm hero ${hero.id}:`, response.status, response.statusText);
      } else {
        console.log(`Đã thêm hero ${hero.id}`);
      }
    }
    
    return {
      success: true,
      message: 'Đã thêm dữ liệu mẫu'
    };
  } catch (error) {
    console.error('Lỗi khi thêm dữ liệu mẫu:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Kiểm tra cấu hình bảo mật (RLS) cho bảng heroes
 */
export async function checkHeroesTableSecurity() {
  try {
    // Thử truy vấn với anonymous key
    const response = await fetch(`${supabaseUrl}/rest/v1/heroes?limit=1`, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      }
    });
    
    // Kiểm tra status
    if (response.status === 401 || response.status === 403) {
      return {
        success: false,
        message: 'Thiếu quyền truy cập. Cần cấu hình Row Level Security (RLS) cho bảng heroes.'
      };
    }
    
    // Thử thêm dữ liệu
    const testInsertResponse = await fetch(`${supabaseUrl}/rest/v1/heroes`, {
      method: 'POST',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: `test-rls-${Date.now()}`,
        name: 'RLS Test Hero',
        role: 'Duelist',
        difficulty: 1
      })
    });
    
    const hasInsertPermission = testInsertResponse.status !== 401 && testInsertResponse.status !== 403;
    
    return {
      success: true,
      canRead: true,
      canWrite: hasInsertPermission,
      message: hasInsertPermission 
        ? 'Có đầy đủ quyền đọc và ghi'
        : 'Có quyền đọc nhưng không có quyền ghi'
    };
  } catch (error) {
    console.error('Lỗi khi kiểm tra bảo mật:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Hàm chính để kiểm tra và khởi tạo dữ liệu Supabase nếu cần
 */
export async function initializeSupabase() {
  // Kiểm tra bảng heroes
  const tableExists = await checkHeroesTableExists();
  
  if (!tableExists) {
    console.log('Bảng heroes không tồn tại. Vui lòng tạo bảng heroes qua SQL Editor trong Supabase.');
    return {
      success: false,
      message: 'Bảng heroes không tồn tại',
      instructions: `
      Vui lòng tạo bảng heroes bằng SQL trong Supabase Dashboard:
      
      CREATE TABLE heroes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        difficulty INTEGER NOT NULL,
        bio TEXT,
        portrait_url TEXT,
        banner_url TEXT,
        video_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- Sau đó, bật RLS và thêm policy cho phép đọc:
      ALTER TABLE heroes ENABLE ROW LEVEL SECURITY;
      
      CREATE POLICY "Allow public read access" 
      ON heroes 
      FOR SELECT 
      USING (true);
      `
    };
  }
  
  // Kiểm tra quyền truy cập
  const securityCheck = await checkHeroesTableSecurity();
  
  if (!securityCheck.success) {
    return {
      success: false,
      message: securityCheck.message
    };
  }
  
  // Thêm dữ liệu mẫu nếu cần
  const dataResult = await insertSampleData();
  
  return {
    success: true,
    tableExists,
    security: securityCheck,
    data: dataResult
  };
} 