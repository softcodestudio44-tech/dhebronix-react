import { Calendar, MapPin } from 'lucide-react'

const EventCard = ({ event, onClick }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <div 
      onClick={onClick}
      className="group bg-dark-card border border-dark-border rounded-xl overflow-hidden cursor-pointer card-hover"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={event.images?.[0] || 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600'} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
            {event.category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-orbitron text-lg font-bold text-white mb-1">{event.title}</h3>
          <div className="flex items-center gap-4 text-gray-300 text-xs">
            <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(event.date)}</span>
            <span className="flex items-center gap-1"><MapPin size={14} /> {event.venue}</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-400 text-sm line-clamp-2 mb-3">{event.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary-light text-sm font-medium">View Details</span>
          <span className="text-gray-500 text-xs">{event.guests || '0'} guests</span>
        </div>
      </div>
    </div>
  )
}

export default EventCard