import Modal from './Modal'
import { Calendar, MapPin, Users, Mic2, MessageSquare } from 'lucide-react'

const EventModal = ({ isOpen, onClose, event }) => {
  if (!event) return null

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">
      <div className="relative h-64 md:h-80">
        <img 
          src={event.images?.[0] || 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800'} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-black/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full mb-3 inline-block">
            {event.category}
          </span>
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white">{event.title}</h2>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-dark border border-dark-border rounded-lg p-3 text-center">
            <Calendar size={18} className="text-primary-light mx-auto mb-1" />
            <div className="text-xs text-gray-500">Date</div>
            <div className="text-sm text-white font-medium">{formatDate(event.date)}</div>
          </div>
          <div className="bg-dark border border-dark-border rounded-lg p-3 text-center">
            <MapPin size={18} className="text-primary-light mx-auto mb-1" />
            <div className="text-xs text-gray-500">Venue</div>
            <div className="text-sm text-white font-medium">{event.venue || 'N/A'}</div>
          </div>
          <div className="bg-dark border border-dark-border rounded-lg p-3 text-center">
            <Users size={18} className="text-primary-light mx-auto mb-1" />
            <div className="text-xs text-gray-500">Guests</div>
            <div className="text-sm text-white font-medium">{event.guests || 'N/A'}</div>
          </div>
          <div className="bg-dark border border-dark-border rounded-lg p-3 text-center">
            <Mic2 size={18} className="text-primary-light mx-auto mb-1" />
            <div className="text-xs text-gray-500">Equipment</div>
            <div className="text-sm text-white font-medium">{event.equipment?.length || 0} items</div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-orbitron text-lg font-bold text-white mb-3">About This Event</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
        </div>

        {event.equipment && event.equipment.length > 0 && (
          <div className="mb-6">
            <h3 className="font-orbitron text-lg font-bold text-white mb-3">Equipment Used</h3>
            <div className="flex flex-wrap gap-2">
              {event.equipment.map((item, i) => (
                <span key={i} className="px-3 py-1.5 bg-primary/20 text-primary-light text-xs rounded-full border border-primary/30">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {event.testimonial && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={16} className="text-primary-light" />
              <span className="text-primary-light text-sm font-medium">Client Feedback</span>
            </div>
            <p className="text-gray-300 text-sm italic">"{event.testimonial}"</p>
          </div>
        )}

        {event.images && event.images.length > 1 && (
          <div>
            <h3 className="font-orbitron text-lg font-bold text-white mb-3">Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {event.images.slice(1).map((img, i) => (
                <img key={i} src={img} alt={`${event.title} ${i + 2}`} className="rounded-lg h-24 object-cover w-full" />
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default EventModal