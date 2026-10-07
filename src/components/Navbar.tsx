import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import { getAuth, clearAuth } from '../store/authStore';

const NAV_LINKS = [
  { to: '/', label: 'سەرەکی' },
  { to: '/about', label: 'دەربارە' },
  { to: '/departments', label: 'بەشەکان' },
  { to: '/news', label: 'هەواڵ' },
  { to: '/blogs', label: 'بابەتەکان' },
  { to: '/contact', label: 'پەیوەندی' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [auth, setAuth] = useState<Awaited<ReturnType<typeof getAuth>> | null>(null);
  const location = useLocation();

  useEffect(() => { getAuth().then(setAuth); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isAdminArea = location.pathname.startsWith('/admin');

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen || isAdminArea
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/uploads/IOQIcon.svg"
              alt="Quran Institute"
              className="w-30 h-15 object-contain"
            />
          </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium transition-colors rounded-sm ${
                  isActive
                    ? 'text-[var(--primary)] bg-[var(--secondary)]'
                    : 'text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--secondary)]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-3">
          {auth?.isAuthenticated ? (
            <>
              <Link
                to="/admin"
                className="text-sm font-medium text-[var(--primary)] hover:underline"
              >
                Dashboard
              </Link>
              <button
                onClick={async () => { await clearAuth(); window.location.href = '/'; }}
                className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              className="text-sm font-medium px-4 py-2 bg-[var(--primary)] text-white rounded-sm hover:bg-[var(--primary)]/90 transition-colors"
            >
              Admin Login
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-[var(--foreground)]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-0.5 bg-current transition-all mb-1 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all mb-1 ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[var(--border)] bg-white px-6 py-4 space-y-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `block px-3 py-2.5 text-sm font-medium rounded-sm transition-colors ${
                  isActive
                    ? 'text-[var(--primary)] bg-[var(--secondary)]'
                    : 'text-[var(--foreground)] hover:text-[var(--primary)]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-[var(--border)]">
            {auth?.isAuthenticated ? (
              <>
                <Link to="/admin" className="block px-3 py-2.5 text-sm font-medium text-[var(--primary)]">
                  Dashboard
                </Link>
                <button
                  onClick={async () => { await clearAuth(); window.location.href = '/'; }}
                  className="block w-full text-left px-3 py-2.5 text-sm text-[var(--muted-foreground)]"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                className="block px-3 py-2.5 text-sm font-medium text-[var(--primary)]"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
