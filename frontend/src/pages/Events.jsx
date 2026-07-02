import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import EventCard from '../components/EventCard'
import EventModal from '../components/EventModal'
import FilterButtons from '../components/FilterButtons'
import ScrollReveal from '../components/ScrollReveal'
import { useData } from '../context/DataContext'
import SEO from '../components/SEO'

const Events = () => {
  const { events, loading } = useData()
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedEvent, setSelectedEvent] = useState(null)

  const categories = [
    { value: 'concert', label: 'Concerts' },
    { value: 'wedding', label: 'Weddings' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'church', label: 'Church' },
    { value: 'outdoor', label: 'Outdoor' },
  ]

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(e => e.category?.toLowerCase() === activeFilter)

  return (
    <>
      <SEO title="Events & Setups" description="View our portfolio of events - concerts, weddings, corporate events, and more." />
      
      <PageHeader 
        title="Events & Setups" 
        breadcrumbs={[{ label: 'Home', link: '/' }, { label: 'Events & Setups' }]} 
      />

      <section className="section-padding bg-dark">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-primary-light text-sm font-medium tracking-wider uppercase">Portfolio</span>
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Our Events</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Browse through our portfolio of successful events. From intimate gatherings to large-scale concerts, 
                we bring the same level of professionalism and excellence.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <FilterButtons 
              categories={categories} 
              activeFilter={activeFilter} 
              onFilterChange={setActiveFilter} 
            />
          </ScrollReveal>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-dark-card border border-dark-border rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, i) => (
                <ScrollReveal key={event.id} delay={i * 100}>
                  <EventCard event={event} onClick={() => setSelectedEvent(event)} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              {activeFilter === 'all' ? 'No events available yet.' : `No ${activeFilter} events found.`}
            </div>
          )}
        </div>
      </section>

      <EventModal 
        isOpen={!!selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
        event={selectedEvent} 
      />
    </>
  )
}

export default Events