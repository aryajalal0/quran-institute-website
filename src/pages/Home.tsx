import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getPosts, Post } from '../store/dataStore';
import { trackPageView } from '../store/analytics';

const STATS = [
  { value: '2,400+', label: 'فێرخواز' },
  { value: '28', label: 'ساڵ خزمەتکردن' },
  { value: '140+', label: 'لەبرکاری قورئان' },
  { value: '12', label: 'بەشی ئەکادیمی' },
];

const FEATURES = [
  {
    title: 'بەشی لەبەرکردن',
    desc: '.فێرخواز لەم بەشەدا بەپەیڕەوکردنی پرۆگرامە تایبەتەکان دەستدەکات بە لەبەرکردنی قورئانی پیرۆز',
    image: '/uploads/Cards.jpg',
  },
  {
    title: 'بەشی فێرکردن',
    desc: 'فێرخواز لەم بەشەدا دەست دەکات بە فێربوونی بنەما سەرەکییەکانی خوێندنەوەی قورئانی پیرۆز بە ئامانجی خۆ ئامادەکردن بۆ چوونە ناو بەشی خوێندنەوەکان.',
    image: '/uploads/teaching.jpg',
  },
  {
    title: 'بەشی خوێندنەوەکان',
    desc: 'لەم بەشەدا فێرخواز پابەند دەبێت بە خوێندنەوەی ریوایەتێکی تایبەت لەلای مامۆستایەکی دیاریکراو بە ئامانجی وەرگرتنی مۆڵەتی خوێندنەوە لە ریوایەتێکی دیاریکراو.',
    image: '/uploads/reading.jpg',
  },
  {
    title: 'بەشی تەفسیر',
    desc: 'لەم بەشەدا فێرخواز ئاوێتە دەبێت بە ڕاڤە و تەفسیری ئایەتەکانی قورئانی پیرۆز، بەمەش ئاستی تێگەیشتن لە قورئانی پیرۆز دەگاتە ئاستێکی پێشکەوتوو.',
    image: '/uploads/tafsir.jpg',
  },
  {
    title: 'بەشی دەنگخۆشی',
    desc: 'لەم بەشەدا فێرخواز بنەما سەرەکییەکانی ئاوازەکانی خوێندنەوەی قورئانی پیرۆز فێرەبێت بە ئامانجی ئەداکردنی ئایەتەکانی قورئانی پیرۆز',
    image: '/uploads/voice.jpg',
  },
  {
    title: 'پرۆگرامی تەجوید',
    desc: 'لەم پرۆگرامەدا فێرخواز فێری زانستەکانی جوان خوێندنەوەی قورئانی پیرۆز دەبێت بە هەموو یاساکان و شێوازە ڕەوانەکان.',
    image: '/uploads/tajweed.jpg',
  },
  {
    title: 'بەشی گەشەپێدان',
    desc: 'ئەم بەشە جەخت دەکاتەوە لە پەرەپێدانی توانا هزری و پەروەردەییەکان و گەشەپێدانیان لەڕێگەی وانە و چالاکییە جۆراوجۆرەکانەوە.',
    image: '/uploads/development.jpg',
  },
  {
    title: 'پرۆگرامی پەروەردەیی هاوینە',
    desc: 'لەم پرۆگرامە هاوینەیەدا فێرخوازان پەرە بە توانا جیاواەکانیان دەدەن و',
    image: '/uploads/summer.jpg',
  },
];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => { getPosts().then(setPosts).catch(console.error); trackPageView('/'); }, []);
  const latestNews = posts.filter(p => p.type === 'news').slice(0, 3);
  const latestBlogs = posts.filter(p => p.type === 'blog').slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(../uploads/banner.png)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d3326]/95 via-[#0d3326]/80 to-[#0d3326]/40" />
        <div className="pattern-bg absolute inset-0 opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent)]/20 border border-[var(--accent)]/40 rounded-sm mb-6">
              <span className="text-[var(--accent)] text-xs font-mono tracking-widest uppercase">
                دامەزراوە لە 1992
              </span>
            </div>
            <h1 className="font-display text-3xl lg:text-7xl font-bold text-white leading-tight mb-6">
              رێکخـراوی اقـــرأ<br />
              <span className="text-[var(--accent)] text-[40px] font-normal">
                بۆ زانستەکانی قورئانی پیرۆز
              </span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-lg">
پەروەردەی نەوەیەکی پێگەیشتوو و خزمەتکار بە قورئانی پیرۆز       </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/departments"
                className="px-6 py-3 bg-[var(--accent)] text-[#1c1a16] font-semibold text-sm rounded-sm hover:bg-[var(--accent)]/90 transition-colors"
              >
                بینینی پرۆگرامەکان
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 border border-white/40 text-white font-medium text-sm rounded-sm hover:bg-white/10 transition-colors"
              >
                دەربارەی ئێمە بزانە
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <div className="w-0.5 h-8 bg-white/30" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--primary)] py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-4xl font-bold text-[var(--accent)] mb-1">{value}</div>
              <div className="text-white/60 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <p className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-3">دیدگای ئێمە</p>
            <h2 className="font-display text-4xl font-bold text-[var(--foreground)] mb-4">
              گرنگیدان بە پەروەردەیەکی دروست،<br />
              <span className=" text-[var(--primary)]">بۆ داهاتووی نەوەیەکی ئیمانی</span>
            </h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
             ئاوێتەکردنی زانستە قورئانییەکان بە ئادابە ئیسلامییەکان بەئامانجی پێگەیاندنی تاکێکی هۆشیاری قورئان دۆست و ئیمانی.
            </p>
          </div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
  {FEATURES.map(({ title, desc, image }) => (
    <div
      key={title}
      className="group relative h-[260px] overflow-hidden"
    >

      {/* ================= FRONT ================= */}
      <div
        className="
          absolute inset-0
          bg-[var(--primary)]
          border border-[var(--primary)]
          shadow-sm
          flex items-center justify-center
          px-6
          text-center
          transition-all
          duration-700
          ease-out
          opacity-100
          group-hover:opacity-0
          group-hover:scale-[0.98]
        "
      >

        {/* Individual background image */}
        <div
          className="
            absolute inset-0
            bg-cover
            bg-center
            bg-no-repeat
            opacity-20
          "
          style={{
            backgroundImage: `url('${image}')`,
          }}
        />

        {/* Green overlay */}
        <div
          className="
            absolute inset-0
            bg-[var(--primary)]/70
          "
        />

        {/* Title */}
        <div
          className="
            relative
            z-10
            w-full
            h-full
            flex
            items-center
            justify-center
            px-5
          "
        >
          <h3
            dir="rtl"
            className="
              font-display
              font-bold
              text-xl
              lg:text-2xl
              text-[var(--accent)]
              leading-relaxed
              text-center
            "
          >
            {title}
          </h3>
        </div>
      </div>


      {/* ================= DESCRIPTION ================= */}
      <div
        className="
          absolute inset-0
          bg-white
          border border-[var(--border)]
          shadow-sm
          flex items-center justify-center
          px-7
          text-center
          opacity-0
          translate-y-3
          group-hover:opacity-100
          group-hover:translate-y-0
          transition-all
          duration-700
          ease-out
        "
      >

        {/* Description */}
        <p
          dir="rtl"
          className="
            text-[var(--foreground)]
            text-sm
            lg:text-base
            leading-8
            text-center
            max-w-sm
          "
        >
          {desc}
        </p>

      </div>

    </div>
  ))}
