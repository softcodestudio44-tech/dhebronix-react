import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard,
  CalendarDays,
  Package,
  FileText,
  MessageSquare,
  Users,
  Star,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  Volume2
} from 'lucide-react'

const AdminLayout = ({ children }) => {
  const { isAdmin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    // Only redirect after we've checked auth (isAdmin is not null)
    if (!hasChecked && isAdmin !== null) {
      setHasChecked(true)
      if (!isAdmin) {
        navigate('/admin', { replace: true })
      }
    }
  }, [isAdmin, hasChecked, navigate])

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/events', label: 'Events', icon: CalendarDays },
    { path: '/admin/equipment', label: 'Equipment', icon: Package },
    { path: '/admin/blog', label: 'Blog Posts', icon: FileText },
    { path: '/admin/testimonials', label: 'Testimonials', icon: Star },
    { path: '/admin/team', label: 'Team', icon: Users },
    { path: '/admin/messages', label: 'Messages', icon: MessageSquare },
    { path: '/admin/gallery', label: 'Gallery', icon: Image },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  const isActive = (path) => location.pathname === path

  // Show loading while checking auth
  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Redirect handled by useEffect, but render nothing meanwhile
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-card border-r border-dark-border transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 flex items-center gap-3 px-6 border-b border-dark-border">
          <Volume2 size={24} className="text-primary-light" />
          <div>
            <span className="font-orbitron text-sm font-bold text-white">DHEBRONIX</span>
            <span className="block text-[8px] text-gray-500 tracking-[2px] uppercase">Admin Panel</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive(item.path) ? 'bg-primary text-white' : 'text-gray-400 hover:bg-dark hover:text-white'}`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-dark-card border-b border-dark-border flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-gray-400 hover:text-white p-2"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm hidden sm:block">Admin Dashboard</span>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout