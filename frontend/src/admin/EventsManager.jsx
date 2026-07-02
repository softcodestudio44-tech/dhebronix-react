import { useState } from 'react'
import { useData } from '../context/DataContext'
import { createEvent, updateEvent, deleteEvent } from '../utils/api'
import { uploadMultipleToCloudinary } from '../utils/cloudinary'
import { Plus, Pencil, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react'
import Modal from '../components/Modal'

const EventsManager = () => {
  const { events, refreshData } = useData()
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'concert',
    date: '',
    venue: '',
    guests: '',
    equipment: '',
    description: '',
    testimonial: '',
    images: []
  })
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const categories = ['concert', 'wedding', 'corporate', 'church', 'outdoor', 'other']

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'concert',
      date: '',
      venue: '',
      guests: '',
      equipment: '',
      description: '',
      testimonial: '',
      images: []
    })
    setEditingEvent(null)
  }

  const handleEdit = (event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title || '',
      category: event.category || 'concert',
      date: event.date ? event.date.split('T')[0] : '',
      venue: event.venue || '',
      guests: event.guests || '',
      equipment: event.equipment ? event.equipment.join(', ') : '',
      description: event.description || '',
      testimonial: event.testimonial || '',
      images: event.images || []
    })
    setShowForm(true)
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    setUploading(true)
    try {
      const urls = await uploadMultipleToCloudinary(files)
      setFormData(prev => ({ ...prev, images: [...prev.images, ...urls] }))
    } catch (err) {
      alert('Failed to upload images')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const payload = {
      ...formData,
      equipment: formData.equipment ? formData.equipment.split(',').map(s => s.trim()).filter(Boolean) : []
    }

    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, payload)
      } else {
        await createEvent(payload)
      }
      await refreshData()
      setShowForm(false)
      resetForm()
    } catch (err) {
      alert('Failed to save event')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return
    try {
      await deleteEvent(id)
      await refreshData()
    } catch (err) {
      alert('Failed to delete event')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-orbitron text-2xl font-bold text-white">Events Manager</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary text-sm"
        >
          <Plus size={18} /> Add Event
        </button>
      </div>

      {/* Events Table */}
      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Event</th>
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Category</th>
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Date</th>
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Venue</th>
                <th className="text-right text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id} className="border-b border-dark-border hover:bg-dark/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {event.images?.[0] ? (
                        <img src={event.images[0]} alt={event.title} className="w-10 h-10 rounded object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-dark rounded flex items-center justify-center">
                          <ImageIcon size={16} className="text-gray-600" />
                        </div>
                      )}
                      <span className="text-white text-sm font-medium">{event.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary/20 text-primary-light text-xs rounded-full capitalize">
                      {event.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {event.date ? new Date(event.date).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{event.venue || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="w-8 h-8 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">No events yet. Add your first event!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} maxWidth="max-w-2xl">
        <div className="p-6">
          <h2 className="font-orbitron text-xl font-bold text-white mb-6">
            {editingEvent ? 'Edit Event' : 'Add New Event'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Venue</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={e => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Guests</label>
                <input
                  type="text"
                  value={formData.guests}
                  onChange={e => setFormData({ ...formData, guests: e.target.value })}
                  placeholder="e.g. 500+"
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Equipment Used</label>
                <input
                  type="text"
                  value={formData.equipment}
                  onChange={e => setFormData({ ...formData, equipment: e.target.value })}
                  placeholder="Comma separated list"
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Testimonial</label>
              <textarea
                value={formData.testimonial}
                onChange={e => setFormData({ ...formData, testimonial: e.target.value })}
                rows={2}
                placeholder="Client feedback about this event"
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Images</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.images.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
              <label className="flex items-center gap-2 px-4 py-2.5 bg-dark border border-dark-border border-dashed rounded-lg text-gray-400 text-sm cursor-pointer hover:border-primary transition-colors">
                <Upload size={16} />
                {uploading ? 'Uploading...' : 'Upload Images'}
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2.5 border border-dark-border rounded-lg text-gray-400 text-sm hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 btn-primary justify-center text-sm disabled:opacity-50"
              >
                {submitting ? 'Saving...' : editingEvent ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default EventsManager