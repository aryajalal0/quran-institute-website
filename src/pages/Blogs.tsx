import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getPosts, Post } from '../store/dataStore';
import { trackPageView } from '../store/analytics';

const CATEGORIES = [
  { value: 'All', label: 'هەموو' },
  { value: 'Education', label: 'فێرکردن' },
  { value: 'Tajweed', label: 'تەجوید' },
  { value: 'Parenting & Education', label: 'مامۆستایی & فێرکردن' },
  { value: 'Spirituality', label: 'ڕۆژانە' },
];

export default function Blogs() {
  const [allBlogs, setAllBlogs] = useState<Post[]>([]);
  const [category, setCategory] = useState('All');
  useEffect(() => { getPosts('blog').then(setAllBlogs).catch(console.error); trackPageView('/blogs'); }, []);
  const [search, setSearch] = useState('');

  const filtered = allBlogs.filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-[var(--primary)] overflow-hidden">
        <div className="pattern-bg absolute inset-0 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="font-display text-5xl font-bold text-white mb-5">نووسراو و بابەتەکان</h1>
          <p className="text-white/70 max-w-xl leading-relaxed">
            نووسراوە ئیمانی و پەروەردەییەکان، ئەزموون و رێنماییەکان
          </p>
        </div>
      </section>

      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex flex-wrap justify-center gap-2 mb-8" dir="rtl">
              {CATEGORIES.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setCategory(item.value)}
                  className={`
                    px-4
                    py-1.5
                    text-sm
                    font-normal
                    rounded-[4px]
                    border-0
                    whitespace-nowrap
                    cursor-pointer
                    transition-colors
                    duration-200
                    ${
                      category === item.value
                        ? 'bg-[var(--primary)] text-white'
                        : 'bg-[#f0ede5] text-[var(--foreground)] hover:bg-[#e7e2d7]'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="sm:ml-auto">
              <input
                type="text"
                placeholder="گەڕانی بابەت"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full sm:w-64 px-4 py-1.5 text-sm border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] rounded-sm"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[var(--muted-foreground)]">
              No articles found.
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <Link to={`/blogs/${featured.id}`} className="group block mb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border border-[var(--border)] p-6 hover:border-[var(--primary)]/40 transition-colors">
                    <div className="aspect-[4/3] bg-[var(--muted)] overflow-hidden">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-2">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
                          {featured.category}
                        </span>
                        <span className="px-2 py-0.5 bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-mono">
                          بابەت
                        </span>
                      </div>
                      <h2 className="font-display text-3xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-tight mb-3">
                        {featured.title}
                      </h2>
                      <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                        {featured.excerpt}
                      </p>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        By {featured.author} · {featured.date}
                      </p>
                    </div>
                  </div>
                </Link>
              )}

              {/* Rest */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map(post => (
                    <Link key={post.id} to={`/blogs/${post.id}`} className="group block">
                      <div className="aspect-video bg-[var(--muted)] overflow-hidden mb-4">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-[var(--border)]">·</span>
                        <span className="text-xs text-[var(--muted-foreground)]">{post.date}</span>
                      </div>
                      <h3 className="font-display font-semibold text-lg text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-snug mb-2">
                        {post.title}
                      </h3>
                      <p className="text-[var(--muted-foreground)] text-sm line-clamp-3">{post.excerpt}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-3">By {post.author}</p>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