</div>
        </div>
      </section>

      {/* About strip */}
      <section className="bg-[var(--secondary)] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=700&h=500&fit=crop&auto=format"
              alt="Students studying Quran"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-[var(--primary)] text-white p-6 hidden lg:block">
              <div className="font-display text-2xl font-bold"> زیاد لە 140+ </div>
              <div className="text-white/70 text-xs">لەبەرکاری قورئانی پیرۆز</div>
            </div>
          </div>
          <div>
            <p className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-3">ئێمە کێین؟</p>
            <h2 className="font-display text-4xl font-bold text-[var(--foreground)] mb-5">
              میراتێکی زانستی قورئانی پیرۆز
            </h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
              لە ساڵی 1996 دامەزراوە لەسەر دەستی پرۆفیسۆر د.علی قەرەداغی وەکو ناوەندێکی فێرکردن و خزمەتکردن بە زانستەکانی قورئانی پیرۆز لە ئاستە جیاجیاکان لەسەر ئاستی شارەکانی کوردستان.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
              مامۆستایانی قورئانی پیرۆز لە رێکخراوەکەمان هەڵگری مۆڵەتی ریوایەتە جیاوازەکانن کە 
              وابەستەن بەو شێوازە خوێندەوانەی بنەچەکەیان دەگەڕێتەوە سەر پێغەمبەری ئازیزمان ﷺ بە پاراستنی ڕژدە پەیوەستەکان و پابەند بە هەموو یاسا قورئانییەکانەوە.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold text-sm hover:gap-3 transition-all"
            >
                       <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M13 8H3M7 4L3 8l4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
              زانیاری تەواو دەربارەی ئێمە
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      {latestNews.length > 0 && (
        <section className="py-24 bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-3">نوێترین</p>
                <h2 className="font-display text-4xl font-bold text-[var(--foreground)]">هەواڵ و زانیارییەکان</h2>
              </div>
              <Link to="/news" className="text-[var(--primary)] text-sm font-medium hover:underline hidden sm:block">
                ← بینینی زیاتر 
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((post, i) => (
                <Link
                  key={post.id}
                  to={`/news/${post.id}`}
                  className={`group block ${i === 0 ? 'md:col-span-1' : ''}`}
                >
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
                    <span className="text-[var(--border)] text-xs">·</span>
                    <span className="text-xs text-[var(--muted-foreground)]">{post.date}</span>
                  </div>
                  <h3 className="font-display font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="text-[var(--muted-foreground)] text-sm line-clamp-2">{post.excerpt}</p>
                </Link>
              ))}
            </div>
            <div className="mt-6 sm:hidden">
              <Link to="/news" className="text-[var(--primary)] text-sm font-medium">All news →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Blog strip */}
      {latestBlogs.length > 0 && (
        <section className="py-20 bg-[var(--primary)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-3">ڕێنماییەکان</p>
                <h2 className="font-display text-3xl font-bold text-white">لەزاری مامۆستاکانمانەوە</h2>
              </div>
              <Link to="/blogs" className="text-white/60 hover:text-white text-sm font-medium hidden sm:block">
                ← هەموو بابەتەکان
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestBlogs.map(post => (
                <Link
                  key={post.id}
                  to={`/blogs/${post.id}`}
                  className="group flex gap-4 p-5 bg-white/10 hover:bg-white/15 transition-colors border border-white/10"
                >
                  <div className="w-20 h-20 shrink-0 bg-white/10 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h3 className="font-display font-semibold text-white group-hover:text-[var(--accent)] transition-colors mt-1 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-white/50 text-xs mt-1">By {post.author}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-[var(--background)] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-4">گەشتەکەت دەستپێبکە</p>
          <h2 className="font-display text-4xl font-bold text-[var(--foreground)] mb-5">
            ئامادەیت بۆ ئاشنابوون<br />
            <span className="italic text-[var(--primary)]">بە زانستەکانی قورئان؟</span>
          </h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
            پەیوەندیمان پێوە بکە بۆ زیاتر ئاشنابوون بە شێوازی پرۆگرامەکان، شێوازەکانی بەشداریکردن تاکو یارمەتیدەرت بین
            لە دەستکردن بە گەشتە پڕ لە دەستکەوتەکەت.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-[var(--primary)] text-white font-semibold rounded-sm hover:bg-[var(--primary)]/90 transition-colors"
          >
            پەیوەندیمان پێوە بکە
          </Link>
        </div>
      </section>
    </div>
  );
}
