import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { login } from '../../store/authStore';

export default function AdminLogin() {
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [loading,setLoading]=useState(false); const navigate=useNavigate();
  const submit=async(e:React.FormEvent)=>{e.preventDefault();setError('');setLoading(true);try{await login(email,password);navigate('/admin');}catch(err){setError(err instanceof Error?err.message:'Invalid email or password.');}finally{setLoading(false);}};
  return <div className="min-h-screen bg-[var(--primary)] flex items-center justify-center px-4"><div className="w-full max-w-sm">
    <div className="text-center mb-10"><div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4"><span className="text-white font-display font-bold text-2xl">ق</span></div><h1 className="font-display text-2xl font-bold text-white">Quran Institute</h1><p className="text-white/60 text-sm mt-1">Admin Portal</p></div>
    <div className="bg-white p-8"><h2 className="font-display text-xl font-semibold text-[var(--foreground)] mb-6">Sign In</h2>{error&&<div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
      <form onSubmit={submit} className="space-y-5"><div><label className="block text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">Email</label><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-2.5 border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] text-sm" placeholder="admin@quraninstitute.org" /></div><div><label className="block text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">Password</label><input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-4 py-2.5 border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] text-sm" placeholder="Your password" /></div><button disabled={loading} className="w-full py-3 bg-[var(--primary)] text-white font-semibold text-sm disabled:opacity-60">{loading?'Signing in...':'Sign In'}</button></form>
    </div><div className="mt-6 text-center"><Link to="/" className="text-white/50 text-sm hover:text-white">← Return to website</Link></div>
  </div></div>;
}
