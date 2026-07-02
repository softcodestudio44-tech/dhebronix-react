import { useState } from 'react'
import { useData } from '../context/DataContext'
import { createTeamMember, updateTeamMember, deleteTeamMember } from '../utils/api'
import { uploadToCloudinary } from '../utils/cloudinary'
import { Plus, Pencil, Trash2, X, Upload, Image as ImageIcon, Linkedin, Instagram } from 'lucide-react'
import Modal from '../components/Modal'

const TeamManager = () => {
  const { team, refreshData } = useData()
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    linkedin: '',
    instagram: '',
    bio: ''
  })
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const resetForm = () => {
    setFormData({ name: '', role: '', image: '', linkedin: '', instagram: '', bio: '' })
    setEditingItem(null)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name || '',
      role: item.role || '',
      image: item.image || '',
      linkedin: item.linkedin || '',
      instagram: item.instagram || '',
      bio: item.bio || ''
    })
    setShowForm(true)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadToCloudinary(file)
      setFormData(prev => ({ ...prev, image: url }))
    } catch (err) {
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (editingItem) {
        await updateTeamMember(editingItem.id, formData)
      } else {
        await createTeamMember(formData)
      }
      await refreshData()
      setShowForm(false)
      resetForm()
    } catch (err) {
      alert('Failed to save team member')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) return
    try {
      await deleteTeamMember(id)
      await refreshData()
    } catch (err) {
      alert('Failed to delete team member')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-orbitron text-2xl font-bold text-white">Team Manager</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary text-sm"
        >
          <Plus size={18} /> Add Member
        </button>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Member</th>
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Role</th>
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Social</th>
                <th className="text-right text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map(item => (
                <tr key={item.id} className="border-b border-dark-border hover:bg-dark/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-primary-light font-bold text-sm">{item.name?.charAt(0)}</span>
                        </div>
                      )}
                      <span className="text-white text-sm font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{item.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {item.linkedin && <Linkedin size={16} className="text-blue-400" />}
                      {item.instagram && <Instagram size={16} className="text-pink-400" />}
                    </div>
                  </td>
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
              {team.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-500">No team members yet. Add your first one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} maxWidth="max-w-lg">
        <div className="p-6">
          <h2 className="font-orbitron text-xl font-bold text-white mb-6">
            {editingItem ? 'Edit Team Member' : 'Add Team Member'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Role *</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  required
                  placeholder="e.g. Sound Engineer"
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Instagram</label>
                <input
                  type="url"
                  value={formData.instagram}
                  onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Photo</label>
              {formData.image && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden mb-3 group">
                  <img src={formData.image} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              )}
              <label className="flex items-center gap-2 px-4 py-2.5 bg-dark border border-dark-border border-dashed rounded-lg text-gray-400 text-sm cursor-pointer hover:border-primary transition-colors w-fit">
                <Upload size={16} />
                {uploading ? 'Uploading...' : 'Upload Photo'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
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
                {submitting ? 'Saving...' : editingItem ? 'Update' : 'Add Member'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default TeamManager