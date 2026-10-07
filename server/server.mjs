import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import { DEFAULT_POSTS, DEFAULT_ADMINS } from './seed-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dbDir = path.join(root, 'data');
const uploadDir = path.join(root, 'uploads');
const ADMIN_EMAIL = 'admin01@iqraaquran.org';
const ADMIN_PASSWORD = 'Iqraa@2026';
fs.mkdirSync(dbDir, { recursive: true });
fs.mkdirSync(uploadDir, { recursive: true });



const db = new DatabaseSync(path.join(dbDir, 'quran-institute.sqlite'));
db.exec(`
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS admins (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL, role TEXT NOT NULL CHECK(role IN ('super_admin','admin')),
  created_at TEXT NOT NULL, last_login TEXT
);
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY, title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL, content TEXT NOT NULL, author TEXT NOT NULL,
  date TEXT NOT NULL, category TEXT NOT NULL, image TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('news','blog')), created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY, admin_id TEXT NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT NOT NULL, session_id TEXT NOT NULL,
  viewed_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_posts_type_date ON posts(type, date DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(viewed_at);
`);

const now = () => new Date().toISOString();
const id = () => crypto.randomBytes(10).toString('hex');
const slugify = (value) => value.toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 90) || id();
const uniqueSlug = (title, excludeId = '') => {
  const base = slugify(title);
  let slug = base, n = 2;
  while (true) {
    const row = db.prepare('SELECT id FROM posts WHERE slug = ? AND id <> ?').get(slug, excludeId);
    if (!row) return slug;
    slug = `${base}-${n++}`;
  }
};
const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
};
const verifyPassword = (password, stored) => {
  const [salt, hash] = String(stored).split(':');
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(candidate, 'hex'), Buffer.from(hash, 'hex'));
};
const tokenHash = token => crypto.createHash('sha256').update(token).digest('hex');
const cookie = (req, name) => {
  const value = (req.headers.cookie || '').split(';').map(x => x.trim()).find(x => x.startsWith(`${name}=`));
  return value ? decodeURIComponent(value.slice(name.length + 1)) : null;
};
const send = (res, status, data, headers = {}) => {
  const body = JSON.stringify(data);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  res.end(body);
};
const text = (res, status, body, headers = {}) => { res.writeHead(status, headers); res.end(body); };
const readBody = async req => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
};
const jsonBody = async req => JSON.parse((await readBody(req)).toString('utf8') || '{}');
const publicPost = r => ({ id:r.id,title:r.title,slug:r.slug,excerpt:r.excerpt,content:r.content,author:r.author,date:r.date,category:r.category,image:r.image,type:r.type });

