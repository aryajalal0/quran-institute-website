import { createBrowserRouter, Outlet } from 'react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Departments from './pages/Departments';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function AdminLayout() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: PublicLayout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'departments', Component: Departments },
      { path: 'news', Component: News },
      { path: 'news/:id', Component: NewsDetail },
      { path: 'blogs', Component: Blogs },
      { path: 'blogs/:id', Component: BlogDetail },
      { path: 'contact', Component: Contact },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'login', Component: AdminLogin },
    ],
  },
]);
