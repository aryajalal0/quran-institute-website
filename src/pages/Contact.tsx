import { useState } from 'react';

const FAQS = [
  {
    q: 'لە چ تەمەنێک دەتوانرێت دەستبکرێت بە لەبەرکردنی قورئانی پیرۆز؟',
    a: 'لەتەمەنی منداڵییەوە 7ساڵی دەتوانرێت دەستبکرێت بە لەبەرکردنی قورئانی پیرۆز',
  },
  {
    q: 'شێوازی بەشداریکردن چۆنە لە پرۆگرامەکانی تەفسیر',
    a: 'خوێندکاران لە پش بەشداریکردن بە یەکێک لە بەشە سەرەکییەکان دەتوانن سوودمەند بن لە پرۆگرامەکانی تەجوید',
  },
  {
    q: 'چۆن دەتوانم سوودمەند بم لە خوێندنی ئۆنلاین؟',
    a: 'خوێندکاران لە وڵاتانی دەرەوە دەتوانن سوودمەند بن لە خوێندنی وانەکان بە شێوازی ئۆنلاین',
  },

];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-[var(--primary)] overflow-hidden">
        <div className="pattern-bg absolute inset-0 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-3">بگە بە ئێمە</p>
          <h1 className="font-display text-5xl font-bold text-white mb-5">پەیوەندیکردن</h1>
          <p className="text-white/70 max-w-xl leading-relaxed">
            دەربارەی پرۆگرامەکان، شێوازی وانەخوێندن، یاخود هەر بابەتێکی تر، بەخۆشحاڵییەوە پەیوەندیمان پێوە بکە
          </p>
        </div>
      </section>

      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[var(--foreground)] mb-8">سەردان یان پەیوەندیمان پێوە بکە</h2>
            <div className="space-y-6">
              {[
                {
                  icon: '📍',
                  label: 'نووسینگەی سەرەکی',
                  content: 'سلێمانی - ئیبراهیم أحمد - خوار مزگەوتی فەجر',
                },
                {
                  icon: '📞',
                  label: 'ژمارەی تەلەفۆن',
                  content: '07701234567 \n 07707654321',
                },
                {
                  icon: '✉️',
                  label: 'ئیمەیڵ',
                  content: 'info@iqraaquran.org',
                },
                {
                  icon: '🕐',
                  label: 'کاتی دەوامکردن',
                  content: 'شەممە – هەینی\n 5:00PM– 8:00AM'
                },
              ].map(({ icon, label, content }) => (
                <div key={label} className="flex gap-4">
                  <div className="text-xl mt-0.5">{icon}</div>
                  <div>
                    <p className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-[var(--foreground)] text-sm leading-relaxed whitespace-pre-line">{content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-[var(--secondary)] border border-[var(--border)]">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="font-display text-2xl font-bold text-[var(--foreground)] mb-2">
                  Message Received
                </h3>
                <p className="text-[var(--muted-foreground)] max-w-sm">
                  Thank you for reaching out. We will respond to your message within 1–2 business days.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="mt-8 px-6 py-2.5 bg-[var(--primary)] text-white text-sm font-medium rounded-sm hover:bg-[var(--primary)]/90 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { field: 'name', label: 'ناوی تەواوەتی', type: 'text', required: true },
                    { field: 'email', label: 'ئیمەیڵ', type: 'email', required: false },
                    { field: 'phone', label: 'ژمارەی مۆبایل', type: 'tel', required: true },
                    { field: 'subject', label: 'بابەت', type: 'text', required: true },
                  ].map(({ field, label, type, required }) => (
                    <div key={field}>
                      <label className="block text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">
                        {label} {required && <span className="text-[var(--accent)]">*</span>}
                      </label>
                      <input
                        type={type}
                        required={required}
                        value={(form as Record<string, string>)[field]}
                        onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] text-sm transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider mb-1.5">
                    نامە <span className="text-[var(--accent)]">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] text-sm resize-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[var(--primary)] text-white font-semibold text-sm rounded-sm hover:bg-[var(--primary)]/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--secondary)]">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[var(--accent)] font-mono text-xs tracking-widest uppercase mb-3 text-center">FAQ</p>
          <h2 className="font-display text-3xl font-bold text-[var(--foreground)] mb-10 text-center">
            پرسیارە باوەکان
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-[var(--border)] bg-[var(--card)]">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-display font-semibold text-[var(--foreground)]">{faq.q}</span>
                  <span className="text-[var(--primary)] text-xl ml-4">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-[var(--muted-foreground)] text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
