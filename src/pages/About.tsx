const TEAM = [
  {
    name: 'م. زەین الدین سازانی',
    role: 'سەرۆکی رێکخراو',
    bio: 'خاوەن ریوایەتی عشرە و سەرۆکی رێکخراوی اقرأ ە لە تەواوی کوردستان',
    image: '',
  },
  {
    name: 'ئە. سەلمان ڕزگار',
    role: 'بەرپرسی بەشی ڕاگەیاندن و پەیوەندییەکان',
    bio: 'خاوەن بڕوانامەی بەکالۆریۆس لە ئەندازیاری شارستانی',
    image: '',
  },
  {
    name: 'م. أحمد ڕۆژبەیانی',
    role: 'بەررسی بەشی لەبەرکردن',
    bio: 'خاوەنی ریوایەتی حفص عن عاصم',
    image: '  ',
  },
  {
    name: 'م. مطلب أحمد',
    role: 'بەرپرسی بەشی گەشەپێدان',
    bio: 'خاوەن ریوایەتی عشر',
    image: '',
  },
];

const MILESTONES = [
  { year: '1998', event: 'دامەزراوە بە ناوی ناوەندی ئەبوبەکری صدیق' },
  { year: '2003', event: 'یەکەمین پۆلی دەرچووانی بەشی خوێندنەوەکان' },
  { year: '2008', event: 'کردنەوەی یەکەم باڵيخانەی تایبەت بە رێکخراو' },
  { year: '2012', event: 'کردنەوەی 8بنکە لە لقی سلێمانی و لقەکانی کرکوک و هەڵەبجە' },
  { year: '2018', event: 'یەکەمین فێرگەی ئۆنلاین تایبەت بە خوێندکارانی تاراوگە' },
  { year: '2024', event: 'پێشکەشکردنی زیاد لە 150 لەبەرکاری قورئانی پیرۆز' },
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-[var(--primary)] overflow-hidden">
        <div className="pattern-bg absolute inset-0 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-3"> چیرۆکی ئێمە </p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white max-w-2xl leading-tight mb-6">
           زیاد لە دەیان ساڵ لە خزمەتکردن بە
          </h1>
          <p className="font-display text-5xl lg:text-6xl font-bold text-white max-w-2xl leading-tight mb-6">
           زانستەکانی قورئان
          </p>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
          لە ساڵی 1996ەوە، رێکخراوی اقرأ وەک رێکخراوێکی تایبەت دامەزرا بە ئامانجی
          خزمەتکردن بە زانستەکانی قورئانی پیرۆز و گەیاندنی ریوایەتە جیاوازەکانی کەلامی پەروەردگار
          بەوشێوازەی کە پشتاوپشت لە پێغەمبەری نازدارەوە ﷺ گەیشتووە پێمان.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-3">روئیای ئێمە</p>
            <h2 className="font-display text-3xl font-bold text-[var(--foreground)] mb-5">
              خزمەتکردن و بڵاوکردنەوەی زانستەکانی قورئانی پیرۆز
            </h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-5">
             ئامانجی ئێمە بریتییە لە بڵاوکردنەوە و گەیاندنی پەیامی ئاسمانی پەروەردگار بۆ پێغەمبەری نازدارمان ﷺ بە هەموو یاساو ڕێسا دیاریکراوەکانی پەیوەست بە ڕشتە گەیەندراوەکان.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              بڕوامان وایە کە زانستەکانی قورئانی پیرۆز تەنها زانستێکی خوێندراو نییە، بەڵکو پەیڕەوێکی ژیانکردنە بە هەموو تایبەتمەندییە بەرزەکانی پەیوەست بە ئاینی پیرۆزی ئیسلامەوە.
            </p>
          </div>
          <div className="space-y-5">
            <div className="p-6 border-l-2 border-[var(--accent)] bg-[var(--secondary)]">
              <h3 className="font-display font-semibold text-[var(--foreground)] mb-2">ئامانجی ئێمە</h3>
              <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                ببین بە یەکێک لە رێکخراوە دیارەکانی زانستەکانی قورئانی پیرۆز، پێگەیاندنی ئەو دەرچووانەی کە هەڵگری قورئانن لە دڵیاندا و پەیڕەوکارن
              </p>
            </div>
            <div className="p-6 border-l-2 border-[var(--primary)] bg-[var(--secondary)]">
              <h3 className="font-display font-semibold text-[var(--foreground)] mb-2">بەهای ئێمە</h3>
              <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                ئەکادیمیبوون لە گەیاندن، نموونەیی بوون لە وانەوتنەوە، پابەندبوون بە پەروەردەیەکی دروست.

              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[var(--secondary)]">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-3 text-center">مێژووی ئێمە</p>
          <h2 className="font-display text-3xl font-bold text-[var(--foreground)] mb-14 text-center">
            قۆناغەکانی گەشەکردنمان
          </h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-[var(--border)] hidden sm:block" />
            <div className="space-y-8">
              {MILESTONES.map(({ year, event }) => (
                <div key={year} className="flex gap-6 items-start">
                  <div className="shrink-0 w-12 text-right">
                    <span className="font-mono text-sm font-bold text-[var(--primary)]">{year}</span>
                  </div>
                  <div className="shrink-0 hidden sm:flex w-8 items-center justify-center pt-0.5">
                    <div className="w-3 h-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--secondary)] z-10" />
                  </div>
                  <p className="text-[var(--foreground)] leading-relaxed pt-0.5">{event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-3 text-center"> ستافی رێکخراو </p>
          <h2 className="font-display text-3xl font-bold text-[var(--foreground)] mb-14 text-center">
            کارگێڕانی نووسینگەی سەرەکی
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map(({ name, role, bio, image }) => (
              <div key={name} className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-[var(--muted)]">
                  <img src={image} alt={name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-display font-semibold text-[var(--foreground)] mb-1">{name}</h3>
                <p className="text-[var(--accent)] text-xs font-mono uppercase tracking-wider mb-3">{role}</p>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
