import { api } from './api';

export interface AuthState { isAuthenticated: boolean; id?: string; email: string; name: string; role: 'super_admin' | 'admin' | null; }
export const emptyAuth: AuthState = { isAuthenticated:false,email:'',name:'',role:null };

export async function getAuth(): Promise<AuthState> {
  try { const { user } = await api<{user?: {id:string;email:string;name:string;role:'super_admin'|'admin'} }>('/api/auth/me'); return user ? {isAuthenticated:true,...user} : emptyAuth; }
  catch { return emptyAuth; }
}
export async function login(email: string, password: string): Promise<AuthState> {
  const {user}=await api<{user:{id:string;email:string;name:string;role:'super_admin'|'admin'}}>('/api/auth/login',{method:'POST',body:JSON.stringify({email,password})});
  return {isAuthenticated:true,...user};
}
export async function clearAuth() { await api('/api/auth/logout',{method:'POST'}).catch(()=>{}); }
