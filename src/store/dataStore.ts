import { api } from './api';

export interface Post {
  id: string; title: string; slug?: string; excerpt: string; content: string;
  author: string; date: string; category: string; image: string; type: 'news' | 'blog';
}
export interface AdminUser {
  id: string; name: string; email: string; role: 'super_admin' | 'admin'; createdAt: string; lastLogin: string | null;
}
export interface DailyVisit { date: string; visitors: number; pageViews: number; }
export interface Analytics { daily: DailyVisit[]; pages: { page: string; views: number }[]; }

export const getPosts = async (type?: 'news' | 'blog'): Promise<Post[]> => (await api<{ posts: Post[] }>(type ? `/api/posts?type=${type}` : '/api/posts')).posts;
export const getPost = async (id: string): Promise<Post | null> => {
  try { return (await api<{ post: Post }>(`/api/posts/${encodeURIComponent(id)}`)).post; } catch { return null; }
};
export const createPost = (post: Omit<Post, 'id' | 'slug'>) => api<{post: Post}>('/api/admin/posts', { method:'POST', body: JSON.stringify(post) });
export const updatePost = (id: string, post: Omit<Post, 'id' | 'slug'>) => api<{post: Post}>(`/api/admin/posts/${id}`, { method:'PUT', body: JSON.stringify(post) });
export const deletePost = (id: string) => api<{ok:boolean}>(`/api/admin/posts/${id}`, { method:'DELETE' });
export const getAdmins = async (): Promise<AdminUser[]> => (await api<{users: AdminUser[]}>('/api/admin/users')).users;
export const addAdmin = (user: {name:string;email:string;password:string;role:'admin'|'super_admin'}) => api<{user:AdminUser}>('/api/admin/users',{method:'POST',body:JSON.stringify(user)});
export const deleteAdmin = (id:string) => api<{ok:boolean}>(`/api/admin/users/${id}`,{method:'DELETE'});
export const getAnalytics = () => api<Analytics>('/api/admin/analytics');
export const uploadImage = async (file: File): Promise<string> => {
  const response = await fetch('/api/upload', { method:'POST', credentials:'include', headers:{'Content-Type':file.type}, body:file });
  if(!response.ok){ const body=await response.json().catch(()=>({})); throw new Error(body.error || 'Upload failed.'); }
  return (await response.json()).url;
};
