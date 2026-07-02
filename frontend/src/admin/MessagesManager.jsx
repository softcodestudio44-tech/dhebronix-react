import { useEffect, useState } from 'react'
import { getMessages, deleteMessage } from '../utils/api'
import { Mail, Phone, Calendar, Trash2, MessageSquare, Clock } from 'lucide-react'

const MessagesManager = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    try {
      const res = await getMessages()
      setMessages(res.data)
    } catch (err) {
      console.error('Failed to fetch messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    try {
      await deleteMessage(id)
      fetchMessages()
    } catch (err) {
      alert('Failed to delete message')
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-orbitron text-2xl font-bold text-white">Contact Messages</h1>
        <span className="px-3 py-1 bg-primary/20 text-primary-light text-sm rounded-full">
          {messages.length} total
        </span>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-dark-card border border-dark-border rounded-xl p-6 animate-pulse h-32" />
          ))}
        </div>
      ) : messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <MessageSquare size={18} className="text-primary-light" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{msg.name}</h3>
                    <div className="flex items-center gap-3 text-gray-500 text-xs mt-0.5">
                      <span className="flex items-center gap-1"><Mail size={12} /> {msg.email}</span>
                      {msg.phone && <span className="flex items-center gap-1"><Phone size={12} /> {msg.phone}</span>}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="w-8 h-8 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mb-3">
                {msg.service && (
                  <span className="px-2 py-1 bg-primary/10 text-primary-light text-xs rounded-full">
                    {msg.service}
                  </span>
                )}
                {msg.event_date && (
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full flex items-center gap-1">
                    <Calendar size={10} /> {new Date(msg.event_date).toLocaleDateString()}
                  </span>
                )}
                <span className="px-2 py-1 bg-gray-500/10 text-gray-400 text-xs rounded-full flex items-center gap-1">
                  <Clock size={10} /> {formatDate(msg.created_at)}
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed bg-dark rounded-lg p-4">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-dark-card border border-dark-border rounded-xl">
          <MessageSquare size={48} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">No Messages Yet</h3>
          <p className="text-gray-500 text-sm">Contact form submissions will appear here.</p>
        </div>
      )}
    </div>
  )
}

export default MessagesManager