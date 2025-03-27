import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Sử dụng URL và key mặc định cho môi trường development
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dyuvxmueqeiwrpeoxubp.supabase.co';
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5dXZ4bXVlcWVpd3JwZW94dWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NzkyOTcsImV4cCI6MjA1ODU1NTI5N30.9eoryQijbOgO6k0GW6mbhyvUQ5rQOOmtmi-eTvFSyto';

// Log thông tin kết nối để debug
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key (first 5 chars):', supabaseAnonKey.substring(0, 5) + '...');

// Tạo client với options để bật Realtime
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
    timeout: 60000,
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
  global: {
    fetch: (...args) => {
      // Thêm timeout dài hơn cho các request để tránh các vấn đề về kết nối
      const controller = new AbortController();
      const { signal } = controller;
      
      // Tạo các tùy chọn fetch với signal
      const [resource, config] = args;
      const fetchOptions = { 
        ...(config || {}), 
        signal,
        retry: 3,
        retryDelay: 1000,
      };
      
      console.log('Supabase fetch request to:', resource);
      
      // Thêm signal vào fetch request
      const fetchPromise = fetch(resource, fetchOptions);
      
      // Tăng timeout lên 120s
      const timeoutId = setTimeout(() => {
        console.error('Supabase request timeout after 120 seconds');
        controller.abort();
      }, 120000);
      
      // Xử lý và dọn dẹp
      return fetchPromise
        .then(response => {
          console.log(`Supabase fetch response status: ${response.status}`);
          return response;
        })
        .catch(error => {
          console.error('Supabase fetch error:', error);
          throw error;
        })
        .finally(() => {
          clearTimeout(timeoutId);
        });
    },
    headers: {
      'x-client-info': 'supabase-js/2.x'
    }
  },
  db: {
    schema: 'public',
  },
});

// Lưu trữ các channel đã tạo để có thể dọn dẹp sau này
const activeChannels: Record<string, any> = {};

// Hàm để tạo mới kết nối Realtime với retry
export async function reconnectRealtime(channelName: string, maxRetries = 3) {
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
      // Hủy channel cũ nếu tồn tại
      if (activeChannels[channelName]) {
        console.log(`Unsubscribing from existing channel: ${channelName}`);
        supabase.removeChannel(activeChannels[channelName]);
        delete activeChannels[channelName];
      }
      
      // Tạo channel mới với tên cụ thể + timestamp để đảm bảo độc nhất
      const newChannelName = `${channelName}-${Date.now()}`;
      console.log(`Creating new channel: ${newChannelName}`);
      
      const channel = supabase.channel(newChannelName);
      
      // Lưu channel mới vào đối tượng theo dõi
      activeChannels[channelName] = channel;
      
      // Đợi kết nối thành công
      await new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Channel connection timeout'));
        }, 10000);
        
        channel
          .on('system', { event: 'connected' }, () => {
            clearTimeout(timeoutId);
            resolve(true);
          })
          .subscribe((status) => {
            if (status === 'CHANNEL_ERROR') {
              clearTimeout(timeoutId);
              reject(new Error('Channel error'));
            }
          });
      });
      
      return channel;
    } catch (error) {
      console.error(`Realtime connection attempt ${retryCount + 1} failed:`, error);
      retryCount++;
      
      if (retryCount < maxRetries) {
        // Đợi một chút trước khi thử lại
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        console.error('Max retries reached for realtime connection');
        return null;
      }
    }
  }
  
  return null;
}

// Hàm để kết nối lại nếu kênh Realtime bị mắc kẹt
export async function resetRealtimeConnection() {
  try {
    console.log('Resetting realtime connection...');
    
    // Duyệt qua tất cả các kênh và hủy đăng ký
    Object.keys(activeChannels).forEach(channelName => {
      const channel = activeChannels[channelName];
      supabase.removeChannel(channel);
      delete activeChannels[channelName];
    });
    
    // Buộc đóng tất cả các kết nối websocket và tạo lại
    // @ts-ignore - Truy cập vào thuộc tính nội bộ để reset
    if (supabase.realtime && typeof supabase.realtime.disconnect === 'function') {
      // @ts-ignore
      await supabase.realtime.disconnect();
    }
    
    // Ngắt kết nối để đảm bảo tạo mới hoàn toàn
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Thử kết nối lại tất cả các channel
    for (const channelName of Object.keys(activeChannels)) {
      await reconnectRealtime(channelName);
    }
    
    console.log('Realtime connection reset complete');
    return true;
  } catch (error) {
    console.error('Failed to reset realtime connection:', error);
    return false;
  }
}

