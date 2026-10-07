import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getPosts, Post } from '../store/dataStore';
import { trackPageView } from '../store/analytics';

//const CATEGORIES = ['All', 'Achievements', 'Announcements', 'Programs', 'Events'];
const CATEGORIES = [
  { value: 'All', label: 'هەموو' },
  { value: 'Achievements', label: 'دەستکەوتەکان' },
  { value: 'Announcements', label: 'ڕاگەیاندنەکان' },
  { value: 'Programs', label: 'بەرنامەکان' },
  { value: 'Events', label: 'ڕووداوەکان' },
];

export default function News() {
  const [allNews, setAllNews] = useState<Post[]>([]);
const [category, setCategory] = useState('All');
  useEffect(() => { getPosts('news').then(setAllNews).catch(console.error); trackPageView('/news'); }, []);

const filtered =
  category === 'All'
    ? allNews
    : allNews.filter(post => post.category === category);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-[var(--primary)] overflow-hidden">
        <div className="pattern-bg absolute inset-0 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-3">نوێترین</p>
          <h1 className="font-display text-5xl font-bold text-white mb-5">هەواڵ و چالاکییەکان</h1>
          <p className="text-white/70 max-w-xl leading-relaxed">
            لێرەوە ئاگاداری نوێترین زانیاری و چالاکییەکان بە دەربارەی رێکخراوەکەمان، خوێندکارەکانمان، پرۆگرام و نوێترین گۆڕانکارییەکان.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
  {CATEGORIES.map(cat => (
    <button
      key={cat.value}
      onClick={() => setCategory(cat.value)}
      className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-sm ${
        category === cat.value
          ? 'bg-[var(--primary)] text-white'
          : 'bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--muted)]'
      }`}
    >
      {cat.label}
    </button>
  ))}
</div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[var(--muted-foreground)]">
              No news articles found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(post => (
                <Link key={post.id} to={`/news/${post.id}`} className="group block">
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
                  <h2 className="font-display font-semibold text-lg text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-snug mb-2">
                    {post.title}
                  </h2>
                  <p className="text-[var(--muted-foreground)] text-sm line-clamp-3">{post.excerpt}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-3">By {post.author}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
