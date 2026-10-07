import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,BarChart,Bar } from 'recharts';
import { getAuth, clearAuth, AuthState } from '../../store/authStore';
import { addAdmin, createPost, deleteAdmin, deletePost, getAdmins, getAnalytics, getPosts, Post, AdminUser, updatePost, uploadImage } from '../../store/dataStore';

type Tab='overview'|'news'|'blogs'|'users';
type Form=Omit<Post,'id'|'slug'>;
const blank:Form={title:'',excerpt:'',content:'',author:'',date:new Date().toISOString().slice(0,10),category:'',image:'',type:'news'};

export default function AdminDashboard(){

const [uploadingImage, setUploadingImage] = useState(false);

const handleUpload = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  if (!allowedTypes.includes(file.type)) {
    notify('Only JPG, PNG, WebP and GIF images are allowed.');
    event.target.value = '';
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    notify('Image must be smaller than 5 MB.');
    event.target.value = '';
    return;
  }

  try {
    setUploadingImage(true);

    const imageUrl = await uploadImage(file);

    setForm((current) => ({
      ...current,
      image: imageUrl,
    }));

    notify('Image uploaded successfully.');
  } catch (error) {
    notify(
      error instanceof Error
        ? error.message
        : 'Image upload failed.'
    );
  } finally {
    setUploadingImage(false);
    event.target.value = '';
  }
};

 const navigate=useNavigate(); const [auth,setAuth]=useState<AuthState|null>(null); const [tab,setTab]=useState<Tab>('overview'); const [posts,setPosts]=useState<Post[]>([]); const [admins,setAdmins]=useState<AdminUser[]>([]); const [analytics,setAnalytics]=useState<{daily:any[];pages:any[]}>({daily:[],pages:[]}); const [form,setForm]=useState<Form>(blank); const [editing,setEditing]=useState<Post|null>(null); const [modal,setModal]=useState(false); const [userModal,setUserModal]=useState(false); const [userForm,setUserForm]=useState({name:'',email:'',password:'',role:'admin' as 'admin'|'super_admin'}); const [notice,setNotice]=useState(''); const [busy,setBusy]=useState(false);
 const refresh=async()=>{const [p,a,u]=await Promise.all([getPosts(),getAnalytics(),getAdmins()]);setPosts(p);setAnalytics(a);setAdmins(u);};
 useEffect(()=>{getAuth().then(a=>{if(!a.isAuthenticated){navigate('/admin/login');return;}setAuth(a);refresh().catch(e=>setNotice(e.message));});},[]);
 const notify=(m:string)=>{setNotice(m);setTimeout(()=>setNotice(''),3000)};
 if(!auth)return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
 const news=posts.filter(p=>p.type==='news'), blogs=posts.filter(p=>p.type==='blog');
 const save=async()=>{if(!form.title||!form.excerpt||!form.content)return notify('Title, excerpt and content are required.');setBusy(true);try{if(editing)await updatePost(editing.id,form);else await createPost(form);await refresh();setModal(false);notify(editing?'Post updated.':'Post published.');}catch(e){notify(e instanceof Error?e.message:'Save failed.')}finally{setBusy(false)}};
 const remove=async(id:string)=>{if(!confirm('Delete this post?'))return;try{await deletePost(id);await refresh();notify('Post deleted.')}catch(e){notify(e instanceof Error?e.message:'Delete failed.')}};
 const add=async()=>{if(!userForm.name||!userForm.email||!userForm.password)return notify('All user fields are required.');try{await addAdmin(userForm);await refresh();setUserModal(false);setUserForm({name:'',email:'',password:'',role:'admin'});notify('Admin user added.')}catch(e){notify(e instanceof Error?e.message:'Could not add user.')}};
 const removeUser=async(id:string)=>{if(!confirm('Remove this administrator?'))return;try{await deleteAdmin(id);await refresh();notify('User removed.')}catch(e){notify(e instanceof Error?e.message:'Could not remove user.')}};
 const open=(type:'news'|'blog',post?:Post)=>{setEditing(post||null);setForm(post?{title:post.title,excerpt:post.excerpt,content:post.content,author:post.author,date:post.date,category:post.category,image:post.image,type:post.type}:{...blank,type});setModal(true)};
 return <div className="min-h-screen bg-[var(--secondary)]"><header className="bg-[var(--primary)] text-white px-6 py-3 flex justify-between items-center"><div><span className="font-display font-semibold">Quran Institute</span><span className="text-white/50 text-xs ml-2">Admin Dashboard</span></div><div className="flex gap-4 items-center"><Link to="/" target="_blank" className="text-white/60 text-sm">View site ↗</Link><span className="text-white/60 text-xs">{auth.name} · {auth.role?.replace('_',' ')}</span><button onClick={async()=>{await clearAuth();navigate('/admin/login')}} className="text-white/60 text-sm">Sign out</button></div></header>
 {notice&&<div className="fixed top-16 right-4 z-50 px-5 py-3 bg-[var(--primary)] text-white text-sm shadow-lg">{notice}</div>}
 <div className="max-w-7xl mx-auto px-6 py-8"><div className="flex gap-1 mb-8 border-b border-[var(--border)]">{(['overview','news','blogs','users'] as Tab[]).map(t=><button key={t} onClick={()=>setTab(t)} className={`px-5 py-3 text-sm capitalize border-b-2 -mb-px ${tab===t?'border-[var(--primary)] text-[var(--primary)]':'border-transparent text-[var(--muted-foreground)]'}`}>{t}{t==='news'?` (${news.length})`:t==='blogs'?` (${blogs.length})`:t==='users'?` (${admins.length})`:''}</button>)}</div>
 {tab==='overview'&&<div className="space-y-8"><div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[['Visitors (30d)',analytics.daily.reduce((s,d)=>s+d.visitors,0)],['Page Views (30d)',analytics.daily.reduce((s,d)=>s+d.pageViews,0)],['News',news.length],['Blogs',blogs.length]].map(([l,v])=><div key={String(l)} className="bg-[var(--card)] border border-[var(--border)] p-5"><div className="text-xs font-mono text-[var(--muted-foreground)] uppercase mb-2">{l}</div><div className="font-display text-3xl font-bold text-[var(--primary)]">{Number(v).toLocaleString()}</div></div>)}</div><div className="bg-[var(--card)] border border-[var(--border)] p-6"><h2 className="font-display font-semibold mb-5">Visitors — Last 30 Days</h2><ResponsiveContainer width="100%" height={260}><LineChart data={analytics.daily}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/><XAxis dataKey="date" tickFormatter={v=>String(v).slice(5)}/><YAxis/><Tooltip/><Line type="monotone" dataKey="visitors" stroke="var(--primary)" strokeWidth={2} dot={false}/><Line type="monotone" dataKey="pageViews" stroke="var(--accent)" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer></div><div className="bg-[var(--card)] border border-[var(--border)] p-6"><h2 className="font-display font-semibold mb-5">Page Views Breakdown</h2><ResponsiveContainer width="100%" height={220}><BarChart data={analytics.pages}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/><XAxis dataKey="page"/><YAxis/><Tooltip/><Bar dataKey="views" fill="var(--primary)"/></BarChart></ResponsiveContainer></div></div>}
 {(tab==='news'||tab==='blogs')&&<section><div className="flex justify-between mb-6"><h2 className="font-display text-2xl font-bold">{tab==='news'?'News Articles':'Blog Articles'}</h2><button onClick={()=>open(tab==='news'?'news':'blog')} className="px-4 py-2 bg-[var(--primary)] text-white text-sm">+ New {tab==='news'?'Article':'Post'}</button></div><div className="space-y-3">{(tab==='news'?news:blogs).map(p=><div key={p.id} className="bg-[var(--card)] border border-[var(--border)] p-4 flex gap-4 items-center"><img src={p.image} className="w-16 h-16 object-cover hidden sm:block"/><div className="flex-1 min-w-0"><h3 className="font-display font-semibold truncate">{p.title}</h3><p className="text-xs text-[var(--muted-foreground)]">{p.author} · {p.date} · {p.category}</p></div><div className="flex gap-2"><Link target="_blank" to={`/${p.type==='news'?'news':'blogs'}/${p.id}`} className="px-3 py-1.5 text-xs border border-[var(--border)]">View</Link><button onClick={()=>open(p.type,p)} className="px-3 py-1.5 text-xs text-[var(--primary)] border border-[var(--primary)]/30">Edit</button><button onClick={()=>remove(p.id)} className="px-3 py-1.5 text-xs text-red-600 border border-red-200">Delete</button></div></div>)}</div></section>}
 {tab==='users'&&<section><div className="flex justify-between mb-6"><h2 className="font-display text-2xl font-bold">Admin Users</h2>{auth.role==='super_admin'&&<button onClick={()=>setUserModal(true)} className="px-4 py-2 bg-[var(--primary)] text-white text-sm">+ Add Admin</button>}</div><div className="bg-[var(--card)] border border-[var(--border)] overflow-auto"><table className="w-full text-sm"><thead><tr className="border-b border-[var(--border)]">{['Name','Email','Role','Created','Last Login',''].map(h=><th key={h} className="px-4 py-3 text-left text-xs uppercase text-[var(--muted-foreground)]">{h}</th>)}</tr></thead><tbody className="divide-y divide-[var(--border)]">{admins.map(u=><tr key={u.id}><td className="px-4 py-3 font-medium">{u.name}</td><td className="px-4 py-3">{u.email}</td><td className="px-4 py-3">{u.role.replace('_',' ')}</td><td className="px-4 py-3">{u.createdAt}</td><td className="px-4 py-3">{u.lastLogin||'Never'}</td><td className="px-4 py-3">{u.role!=='super_admin'&&auth.role==='super_admin'&&<button onClick={()=>removeUser(u.id)} className="text-xs text-red-600">Remove</button>}</td></tr>)}</tbody></table></div></section>}
 </div>
 {modal&&<div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto"><div className="bg-[var(--card)] w-full max-w-2xl my-8"><div className="px-6 py-4 border-b flex justify-between"><h3 className="font-display font-semibold">{editing?'Edit':'New'} {form.type==='news'?'News Article':'Blog Post'}</h3><button onClick={()=>setModal(false)}>×</button></div><div className="p-6 space-y-4">{[['title','Title'],['author','Author'],['category','Category']].map(([f,l])=><div key={f}><label className="block text-xs font-mono uppercase mb-1">{l}</label><input value={(form as any)[f]} onChange={e=>setForm(x=>({...x,[f]:e.target.value}))} className="w-full px-3 py-2 border border-[var(--border)] text-sm"/></div>)}<div>
  <label className="block text-xs font-mono uppercase mb-2">
    Featured image
  </label>

  <div className="border border-dashed border-[var(--border)] bg-[#faf9f6] p-4">
    <label
      htmlFor="featured-image-upload"
      className={`
        flex flex-col items-center justify-center
        w-full min-h-[150px]
        cursor-pointer
        transition-all duration-200
        hover:bg-[#f3f0e8]
        ${uploadingImage ? 'pointer-events-none opacity-60' : ''}
      `}
    >
      <div className="flex items-center justify-center w-11 h-11 mb-3 bg-[var(--primary)] text-white">
        {uploadingImage ? (
          <svg
            className="w-5 h-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.3"
            />
            <path
              d="M21 12a9 9 0 0 0-9-9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 16V4M12 4L7 9M12 4L17 9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 14V18C5 19.1 5.9 20 7 20H17C18.1 20 19 19.1 19 18V14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      <span className="text-sm font-medium text-[var(--foreground)]">
        {uploadingImage ? 'Uploading image...' : 'Upload featured image'}
      </span>

      {!uploadingImage && (
        <span className="text-xs text-[var(--muted-foreground)] mt-1">
          Click to choose an image from your computer
        </span>
      )}

      <span className="text-[10px] text-gray-400 mt-2">
        JPG, PNG, WebP or GIF · Max 5 MB
      </span>

      <input
        id="featured-image-upload"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleUpload}
        disabled={uploadingImage}
        className="hidden"
      />
    </label>
  </div>

  {form.image && (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium">
          Selected image
        </span>

        <button
          type="button"
          onClick={() =>
            setForm((current) => ({
              ...current,
              image: '',
            }))
          }
          className="text-xs text-red-500 hover:text-red-700 transition-colors"
        >
          Remove
        </button>
      </div>

      <img
        src={form.image}
        alt="Featured image preview"
        className="w-full max-w-md h-48 object-cover border border-[var(--border)]"
      />
    </div>
  )}
</div><div><label className="block text-xs font-mono uppercase mb-1">Excerpt</label><textarea rows={2} value={form.excerpt} onChange={e=>setForm(x=>({...x,excerpt:e.target.value}))} className="w-full px-3 py-2 border border-[var(--border)] text-sm"/></div><div><label className="block text-xs font-mono uppercase mb-1">Content (HTML supported)</label><textarea rows={10} value={form.content} onChange={e=>setForm(x=>({...x,content:e.target.value}))} className="w-full px-3 py-2 border border-[var(--border)] text-sm font-mono"/></div></div><div className="px-6 py-4 border-t flex gap-3"><button disabled={busy} onClick={save} className="px-5 py-2 bg-[var(--primary)] text-white text-sm">{busy?'Saving...':editing?'Save Changes':'Publish'}</button><button onClick={()=>setModal(false)} className="px-5 py-2 border border-[var(--border)] text-sm">Cancel</button></div></div></div>}
 {userModal&&<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-[var(--card)] w-full max-w-md"><div className="px-6 py-4 border-b flex justify-between"><h3 className="font-display font-semibold">Add Admin User</h3><button onClick={()=>setUserModal(false)}>×</button></div><div className="p-6 space-y-4">{[['name','Name'],['email','Email'],['password','Password']].map(([f,l])=><div key={f}><label className="block text-xs font-mono uppercase mb-1">{l}</label><input type={f==='password'?'password':f==='email'?'email':'text'} value={(userForm as any)[f]} onChange={e=>setUserForm(x=>({...x,[f]:e.target.value}))} className="w-full px-3 py-2 border border-[var(--border)] text-sm"/></div>)}<select value={userForm.role} onChange={e=>setUserForm(x=>({...x,role:e.target.value as any}))} className="w-full px-3 py-2 border border-[var(--border)] text-sm"><option value="admin">Admin</option><option value="super_admin">Super Admin</option></select></div><div className="px-6 py-4 border-t"><button onClick={add} className="px-5 py-2 bg-[var(--primary)] text-white text-sm">Create User</button></div></div></div>}
 </div>;
}