// Hàm để theo dõi trạng thái kết nối Realtime
export function monitorRealtimeConnection() {
  try {
    // Tạo một channel đặc biệt để theo dõi kết nối
    const monitorChannel = supabase.channel('monitor-connection');
    
    // Lắng nghe các sự kiện hệ thống
    monitorChannel
      .on('system', { event: 'disconnected' }, async () => {
        console.log('Realtime disconnected, attempting to reconnect...');
        await resetRealtimeConnection();
      })
      .on('system', { event: 'error' }, async (error) => {
        console.error('Realtime error:', error);
        await resetRealtimeConnection();
      })
      .subscribe((status) => {
        console.log('Monitor channel subscription status:', status);
        if (status === 'CHANNEL_ERROR') {
          console.error('Monitor channel error');
        }
      });
    
    // Lưu channel monitor vào activeChannels
    activeChannels['monitor-connection'] = monitorChannel;
    
    return monitorChannel;
  } catch (error) {
    console.error('Failed to setup realtime monitoring:', error);
    return null;
  }
}

// Gọi hàm monitor khi khởi tạo
const monitorChannel = monitorRealtimeConnection();
if (monitorChannel) {
  console.log('Realtime monitoring setup complete');
}

// Hàm ping đơn giản để kiểm tra kết nối
export async function pingSupabase() {
  try {
    console.log('Pinging Supabase...');
    
    // In thông tin debug đầy đủ
    console.log('Using URL:', supabaseUrl);
    console.log('Using Key (first 10 chars):', supabaseAnonKey.substring(0, 10) + '...');
    
    // Thử kiểm tra kết nối bằng một truy vấn đơn giản
    const { data, error, status } = await supabase
      .from('heroes')
      .select('count', { count: 'exact', head: true })
      .limit(1);
      
    if (error) {
      console.error('Ping failed with error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      
      return {
        success: false,
        error: error.message,
        code: error.code,
        details: error.details
      };
    }
    
    console.log('Ping successful with status:', status);
    console.log('Response data:', data);
    
    return {
      success: true,
      status: status,
      data
    };
  } catch (error) {
    console.error('Error pinging Supabase:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Error stack:', errorStack);
    
    return {
      success: false,
      error: errorMessage,
      stack: errorStack
    };
  }
}

// Kiểm tra kết nối Supabase và đảm bảo Realtime đã được bật
export async function checkSupabaseConnection() {
  try {
    console.log('Checking Supabase connection...');
    
    // Kiểm tra kết nối cơ bản trước bằng hàm ping
    const pingResult = await pingSupabase();
    console.log('Ping result:', pingResult);
    
    if (!pingResult.success) {
      console.error('Không thể ping đến Supabase');
      return false;
    }
    
    // Kiểm tra connection bằng cách gọi một query đơn giản
    console.log('Testing database connection...');
    const { data, error, status } = await supabase.from('heroes').select('count', { count: 'exact', head: true });
    
    console.log('Database response status:', status);
    
    if (error) {
      console.error('Supabase connection error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      return false;
    }
    
    console.log('Supabase connected successfully!');
    console.log('Database response:', data);
    
    // Kiểm tra kết nối Realtime
    console.log('Testing Realtime connection...');
    
    return new Promise((resolve) => {
      // Bật realtime cho channel thủ công để đảm bảo nó hoạt động
      const channel = supabase.channel('realtime-check');
      
      let timeoutId = setTimeout(() => {
        console.error('Realtime connection timeout after 60 seconds');
        resolve(false);
      }, 60000);
      
      channel
        .on('system', { event: 'connected' }, () => {
          console.log('Realtime connected!');
          clearTimeout(timeoutId);
          
          // Đóng kênh sau khi kiểm tra
          setTimeout(() => {
            supabase.removeChannel(channel);
          }, 5000);
          
          resolve(true);
        })
        .subscribe((status) => {
          console.log('Realtime subscription status:', status);
          if (status === 'CHANNEL_ERROR') {
            console.error('Realtime channel error');
            clearTimeout(timeoutId);
            resolve(false);
          }
        });
    });
  } catch (error) {
    console.error('Failed to check Supabase connection:', error);
    return false;
  }
}

// Kiểm tra bảng heroes có tồn tại
export async function checkHeroesTable() {
  try {
    console.log('Checking heroes table...');
    const { count, error } = await supabase
      .from('heroes')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error checking heroes table:', error);
      return false;
    }
    
    console.log(`Heroes table exists with ${count} records`);
    return true;
  } catch (error) {
    console.error('Failed to check heroes table:', error);
    return false;
  }
}

// Tạo hero mẫu cho việc kiểm tra
export async function createSampleHero() {
  try {
    console.log('Creating sample hero in Supabase...');
    
    // Tạo ID ngẫu nhiên để đảm bảo không trùng
    const randomId = `test-hero-${Math.random().toString(36).substring(2, 9)}`;
    
    // Dữ liệu hero mẫu
    const heroData = {
      id: randomId,
      name: `Test Hero ${new Date().toLocaleTimeString()}`,
      role: 'Duelist',
      difficulty: 1,
      bio: 'This is a test hero created to verify the Supabase connection.',
      portrait_url: '/images/valorant-hero-bg.jpg',
      banner_url: '/images/valorant-hero-bg.jpg',
      created_at: new Date().toISOString()
    };
    
    console.log('Attempting to insert with SDK:', heroData);
    
    // Thử thêm hero bằng SDK
    try {
      // Thêm hero vào bảng heroes
    const { data, error } = await supabase
      .from('heroes')
        .insert([heroData])
        .select('*');
      
      if (error) {
        console.error('Error creating sample hero with SDK:', error);
        
        // Thử gọi API trực tiếp nếu SDK thất bại
        console.log('Attempting direct API call...');
        const response = await fetch(`${supabaseUrl}/rest/v1/heroes`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(heroData)
        });
        
        if (!response.ok) {
          throw new Error(`Direct API call failed: ${response.status} ${response.statusText}`);
        }
        
        const apiData = await response.json();
        console.log('Sample hero created via direct API call:', apiData);
        
        return {
          success: true,
          data: apiData,
          method: 'direct-api'
        };
      }
      
      console.log('Sample hero created successfully with SDK:', data);
      return {
        success: true,
        data,
        method: 'sdk'
      };
    } catch (sdkError) {
      console.error('SDK method failed, trying direct API call:', sdkError);
      
      // Thử gọi API trực tiếp
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/heroes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(heroData)
        });
        
        if (!response.ok) {
          throw new Error(`Direct API call failed: ${response.status} ${response.statusText}`);
        }
        
        const apiData = await response.json();
        console.log('Sample hero created via direct API call after SDK failure:', apiData);
        
        return {
          success: true,
          data: apiData,
          method: 'direct-api-fallback'
        };
      } catch (apiError) {
        console.error('Both SDK and direct API failed:', apiError);
        return {
          success: false,
          error: apiError instanceof Error ? apiError.message : 'Unknown error',
          method: 'both-failed'
        };
      }
    }
  } catch (error) {
    console.error('Unexpected error creating sample hero:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      method: 'unexpected-error'
    };
  }
}