if (!db.prepare('SELECT id FROM admins LIMIT 1').get()) {
  const seedPassword = process.env.SEED_ADMIN_PASSWORD || crypto.randomBytes(12).toString('base64url');
  console.log(`Initial super-admin password: ${seedPassword}`);
  const insertAdmin = db.prepare('INSERT INTO admins (id,name,email,password_hash,role,created_at,last_login) VALUES (?,?,?,?,?,?,?)');
  for (const a of DEFAULT_ADMINS) insertAdmin.run(a.id, a.name, a.email, hashPassword(seedPassword), a.role, a.createdAt, null);
}
if (!db.prepare('SELECT id FROM posts LIMIT 1').get()) {
  const insertPost = db.prepare('INSERT INTO posts (id,title,slug,excerpt,content,author,date,category,image,type,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
  for (const p of DEFAULT_POSTS) insertPost.run(p.id,p.title,uniqueSlug(p.title),p.excerpt,p.content,p.author,p.date,p.category,p.image,p.type,now(),now());
}

db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(Date.now());

function currentAdmin(req) {
  const token = cookie(req, 'qi_session');
  if (!token) return null;
  const row = db.prepare(`SELECT a.id,a.name,a.email,a.role FROM sessions s JOIN admins a ON a.id=s.admin_id WHERE s.token_hash=? AND s.expires_at>?`).get(tokenHash(token), Date.now());
  return row || null;
}
function requireAdmin(req, res, role = null) {
  const admin = currentAdmin(req);
  if (!admin) { send(res, 401, { error: 'Authentication required.' }); return null; }
  if (role && admin.role !== role) { send(res, 403, { error: 'Insufficient permissions.' }); return null; }
  return admin;
}

const routes = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  if (req.method === 'GET' && pathname === '/api/health') return send(res,200,{ok:true});

if (req.method === 'POST' && pathname === '/api/auth/login') {
  const body = await jsonBody(req).catch(() => ({}));

  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  // Check hard-coded credentials
  if (
    email !== ADMIN_EMAIL.toLowerCase() ||
    password !== ADMIN_PASSWORD
  ) {
    return send(res, 401, {
      error: 'Invalid email or password.'
    });
  }

  // Find the hard-coded admin in the database
  let admin = db
    .prepare('SELECT * FROM admins WHERE lower(email)=?')
    .get(ADMIN_EMAIL.toLowerCase());

  // Create the admin if it does not exist
  if (!admin) {
    const adminId = 'hard-coded-admin';

    db.prepare(`
      INSERT INTO admins
      (id, name, email, password_hash, role, created_at, last_login)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      adminId,
      'Quran Institute Admin',
      ADMIN_EMAIL,
      hashPassword(ADMIN_PASSWORD),
      'super_admin',
      now(),
      null
    );

    admin = db
      .prepare('SELECT * FROM admins WHERE id=?')
      .get(adminId);
  }

  // Create login session
  const token = crypto.randomBytes(32).toString('base64url');

  db.prepare(`
    INSERT INTO sessions
    (token_hash, admin_id, expires_at)
    VALUES (?, ?, ?)
  `).run(
    tokenHash(token),
    admin.id,
    Date.now() + 1000 * 60 * 60 * 24 * 7
  );

  // Update last login
  db.prepare(
    'UPDATE admins SET last_login=? WHERE id=?'
  ).run(now(), admin.id);

  return send(
    res,
    200,
    {
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    },
    {
      'Set-Cookie':
        `qi_session=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800`
    }
  );
}

const admin = {
  id: 'hard-coded-admin',
  name: 'Quran Institute Admin',
  email: ADMIN_EMAIL,
  role: 'super_admin'
};
  if (req.method === 'POST' && pathname === '/api/auth/logout') {
    const token = cookie(req,'qi_session'); if (token) db.prepare('DELETE FROM sessions WHERE token_hash=?').run(tokenHash(token));
    return send(res,200,{ok:true},{'Set-Cookie':'qi_session=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0'});
  }
  if (req.method === 'GET' && pathname === '/api/auth/me') {
    const admin=currentAdmin(req); return admin ? send(res,200,{user:admin}) : send(res,401,{user:null});
  }

  if (req.method === 'GET' && pathname === '/api/posts') {
    const type=url.searchParams.get('type');
    const rows=type ? db.prepare('SELECT * FROM posts WHERE type=? ORDER BY date DESC, created_at DESC').all(type) : db.prepare('SELECT * FROM posts ORDER BY date DESC, created_at DESC').all();
    return send(res,200,{posts:rows.map(publicPost)});
  }
  const postMatch=pathname.match(/^\/api\/posts\/([^/]+)$/);
  if (req.method === 'GET' && postMatch) {
    const key=decodeURIComponent(postMatch[1]);
    const row=db.prepare('SELECT * FROM posts WHERE id=? OR slug=? LIMIT 1').get(key,key);
    return row ? send(res,200,{post:publicPost(row)}) : send(res,404,{error:'Post not found.'});
  }
  if (req.method === 'POST' && pathname === '/api/pageviews') {
    const body=await jsonBody(req).catch(()=>({}));
    const p=String(body.path || '/').slice(0,300);
    const sid=String(body.sessionId || id()).slice(0,100);
    db.prepare('INSERT INTO page_views(path,session_id,viewed_at) VALUES (?,?,?)').run(p,sid,now());
    return send(res,204,{});
  }

  if (req.method === 'POST' && pathname === '/api/upload') {
    const admin=requireAdmin(req,res); if (!admin) return;
    const contentType=req.headers['content-type'] || '';
    const mime=contentType.split(';')[0].trim();
    const allowed=['image/jpeg','image/png','image/webp','image/gif'];
    if(!allowed.includes(mime)) return send(res,415,{error:'Only JPEG, PNG, WebP, and GIF images are supported.'});
    const body=await readBody(req); if(body.length>5*1024*1024) return send(res,413,{error:'Image exceeds 5 MB.'});
    const ext={ 'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/gif':'gif'}[mime];
    const name=`${id()}.${ext}`; fs.writeFileSync(path.join(uploadDir,name),body);
    return send(res,201,{url:`/uploads/${name}`});
  }

  if (pathname.startsWith('/api/admin')) {
    const admin=requireAdmin(req,res); if(!admin) return;
    if(req.method==='GET' && pathname==='/api/admin/analytics') {
      const rows=db.prepare(`SELECT substr(viewed_at,1,10) date, COUNT(DISTINCT session_id) visitors, COUNT(*) pageViews FROM page_views WHERE viewed_at >= datetime('now','-29 day') GROUP BY substr(viewed_at,1,10) ORDER BY date`).all();
      const pages=db.prepare(`SELECT path page, COUNT(*) views FROM page_views GROUP BY path ORDER BY views DESC LIMIT 10`).all();
      return send(res,200,{daily:rows,pages});
    }
    if(req.method==='GET' && pathname==='/api/admin/users') {
      const users=db.prepare('SELECT id,name,email,role,created_at createdAt,last_login lastLogin FROM admins ORDER BY created_at').all(); return send(res,200,{users});
    }
    if(req.method==='POST' && pathname==='/api/admin/users') {
      if(admin.role!=='super_admin') return send(res,403,{error:'Only a super administrator can manage users.'});
      const b=await jsonBody(req); const email=String(b.email||'').trim().toLowerCase();
      if(!b.name || !email || !b.password) return send(res,400,{error:'Name, email and password are required.'});
      try { const newId=id(); db.prepare('INSERT INTO admins (id,name,email,password_hash,role,created_at,last_login) VALUES (?,?,?,?,?,?,?)').run(newId,String(b.name),email,hashPassword(String(b.password)),b.role==='super_admin'?'super_admin':'admin',now(),null); return send(res,201,{user:{id:newId,name:b.name,email,role:b.role==='super_admin'?'super_admin':'admin'}}); } catch { return send(res,409,{error:'An administrator with that email already exists.'}); }
    }
    const userMatch=pathname.match(/^\/api\/admin\/users\/([^/]+)$/);
    if(req.method==='DELETE' && userMatch) {
      if(admin.role!=='super_admin') return send(res,403,{error:'Only a super administrator can manage users.'});
      const target=db.prepare('SELECT role FROM admins WHERE id=?').get(userMatch[1]); if(!target) return send(res,404,{error:'User not found.'});
      if(target.role==='super_admin') return send(res,400,{error:'The super administrator cannot be removed.'});
      db.prepare('DELETE FROM admins WHERE id=?').run(userMatch[1]); return send(res,200,{ok:true});
    }
    const postId=pathname.match(/^\/api\/admin\/posts\/([^/]+)$/);
    if(req.method==='PUT' && postId) {
      const b=await jsonBody(req); const old=db.prepare('SELECT * FROM posts WHERE id=?').get(postId[1]); if(!old) return send(res,404,{error:'Post not found.'});
      const type=b.type==='blog'?'blog':'news'; const slug=uniqueSlug(String(b.title||old.title),old.id); const updated=now();
      db.prepare('UPDATE posts SET title=?,slug=?,excerpt=?,content=?,author=?,date=?,category=?,image=?,type=?,updated_at=? WHERE id=?').run(String(b.title||old.title),slug,String(b.excerpt||''),String(b.content||''),String(b.author||''),String(b.date||old.date),String(b.category||''),String(b.image||''),type,updated,old.id);
      return send(res,200,{post:publicPost(db.prepare('SELECT * FROM posts WHERE id=?').get(old.id))});
    }
    if(req.method==='POST' && pathname==='/api/admin/posts') {
      const b=await jsonBody(req); if(!b.title||!b.excerpt||!b.content) return send(res,400,{error:'Title, excerpt and content are required.'});
      const newId=id(), created=now(), type=b.type==='blog'?'blog':'news'; db.prepare('INSERT INTO posts (id,title,slug,excerpt,content,author,date,category,image,type,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)').run(newId,String(b.title),uniqueSlug(String(b.title)),String(b.excerpt),String(b.content),String(b.author||admin.name),String(b.date||created.slice(0,10)),String(b.category||''),String(b.image||''),type,created,created);
      return send(res,201,{post:publicPost(db.prepare('SELECT * FROM posts WHERE id=?').get(newId))});
    }
    if(req.method==='DELETE' && postId) { db.prepare('DELETE FROM posts WHERE id=?').run(postId[1]); return send(res,200,{ok:true}); }
  }
  return send(res,404,{error:'Not found.'});
};

const mimeTypes={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};
const server=http.createServer(async (req,res)=>{
  try {
    if(req.url?.startsWith('/uploads/')) { const name=path.basename(new URL(req.url,'http://localhost').pathname); const file=path.join(uploadDir,name); if(fs.existsSync(file)) return text(res,200,fs.readFileSync(file),{'Content-Type':mimeTypes[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'public, max-age=31536000, immutable'}); return text(res,404,'Not found'); }
    if(req.url?.startsWith('/api/')) return await routes(req,res);
    const dist=path.join(root,'dist'); let filePath=path.join(dist,new URL(req.url || '/',`http://${req.headers.host||'localhost'}`).pathname);
    if(!filePath.startsWith(dist)) return text(res,403,'Forbidden');
    if(!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) filePath=path.join(dist,'index.html');
    if(!fs.existsSync(filePath)) return text(res,404,'Build not found. Run npm run build first.');
    return text(res,200,fs.readFileSync(filePath),{'Content-Type':mimeTypes[path.extname(filePath).toLowerCase()]||'text/html; charset=utf-8'});
  } catch (e) { console.error(e); send(res,500,{error:'Internal server error.'}); }
});
const port=Number(process.env.PORT||3001);
server.listen(port,()=>console.log(`Quran Institute server listening on http://localhost:${port}`));
