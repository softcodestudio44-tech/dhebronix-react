import { useState } from 'react'
import { useData } from '../context/DataContext'
import { createTestimonial, updateTestimonial, deleteTestimonial } from '../utils/api'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'
import Modal from '../components/Modal'

const TestimonialsManager = () => {
  const { testimonials, refreshData } = useData()
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    event: '',
    rating: 5,
    text: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const resetForm = () => {
    setFormData({ name: '', event: '', rating: 5, text: '' })
    setEditingItem(null)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name || '',
      event: item.event || '',
      rating: item.rating || 5,
      text: item.text || ''
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (editingItem) {
        await updateTestimonial(editingItem.id, formData)
      } else {
        await createTestimonial(formData)
      }
      await refreshData()
      setShowForm(false)
      resetForm()
    } catch (err) {
      alert('Failed to save testimonial')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    try {
      await deleteTestimonial(id)
      await refreshData()
    } catch (err) {
      alert('Failed to delete testimonial')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-orbitron text-2xl font-bold text-white">Testimonials Manager</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary text-sm"
        >
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Client</th>
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Event</th>
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Rating</th>
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Feedback</th>
                <th className="text-right text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map(item => (
                <tr key={item.id} className="border-b border-dark-border hover:bg-dark/50 transition-colors">
                  <td className="px-6 py-4 text-white text-sm font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{item.event}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm max-w-xs truncate">{item.text}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-8 h-8 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">No testimonials yet. Add your first one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} maxWidth="max-w-lg">
        <div className="p-6">
          <h2 className="font-orbitron text-xl font-bold text-white mb-6">
            {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Client Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Event *</label>
              <input
                type="text"
                value={formData.event}
                onChange={e => setFormData({ ...formData, event: e.target.value })}
                required
                placeholder="e.g. Wedding Reception, Corporate Event"
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1 transition-colors"
                  >
                    <Star size={24} className={star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Testimonial *</label>
              <textarea
                value={formData.text}
                onChange={e => setFormData({ ...formData, text: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary resize-none"
              />
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
                {submitting ? 'Saving...' : editingItem ? 'Update' : 'Add Testimonial'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default TestimonialsManager