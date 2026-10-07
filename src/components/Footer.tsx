import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-[var(--primary)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/uploads/IOQLogo.PNG"
                alt="Quran Institute"
                className="w-80 h-20 object-contain"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              رێکخراوی اقرأ، رێکخراوێکی تایبەت بە خزمەتکردن لە بوارەکانی زانستەکانی قورئانی پیرۆز، کە وەک رێکخراوێکی فەرمی مۆڵەتی وەرگرتووە لە ساڵی 1996.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold tracking-wide mb-4 text-[var(--accent)]">پەڕەکان</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'سەرەکی' },
                { to: '/about', label: 'دەربارە' },
                { to: '/departments', label: 'بەشەکان' },
                { to: '/news', label: 'هەواڵ ' },
                { to: '/blogs', label: 'بابەت' },
                { to: '/contact', label: 'پەیوەندی' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm tracking-wide mb-4 text-[var(--accent)]">پەیوەندیکردن</h4>
            <address className="not-italic space-y-2 text-sm text-white/60">
              <p>نووسینگەی سەرەکی</p>
              <p>شەقامی ئیبراهیم أحمد - نزیک مزگەوتی فجر</p>
              <p className="mt-3">
                <a href="tel:+9647701234567" className="hover:text-white transition-colors">
                 4567 123 770 964 +
                </a>
              </p>
              <p>
                <a href="mailto:info@quraninstitute.org" className="hover:text-white transition-colors">
                  info@quraninstitute.org
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p> {new Date().getFullYear()} © Iqraa Organization all rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
