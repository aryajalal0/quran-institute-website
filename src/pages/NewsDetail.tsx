import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';

import { getPost, getPosts, Post } from '../store/dataStore';
import { trackPageView } from '../store/analytics';

export default function NewsDetail() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);

  useEffect(() => {
    if (!id) return;

    getPost(id)
      .then((p) => {
        setPost(p?.type === 'news' ? p : null);
      })
      .catch(() => setPost(null));

    getPosts('news')
      .then((items) => {
        setRelated(
          items
            .filter((p) => p.id !== id)
            .slice(0, 2)
        );
      })
      .catch(console.error);

    // Track the current news article page view
    trackPageView(`/news/${id}`);
  }, [id]);

  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p className="font-display text-2xl text-[var(--foreground)] mb-4">
          Article not found
        </p>

        <Link
          to="/news"
          className="text-[var(--primary)] hover:underline"
        >
          ← Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Back to News */}
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-8"
        >
          ← Back to News
        </Link>

        {/* Article information */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
            {post.category}
          </span>

          <span className="text-[var(--border)]">·</span>

          <span className="text-xs text-[var(--muted-foreground)]">
            {post.date}
          </span>

          <span className="text-[var(--border)]">·</span>

          <span className="text-xs text-[var(--muted-foreground)]">
            By {post.author}
          </span>
        </div>

        {/* Article title */}
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-[var(--foreground)] leading-tight mb-8">
          {post.title}
        </h1>

        {/* Article image */}
        <div className="aspect-video bg-[var(--muted)] overflow-hidden mb-10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article content */}
        <div
          className="prose max-w-none text-[var(--foreground)] leading-relaxed [&_p]:mb-4 [&_p]:text-[var(--muted-foreground)]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related News */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[var(--border)]">

            <h2 className="font-display text-xl font-semibold text-[var(--foreground)] mb-6">
              Related News
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/news/${r.id}`}
                  className="group flex gap-4"
                >
                  {/* Related article image */}
                  <div className="w-20 h-20 shrink-0 bg-[var(--muted)] overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Related article information */}
                  <div>
                    <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-1">
                      {r.category}
                    </p>
                    <h3 className="font-display text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
