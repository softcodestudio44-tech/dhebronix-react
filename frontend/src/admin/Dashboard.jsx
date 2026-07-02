import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import {
  CalendarDays,
  Package,
  FileText,
  MessageSquare,
  Users,
  Star,
  TrendingUp,
  Eye
} from 'lucide-react'

const Dashboard = () => {
  const { events, equipment, blogPosts, testimonials, team, refreshData } = useData()
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalEquipment: 0,
    totalBlog: 0,
    totalTestimonials: 0,
    totalTeam: 0,
    totalMessages: 0
  })

  useEffect(() => {
    refreshData()
  }, [refreshData])

  useEffect(() => {
    setStats({
      totalEvents: events.length,
      totalEquipment: equipment.length,
      totalBlog: blogPosts.length,
      totalTestimonials: testimonials.length,
      totalTeam: team.length,
      totalMessages: 0
    })
  }, [events, equipment, blogPosts, testimonials, team])

  const statCards = [
    { label: 'Total Events', value: stats.totalEvents, icon: CalendarDays, color: 'bg-blue-500/20 text-blue-400', link: '/admin/events' },
    { label: 'Equipment', value: stats.totalEquipment, icon: Package, color: 'bg-green-500/20 text-green-400', link: '/admin/equipment' },
    { label: 'Blog Posts', value: stats.totalBlog, icon: FileText, color: 'bg-purple-500/20 text-purple-400', link: '/admin/blog' },
    { label: 'Testimonials', value: stats.totalTestimonials, icon: Star, color: 'bg-yellow-500/20 text-yellow-400', link: '/admin/testimonials' },
    { label: 'Team Members', value: stats.totalTeam, icon: Users, color: 'bg-pink-500/20 text-pink-400', link: '/admin/team' },
    { label: 'Messages', value: stats.totalMessages, icon: MessageSquare, color: 'bg-orange-500/20 text-orange-400', link: '/admin/messages' },
  ]

  const quickActions = [
    { label: 'Add New Event', link: '/admin/events', desc: 'Create a new event entry' },
    { label: 'Add Equipment', link: '/admin/equipment', desc: 'Add new equipment for sale' },
    { label: 'Write Blog Post', link: '/admin/blog', desc: 'Publish a new article' },
    { label: 'View Messages', link: '/admin/messages', desc: 'Check contact form submissions' },
  ]

  return (
    <div>
      <h1 className="font-orbitron text-2xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <Link
            key={i}
            to={stat.link}
            className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-primary/50 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <TrendingUp size={18} className="text-gray-600 group-hover:text-primary-light transition-colors" />
            </div>
            <div className="font-orbitron text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h2 className="font-orbitron text-lg font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              to={action.link}
              className="flex items-center gap-4 p-4 bg-dark rounded-lg border border-dark-border hover:border-primary/50 transition-all group"
            >
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                <Eye size={20} className="text-primary-light" />
              </div>
              <div>
                <div className="text-white font-medium text-sm group-hover:text-primary-light transition-colors">{action.label}</div>
                <div className="text-gray-500 text-xs">{action.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard