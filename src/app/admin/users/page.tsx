'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Shield, UserPlus, UserCheck, UserX, MoreHorizontal, Edit, Trash2, Mail } from 'lucide-react';

interface User {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
  role: 'admin' | 'user';
  created_at: string;
  last_sign_in?: string;
  status: 'active' | 'inactive' | 'banned';
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      // Trong môi trường thực tế, bạn sẽ thay thế dữ liệu mẫu này bằng dữ liệu từ Supabase
      // const { data, error } = await supabase.from('users').select('*');
      // if (error) throw error;
      // setUsers(data || []);
      
      // Dữ liệu mẫu cho demo
      setUsers([
        {
          id: '1',
          email: 'admin@example.com',
          username: 'admin',
          avatar_url: '/images/avatars/admin.jpg',
          role: 'admin',
          created_at: '2025-01-10T08:30:00Z',
          last_sign_in: '2025-03-25T14:15:00Z',
          status: 'active'
        },
        {
          id: '2',
          email: 'moderator@example.com',
          username: 'moderator',
          avatar_url: '/images/avatars/moderator.jpg',
          role: 'admin',
          created_at: '2025-01-15T10:45:00Z',
          last_sign_in: '2025-03-24T11:30:00Z',
          status: 'active'
        },
        {
          id: '3',
          email: 'user1@example.com',
          username: 'gamer123',
          avatar_url: '/images/avatars/user1.jpg',
          role: 'user',
          created_at: '2025-02-05T15:20:00Z',
          last_sign_in: '2025-03-20T09:45:00Z',
          status: 'active'
        },
        {
          id: '4',
          email: 'user2@example.com',
          username: 'overwatchfan',
          avatar_url: '/images/avatars/user2.jpg',
          role: 'user',
          created_at: '2025-02-10T12:15:00Z',
          last_sign_in: '2025-03-18T16:30:00Z',
          status: 'inactive'
        },
        {
          id: '5',
          email: 'banned@example.com',
          username: 'toxic_player',
          avatar_url: '/images/avatars/banned.jpg',
          role: 'user',
          created_at: '2025-02-15T09:30:00Z',
          last_sign_in: '2025-03-01T10:15:00Z',
          status: 'banned'
        }
      ]);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu người dùng:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Chưa đăng nhập';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Hoạt động</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Không hoạt động</span>;
      case 'banned':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Đã khóa</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const toggleUserMenu = (userId: string) => {
    if (selectedUser === userId) {
      setSelectedUser(null);
    } else {
      setSelectedUser(userId);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => {
            // Xử lý thêm người dùng mới
            console.log('Thêm người dùng mới');
          }}
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Thêm người dùng
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm theo email hoặc tên người dùng..."
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <select
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">Tất cả vai trò</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <select
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="banned">Đã khóa</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người dùng
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vai trò
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đăng nhập gần nhất
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                          {user.avatar_url ? (
                            <img 
                              src={user.avatar_url} 
                              alt={user.username || user.email} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              {(user.username || user.email).charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.username || 'Không có tên người dùng'}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.role === 'admin' ? (
                          <>
                            <Shield className="w-4 h-4 text-blue-600 mr-1" />
                            <span className="text-sm font-medium">Admin</span>
                          </>
                        ) : (
                          <span className="text-sm">User</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.last_sign_in)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative">
                        <button 
                          onClick={() => toggleUserMenu(user.id)}
                          className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                        {selectedUser === user.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                            <div className="py-1">
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                onClick={() => {
                                  // Xử lý chỉnh sửa người dùng
                                  console.log('Chỉnh sửa người dùng:', user.id);
                                  setSelectedUser(null);
                                }}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                              </button>
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                onClick={() => {
                                  // Xử lý gửi email
                                  console.log('Gửi email cho người dùng:', user.id);
                                  setSelectedUser(null);
                                }}
                              >
                                <Mail className="w-4 h-4 mr-2" />
                                Gửi email
                              </button>
                              {user.status === 'active' ? (
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50 flex items-center"
                                  onClick={() => {
                                    // Xử lý vô hiệu hóa người dùng
                                    console.log('Vô hiệu hóa người dùng:', user.id);
                                    setSelectedUser(null);
                                  }}
                                >
                                  <UserX className="w-4 h-4 mr-2" />
                                  Vô hiệu hóa
                                </button>
                              ) : user.status === 'inactive' || user.status === 'banned' ? (
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                                  onClick={() => {
                                    // Xử lý kích hoạt người dùng
                                    console.log('Kích hoạt người dùng:', user.id);
                                    setSelectedUser(null);
                                  }}
                                >
                                  <UserCheck className="w-4 h-4 mr-2" />
                                  Kích hoạt
                                </button>
                              ) : null}
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                                onClick={() => {
                                  if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
                                    // Xử lý xóa người dùng
                                    console.log('Xóa người dùng:', user.id);
                                  }
                                  setSelectedUser(null);
                                }}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Xóa
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