// Thêm hàm để lấy dữ liệu heroes trực tiếp
export async function getHeroesDirectly() {
  console.log('Fetching heroes directly...');
  
  try {
    // Sử dụng fetch API trực tiếp để gọi đến Supabase
    const response = await fetch(`${supabaseUrl}/rest/v1/heroes?select=*`, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log('Supabase API Response Status:', response.status);
    console.log('Supabase API Response Headers:', Object.fromEntries([...response.headers.entries()]));
    
    if (!response.ok) {
      let errorText = '';
      try {
        errorText = await response.text();
      } catch (e) {}
      
      return {
        success: false,
        status: response.status,
        error: `API error: ${response.status} ${response.statusText} ${errorText}`
      };
    }
    
    const data = await response.json();
    console.log('Fetched heroes successfully:', Array.isArray(data) ? data.length : 'not an array');
    
    return {
      success: true,
      data: data,
      status: response.status
    };
  } catch (error) {
    console.error('Error fetching heroes:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Hàm truy vấn SQL để tạo bảng news
export async function executeNewsTableSQL() {
  try {
    // SQL để tạo bảng news nếu chưa tồn tại
    const { data, error } = await supabase.rpc('execute_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS news (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title TEXT NOT NULL,
          summary TEXT,
          content TEXT,
          category TEXT,
          image_url TEXT,
          published BOOLEAN DEFAULT false,
          publish_date TIMESTAMPTZ,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        
        -- Thêm policy cho phép đọc công khai
        ALTER TABLE news ENABLE ROW LEVEL SECURITY;
        
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT FROM pg_catalog.pg_policies 
            WHERE tablename = 'news' AND policyname = 'Allow public read'
          ) THEN
            CREATE POLICY "Allow public read" 
              ON news FOR SELECT 
              USING (true);
          END IF;
          
          IF NOT EXISTS (
            SELECT FROM pg_catalog.pg_policies 
            WHERE tablename = 'news' AND policyname = 'Allow authorized insert'
          ) THEN
            CREATE POLICY "Allow authorized insert" 
              ON news FOR INSERT 
              WITH CHECK (true);
          END IF;
          
          IF NOT EXISTS (
            SELECT FROM pg_catalog.pg_policies 
            WHERE tablename = 'news' AND policyname = 'Allow authorized update'
          ) THEN
            CREATE POLICY "Allow authorized update" 
              ON news FOR UPDATE 
              USING (true);
          END IF;
          
          IF NOT EXISTS (
            SELECT FROM pg_catalog.pg_policies 
            WHERE tablename = 'news' AND policyname = 'Allow authorized delete'
          ) THEN
            CREATE POLICY "Allow authorized delete" 
              ON news FOR DELETE 
              USING (true);
          END IF;
        END
        $$;
      `
    });
    
    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Đã tạo bảng news thành công'
    };
  } catch (error) {
    console.error('Lỗi khi thực thi SQL để tạo bảng news:', error);
    return {
      success: false,
      message: `Lỗi khi tạo bảng news: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Cập nhật hàm createNewsTable để sử dụng SQL trực tiếp
export async function createNewsTable() {
  try {
    // Kiểm tra xem bảng đã tồn tại chưa
    const { count, error: checkError } = await supabase
      .from('news')
      .select('*', { count: 'exact', head: true });
    
    if (checkError) {
      // Nếu lỗi là do bảng không tồn tại, tạo bảng
      if (checkError.code === '42P01') { // PostgreSQL error code for undefined_table
        console.log('Bảng news chưa tồn tại. Đang tạo bảng...');
        return executeNewsTableSQL();
      } else {
        throw checkError;
      }
    }
    
    // Bảng đã tồn tại
    return {
      success: true,
      message: 'Bảng news đã tồn tại'
    };
  } catch (error) {
    console.error('Lỗi khi tạo bảng news:', error);
    return {
      success: false,
      message: `Lỗi khi tạo bảng news: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Cập nhật hàm insertSampleNews để gọi createNewsTable trước khi thêm dữ liệu
export async function insertSampleNews() {
  try {
    // Tạo bảng news nếu chưa tồn tại
    const tableResult = await createNewsTable();
    if (!tableResult.success) {
      return tableResult;
    }
    
    // Dữ liệu mẫu
    const sampleNews = [
      {
        title: 'Ra mắt Hero mới: Echo',
        summary: 'Echo, robot tiên tiến với khả năng nhân bản kỹ năng của đối thủ, chính thức gia nhập đội hình Overwatch',
        category: 'Heroes',
        image_url: '/images/news/echo.jpg',
        published: true,
        publish_date: new Date().toISOString(),
        content: '<p>Echo là một robot tiên tiến được trang bị trí tuệ nhân tạo thích ứng. Echo có thể sao chép nhân vật của đối thủ, sao chép các kỹ năng và khả năng đặc biệt của họ.</p><p>Với Chế độ nhân bản, Echo có thể trở thành bản sao của bất kỳ anh hùng đối thủ nào trong một khoảng thời gian, sao chép tất cả các kỹ năng của họ và tạo ra trạng thái cân bằng giữa các nhóm.</p>'
      },
      {
        title: 'Cập nhật bản đồ mới: Havana',
        summary: 'Khám phá bản đồ Havana đầy nắng với kiến trúc Cuba cổ điển và những góc chiến đấu thú vị',
        category: 'Maps',
        image_url: '/images/news/havana.jpg',
        published: true,
        publish_date: new Date().toISOString(),
        content: '<p>Bản đồ Havana là một bản đồ Escort mới, lấy cảm hứng từ kiến trúc cổ điển và văn hóa Cuba. Nhiệm vụ yêu cầu người chơi hộ tống xe tải rum qua các đường phố đầy nắng của Havana.</p><p>Bản đồ có ba phần riêng biệt với các môi trường đa dạng, từ nhà máy rum San Isidro đến quảng trường thành phố sôi động và lâu đài El Castillo lịch sử.</p>'
      },
      {
        title: 'Sự kiện mùa hè sắp diễn ra',
        summary: 'Chuẩn bị cho sự kiện mùa hè với nhiều skin mới và chế độ chơi đặc biệt',
        category: 'Events',
        image_url: '/images/news/summer-event.jpg',
        published: false,
        publish_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 ngày từ bây giờ
        content: '<p>Sự kiện mùa hè sắp tới sẽ giới thiệu những skin mới đầy màu sắc cho các nhân vật yêu thích của bạn! Hãy sẵn sàng cho bãi biển với các trang phục nghỉ mát, phụ kiện mùa hè và các hiệu ứng đặc biệt.</p><p>Chế độ chơi đặc biệt Lucioball trở lại với các bản đồ mới và các phần thưởng giới hạn. Đừng bỏ lỡ cơ hội kiếm những vật phẩm độc quyền chỉ có trong sự kiện này!</p>'
      },
      {
        title: 'Giải đấu Overwatch World Cup 2025',
        summary: 'Các đội tuyển quốc gia tốt nhất thế giới sẵn sàng tranh tài tại World Cup 2025',
        category: 'Esports',
        image_url: '/images/news/world-cup.jpg',
        published: true,
        publish_date: new Date().toISOString(),
        content: '<p>Overwatch World Cup 2025 sẽ quy tụ những đội tuyển quốc gia hàng đầu thế giới trong một giải đấu đỉnh cao. Từ vòng loại khu vực đến vòng chung kết toàn cầu, mỗi đội sẽ đại diện cho đất nước của họ trong cuộc cạnh tranh vinh quang quốc tế.</p><p>Với format mới và giải thưởng lớn hơn, World Cup năm nay hứa hẹn sẽ là sự kiện không thể bỏ lỡ đối với người hâm mộ Overwatch.</p>'
      },
      {
        title: 'Cân bằng Hero: Phiên bản 10.5',
        summary: 'Cập nhật cân bằng mới nhất với những thay đổi cho D.Va, Ana và nhiều hero khác',
        category: 'Game Updates',
        image_url: '/images/news/balance-update.jpg',
        published: true,
        publish_date: new Date().toISOString(),
        content: '<p>Phiên bản cập nhật 10.5 sẽ mang đến những thay đổi quan trọng về cân bằng hero. D.Va nhận được tăng sức mạnh cho Defense Matrix và các kỹ năng tấn công, trong khi Ana thấy một số điều chỉnh cho Biotic Grenade.</p><p>Các hero khác như Soldier: 76, Mercy và Winston cũng nhận được những điều chỉnh nhỏ để đảm bảo cân bằng trong trải nghiệm chơi game.</p>'
      }
    ];
    
    // Thêm từng bản ghi một để tránh lỗi
    for (const news of sampleNews) {
      const { data, error } = await supabase
        .from('news')
        .insert([news] as any); // Sử dụng type assertion để bypass type check
      
      if (error) {
        console.error(`Lỗi khi thêm tin tức "${news.title}":`, error);
      } else {
        console.log(`Đã thêm tin tức "${news.title}"`);
      }
    }
    
    return {
      success: true,
      message: 'Đã thêm dữ liệu mẫu vào bảng news'
    };
  } catch (error) {
    console.error('Lỗi khi thêm dữ liệu mẫu vào bảng news:', error);
    return {
      success: false,
      message: `Lỗi khi thêm dữ liệu mẫu: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}
