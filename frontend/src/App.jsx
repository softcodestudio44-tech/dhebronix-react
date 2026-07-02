import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import BackToTop from './components/BackToTop'
import NotFound from './pages/NotFound'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Equipment from './pages/Equipment'
import Blog from './pages/Blog'
import BlogSingle from './pages/BlogSingle'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

// Admin
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import EventsManager from './admin/EventsManager'
import EquipmentManager from './admin/EquipmentManager'
import BlogManager from './admin/BlogManager'
import TestimonialsManager from './admin/TestimonialsManager'
import TeamManager from './admin/TeamManager'
import MessagesManager from './admin/MessagesManager'
import GalleryManager from './admin/GalleryManager'
import SettingsManager from './admin/SettingsManager'

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <WhatsAppFloat />
    <BackToTop />
  </>
)

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ScrollToTop />
        <Routes>
          {/* Main Site */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/events" element={<MainLayout><Events /></MainLayout>} />
          <Route path="/equipment" element={<MainLayout><Equipment /></MainLayout>} />
          <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
          <Route path="/blog/:id" element={<MainLayout><BlogSingle /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />
          <Route path="/terms-of-service" element={<MainLayout><TermsOfService /></MainLayout>} />
          <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />

          {/* Admin Login - standalone, no layout */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Dashboard - protected routes */}
          <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/events" element={<AdminLayout><EventsManager /></AdminLayout>} />
          <Route path="/admin/equipment" element={<AdminLayout><EquipmentManager /></AdminLayout>} />
          <Route path="/admin/blog" element={<AdminLayout><BlogManager /></AdminLayout>} />
          <Route path="/admin/testimonials" element={<AdminLayout><TestimonialsManager /></AdminLayout>} />
          <Route path="/admin/team" element={<AdminLayout><TeamManager /></AdminLayout>} />
          <Route path="/admin/messages" element={<AdminLayout><MessagesManager /></AdminLayout>} />
          <Route path="/admin/gallery" element={<AdminLayout><GalleryManager /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><SettingsManager /></AdminLayout>} />

          {/* Redirect unknown admin routes */}
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </DataProvider>
    </AuthProvider>
  )
}

export default App