'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { BarChart3, LineChart, PieChart, Calendar, Users, Clock, ArrowUp, ArrowDown, TrendingUp, Eye, MousePointer, RefreshCw } from 'lucide-react';

interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  averageSessionTime: string;
  bounceRate: string;
  topPages: { page: string; views: number }[];
  visitorsByDevice: { device: string; count: number }[];
  visitorsByCountry: { country: string; count: number }[];
  dailyVisits: { date: string; visits: number }[];
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  async function fetchAnalyticsData() {
    setLoading(true);
    try {
      // Trong môi trường thực tế, bạn sẽ thay thế dữ liệu mẫu này bằng dữ liệu từ API Analytics
      // Ví dụ: const { data, error } = await supabase.rpc('get_analytics_data', { time_range: timeRange });
      
      // Dữ liệu mẫu cho demo
      setTimeout(() => {
        const mockData: AnalyticsData = {
          totalVisits: timeRange === '7d' ? 12450 : timeRange === '30d' ? 45680 : 124500,
          uniqueVisitors: timeRange === '7d' ? 5230 : timeRange === '30d' ? 18450 : 52300,
          averageSessionTime: timeRange === '7d' ? '3m 45s' : timeRange === '30d' ? '4m 12s' : '3m 58s',
          bounceRate: timeRange === '7d' ? '42.5%' : timeRange === '30d' ? '38.7%' : '40.2%',
          topPages: [
            { page: 'Trang chủ', views: timeRange === '7d' ? 8750 : timeRange === '30d' ? 32400 : 87500 },
            { page: 'Heroes', views: timeRange === '7d' ? 6320 : timeRange === '30d' ? 24150 : 63200 },
            { page: 'News', views: timeRange === '7d' ? 4580 : timeRange === '30d' ? 18700 : 45800 },
            { page: 'Game Info', views: timeRange === '7d' ? 3950 : timeRange === '30d' ? 15200 : 39500 },
            { page: 'Support', views: timeRange === '7d' ? 2100 : timeRange === '30d' ? 8300 : 21000 }
          ],
          visitorsByDevice: [
            { device: 'Desktop', count: timeRange === '7d' ? 3650 : timeRange === '30d' ? 12900 : 36500 },
            { device: 'Mobile', count: timeRange === '7d' ? 1150 : timeRange === '30d' ? 4200 : 11500 },
            { device: 'Tablet', count: timeRange === '7d' ? 430 : timeRange === '30d' ? 1350 : 4300 }
          ],
          visitorsByCountry: [
            { country: 'Việt Nam', count: timeRange === '7d' ? 2350 : timeRange === '30d' ? 8700 : 23500 },
            { country: 'United States', count: timeRange === '7d' ? 950 : timeRange === '30d' ? 3500 : 9500 },
            { country: 'Japan', count: timeRange === '7d' ? 580 : timeRange === '30d' ? 2100 : 5800 },
            { country: 'South Korea', count: timeRange === '7d' ? 450 : timeRange === '30d' ? 1650 : 4500 },
            { country: 'Other', count: timeRange === '7d' ? 900 : timeRange === '30d' ? 2500 : 9000 }
          ],
          dailyVisits: generateDailyVisitsData(timeRange)
        };
        
        setAnalyticsData(mockData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu analytics:', error);
      setLoading(false);
    }
  }

  function generateDailyVisitsData(range: '7d' | '30d' | '90d') {
    const data = [];
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Tạo số ngẫu nhiên cho lượt truy cập hàng ngày
      // Nhưng với một mẫu có xu hướng tăng nhẹ
      const baseVisits = 300 + Math.floor(i * 5);
      const randomFactor = Math.random() * 100 - 50; // -50 to +50
      const visits = Math.max(50, Math.floor(baseVisits + randomFactor));
      
      data.push({
        date: date.toISOString().split('T')[0],
        visits
      });
    }
    
    return data;
  }

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return '100%';
    const change = ((current - previous) / previous) * 100;
    return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  };

  // Tính toán sự thay đổi so với khoảng thời gian trước đó
  const getPreviousPeriodData = () => {
    const currentTotal = analyticsData?.totalVisits || 0;
    const currentUnique = analyticsData?.uniqueVisitors || 0;
    
    // Giả lập dữ liệu kỳ trước với sự thay đổi ngẫu nhiên
    const previousTotal = Math.floor(currentTotal * (0.8 + Math.random() * 0.3));
    const previousUnique = Math.floor(currentUnique * (0.8 + Math.random() * 0.3));
    
    return {
      totalChange: getPercentageChange(currentTotal, previousTotal),
      uniqueChange: getPercentageChange(currentUnique, previousUnique),
      isTotalUp: currentTotal > previousTotal,
      isUniqueUp: currentUnique > previousUnique
    };
  };

  const previousData = analyticsData ? getPreviousPeriodData() : null;

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">7 ngày qua</option>
            <option value="30d">30 ngày qua</option>
            <option value="90d">90 ngày qua</option>
          </select>
          <button 
            onClick={() => fetchAnalyticsData()}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md"
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : analyticsData ? (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Tổng lượt truy cập</p>
                  <h3 className="text-2xl font-bold">{analyticsData.totalVisits.toLocaleString()}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              {previousData && (
                <div className={`mt-4 flex items-center text-sm ${previousData.isTotalUp ? 'text-green-600' : 'text-red-600'}`}>
                  {previousData.isTotalUp ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                  <span>{previousData.totalChange} so với kỳ trước</span>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Người dùng duy nhất</p>
                  <h3 className="text-2xl font-bold">{analyticsData.uniqueVisitors.toLocaleString()}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
              {previousData && (
                <div className={`mt-4 flex items-center text-sm ${previousData.isUniqueUp ? 'text-green-600' : 'text-red-600'}`}>
                  {previousData.isUniqueUp ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                  <span>{previousData.uniqueChange} so với kỳ trước</span>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Thời gian trung bình</p>
                  <h3 className="text-2xl font-bold">{analyticsData.averageSessionTime}</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <span>Thời gian người dùng ở lại trang</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Tỷ lệ thoát</p>
                  <h3 className="text-2xl font-bold">{analyticsData.bounceRate}</h3>
                </div>
                <div className="bg-amber-100 p-3 rounded-full">
                  <MousePointer className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <span>Người dùng rời đi sau 1 trang</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Visits Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Lượt truy cập theo ngày</h3>
              <div className="h-80 relative">
                {/* Giả lập biểu đồ đường */}
                <div className="absolute inset-0 flex items-end">
                  {analyticsData.dailyVisits.map((day, index) => {
                    const maxVisits = Math.max(...analyticsData.dailyVisits.map(d => d.visits));
                    const height = (day.visits / maxVisits) * 100;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full max-w-[20px] bg-blue-500 rounded-t-sm mx-auto"
                          style={{ height: `${height}%` }}
                        ></div>
                        {index % Math.ceil(analyticsData.dailyVisits.length / 10) === 0 && (
                          <div className="mt-2 text-xs text-gray-500 rotate-45 origin-top-left">
                            {new Date(day.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="absolute top-0 right-0">
                  <div className="flex items-center text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                    <span>Xu hướng tăng nhẹ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Trang được xem nhiều nhất</h3>
              <div className="space-y-4">
                {analyticsData.topPages.map((page, index) => {
                  const maxViews = analyticsData.topPages[0].views;
                  const width = (page.views / maxViews) * 100;
                  return (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{page.page}</span>
                        <span className="text-sm text-gray-500">{page.views.toLocaleString()} lượt xem</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${width}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visitors by Device */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Người dùng theo thiết bị</h3>
              <div className="flex h-64">
                <div className="w-1/2 flex items-center justify-center">
                  {/* Giả lập biểu đồ tròn */}
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Desktop */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="0" />
                      {/* Mobile */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="157" />
                      {/* Tablet */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="220" />
                    </svg>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="space-y-4">
                    {analyticsData.visitorsByDevice.map((item, index) => {
                      const colors = ['bg-blue-500', 'bg-green-500', 'bg-amber-500'];
                      return (
                        <div key={index} className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${colors[index]} mr-2`}></div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">{item.device}</span>
                              <span className="text-sm text-gray-500">{item.count.toLocaleString()}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {Math.round((item.count / analyticsData.uniqueVisitors) * 100)}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Visitors by Country */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Người dùng theo quốc gia</h3>
              <div className="space-y-4">
                {analyticsData.visitorsByCountry.map((country, index) => {
                  const maxCount = analyticsData.visitorsByCountry[0].count;
                  const width = (country.count / maxCount) * 100;
                  return (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{country.country}</span>
                        <span className="text-sm text-gray-500">{country.count.toLocaleString()} người dùng</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${width}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">Không có dữ liệu analytics khả dụng.</p>
        </div>
      )}
    </div>
  );
}
