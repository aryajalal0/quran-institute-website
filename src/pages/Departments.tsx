const DEPARTMENTS = [
  {
    id: 'hifz',
    name: 'بەشی فێرکردن',
    arabic: 'التعلیم',
    description:
      'بەشی فێرکردن بەشێکی سەرەکی و یەکەم قۆناغی دەستپێکی خوێندنی زانستەکانی قورئانی پیرۆزە، خوێندکار لەم بەشە ئامادە دەکرێت بۆ گەیشتن بە قۆناغەکانی داهاتوو.',
    duration: '6 تا 9 مانگ',
    schedule: 'هەفتانە یەک ڕۆژ، بەیانیان و ئێواران',
    capacity: '100 خوێندکار',
    levels: ['ئاستی سەرەتایی (بنچینە نوورینەکان)', 'ئاستی دووەم (جوزئی عم)', 'ئاستی دووەم (جوزئی تبارك)'],
    image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=700&h=400&fit=crop&auto=format',
    features: [
      'خوێندنی ئاستە جیاوازەکان لە پرۆگرامە ئەکادیمییەکان',
      'ئەنجامدانی تاقیکردنەوە لە تێپەڕینی هەموو ئاستەکان',
      'ئەنجامدانی چالاکی و گەشتی کراوە',
      'هاوئاهەنگ بوون لەگەڵ دایبابی خوێندکاران',
    ],
  },
  {
    id: 'Qiraat',
    name: 'بەشی خوێندنەوەکان',
    arabic: 'قرائات',
    description:
      'لە بەشی فێرکردنەوە ڕاستەوخۆ بەشی خوێندنەوەکان دەستپێدەکات کە مامۆستای مۆڵەتپێدەر پاش کۆتاییهێنان بە خەتمی قورئانی پیرۆز بەپێی هەڵسەنگاندنەکان مۆڵەتی ریوایەتە جیاوازەکان دەبەخشێت بە مۆڵەتوەرگر.',
    duration: '2-1 ساڵ',
    schedule: 'بەهاوئاهەنگی دەبێت',
    capacity: '120 خوێندکار',
    levels: ['حفص عن عاصم', 'شعبة عن عاصم', 'ریوایەتە جیاوازەکان'],
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=700&h=400&fit=crop&auto=format',
    features: [
      'خەتمکردنی هەموو قورئانی پیرۆز لەخزمەت مامۆستایەکی دیاریکراو',
      'ئەنجامدانی تاقیکردنەوەی 5جوزئی، 15جوزئی، 25 جوزئی',
      'ئەنجامدانی تاقیکردنەوەی کۆتایی لە لە کۆتایی خەتمی قورئانی پیرۆزدا',
      'وەرگرتنی مۆڵەت لە ریوایەتەکەدا',
    ],
  },
  {
    id: 'tafsir',
    name: 'بەشی تەفسیر',
    arabic: 'التفسير',
    description:
      'بەشی تەفسیر بەشێکی سەربەخۆیە کە جەخت لە مانا قورئانییەکان دەکاتەوە و تێڕامان لە هۆکاری دابەزینی ئایەتەکان و لێکدانەوەکان بۆی قوڵ دەکاتەوە ',
    duration: 'بەپێی وەرز',
    schedule: 'بەپێی ماوەی گروپەکان',
    capacity: '100-80 خوێندکار',
    levels: ['تەفسیری جوزئە جیاوازەکان'],
    image: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=700&h=400&fit=crop&auto=format',
    features: [
      'خوێندنی پرۆگرامی تەفسیر',
      'تاقیکردنەوە لە وانە خوێندراوەکان',
      'قاڵبوونەوە لە مانا و تایبەتمەندییەکان',
    ],
  },
  {
    id: 'hifz',
    name: 'بەشی لەبەرکردن',
    arabic: 'الحفظ',
    description:
      'لەم بەشەوە خوێندکار دەستدەکات بە لەبەرکردنی قورئانی پیرۆز لە جوزئەکانی سەرەتای قورئان',
    duration: '5-2 ساڵ',
    schedule: 'بەپێی وەرزەکان',
    capacity: '150 خوێندکار',
    levels: ['سەرەتایی', '5 جوزئی', '15 جوزئی', '25 جوزئی', '30 جوزئی'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&h=400&fit=crop&auto=format',
    features: [
      'لەبەرکردنی سێ جوزئی کۆتایی قورئان',
      'لەبەرکردنی 5 جوزئی سەرەتا تاکو کۆتایی',
      'هەڵسەنگاندن و تاقیکردنەوە لە کۆتایی جوزئەکان',
      'پرۆگرامی تایبەتی ساڵانە بۆ لەبەرکردنی قورئانی پیرۆز',
    ],
  },
  {
    id: 'development',
    name: "بەشی گەشەپێدان",
    arabic: 'التنمیة',
    description:
      'بەشی گەشەپێدان جەخت دەکاتەوە لە برەودان بە توانا هزری و رەفتارییەکان لەڕێگەی بەگەڕخستنی چالاکی جۆراوجۆر بەمەبەستی تێکەڵکردنی پەروەردەیەکی تەندروست بە بنەما ئاینییەکان',
    duration: 'بەپێی وەرز',
    schedule: 'بەپێی پرۆگرامەکان',
    capacity: 'سنووردار',
    levels: ['هیچ ئاستێک دیاریکراو نیە'],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&h=400&fit=crop&auto=format',
    features: [
      'رێکخستنی وانە و سیمیناری تایبەت',
      'ئەنجامدانی چالاکی وەرزشی و تەرفیهی',
      'ئەنجامدانی چادرگە و چوونەدەرەوەی بەکۆمەڵ',
    ],
  },
  {
    id: 'online',
    name: 'خوێندنی ئۆنلاین',
    arabic: 'التعلم عن بُعد',
    description:
      'لە هەنگاوێکی ناوازەدا رێکخراوی اقرأ وەک رێکخراوێکی تایبەت بە زانستەکانی قورئانی پیرۆز دەرگای خوێندنی ئۆنلاینی واڵاکرد بۆ خوازیارانی زانستەکانی قورئانی پیرۆز لە وڵاتانی دەرەوە.',
    duration: '3-1 ساڵ',
    schedule: 'بەپێی پرۆگرامەکان',
    capacity: 'دیارینەکراو',
    levels: ['ئاستەکان دیارینەکراون'],
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=700&h=400&fit=crop&auto=format',
    features: [
      'خوێندنی ئاستە جیاوازەکان لە بەشی فێرکردن',
      'خوێندنی مۆڵەتەکانی قیرائات لەخزمەت مامۆستایەکی دیاریکراودا',
    ],
  },
];

export default function Departments() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-[var(--primary)] overflow-hidden">
        <div className="pattern-bg absolute inset-0 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-3">پرۆگرامەکان</p>
          <h1 className="font-display text-5xl font-bold text-white max-w-2xl leading-tight mb-5">
            بەشە ئەکادیمییەکان
          </h1>
          <p className="text-white/70 max-w-xl leading-relaxed">
           پێکهاتوون لە شەش بەشی تایبەتمەند بە زانستە جیاوازەکانی قورئانی پیرۆز
          </p>
        </div>
      </section>

      {/* Departments grid */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {DEPARTMENTS.map((dept, i) => (
            <div
              key={dept.id}
              id={dept.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>
              <div>
                <p className="text-[var(--accent)] font-display italic text-lg mb-1">{dept.arabic}</p>
                <h2 className="font-display text-3xl font-bold text-[var(--foreground)] mb-4">
                  {dept.name}
                </h2>
                <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
                  {dept.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'ماوەی تەواوکردن', value: dept.duration },
                    { label: 'خشتەی وانەخوێندن', value: dept.schedule },
                    { label: 'ژمارەی وەرگیراوان', value: dept.capacity },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[var(--secondary)] p-3">
                      <div className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider mb-1">
                        {label}
                      </div>
                      <div className="text-sm font-medium text-[var(--foreground)]">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <p className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                    ئاستەکان
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dept.levels.map(level => (
                      <span
                        key={level}
                        className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium border border-[var(--primary)]/20"
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2">
                  {dept.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                      <span className="text-[var(--accent)] mt-0.5">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
