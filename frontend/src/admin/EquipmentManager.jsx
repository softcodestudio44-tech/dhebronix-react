import { useState } from 'react'
import { useData } from '../context/DataContext'
import { createEquipment, updateEquipment, deleteEquipment, getEquipmentAll } from '../utils/api'
import { uploadMultipleToCloudinary } from '../utils/cloudinary'
import { Plus, Pencil, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react'
import Modal from '../components/Modal'

const EquipmentManager = () => {
  const { equipment, refreshData } = useData()
  const [allEquipment, setAllEquipment] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'speakers',
    price: '',
    oldPrice: '',
    condition: 'new',
    brand: '',
    specs: '',
    description: '',
    images: [],
    available: true
  })
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const categories = ['speakers', 'mixers', 'microphones', 'amplifiers', 'lighting', 'accessories']

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'speakers',
      price: '',
      oldPrice: '',
      condition: 'new',
      brand: '',
      specs: '',
      description: '',
      images: [],
      available: true
    })
    setEditingItem(null)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name || '',
      category: item.category || 'speakers',
      price: item.price || '',
      oldPrice: item.old_price || '',
      condition: item.condition || 'new',
      brand: item.brand || '',
      specs: item.specs || '',
      description: item.description || '',
      images: item.images || [],
      available: item.available !== false
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
      price: parseInt(formData.price) || 0,
      oldPrice: formData.oldPrice ? parseInt(formData.oldPrice) : null
    }

    try {
      if (editingItem) {
        await updateEquipment(editingItem.id, payload)
      } else {
        await createEquipment(payload)
      }
      await refreshData()
      setShowForm(false)
      resetForm()
    } catch (err) {
      alert('Failed to save equipment')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this equipment?')) return
    try {
      await deleteEquipment(id)
      await refreshData()
    } catch (err) {
      alert('Failed to delete equipment')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-orbitron text-2xl font-bold text-white">Equipment Manager</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary text-sm"
        >
          <Plus size={18} /> Add Equipment
        </button>
      </div>

      {/* Equipment Table */}
      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Product</th>
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Category</th>
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Price</th>
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-right text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map(item => (
                <tr key={item.id} className="border-b border-dark-border hover:bg-dark/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.images?.[0] ? (
                        <img src={item.images[0]} alt={item.name} className="w-10 h-10 rounded object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-dark rounded flex items-center justify-center">
                          <ImageIcon size={16} className="text-gray-600" />
                        </div>
                      )}
                      <div>
                        <div className="text-white text-sm font-medium">{item.name}</div>
                        <div className="text-gray-500 text-xs">{item.brand || 'No brand'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary/20 text-primary-light text-xs rounded-full capitalize">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white text-sm font-medium">
                    ₦{item.price?.toLocaleString()}
                    {item.old_price && (
                      <span className="text-gray-500 text-xs line-through ml-2">₦{item.old_price?.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${item.available !== false ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {item.available !== false ? 'Available' : 'Unavailable'}
                    </span>
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
              {equipment.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">No equipment yet. Add your first item!</td>
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
            {editingItem ? 'Edit Equipment' : 'Add New Equipment'}
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
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Price (₦) *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Old Price (₦)</label>
                <input
                  type="number"
                  value={formData.oldPrice}
                  onChange={e => setFormData({ ...formData, oldPrice: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Condition</label>
                <select
                  value={formData.condition}
                  onChange={e => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                >
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="refurbished">Refurbished</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Brand</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={e => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Specifications</label>
              <input
                type="text"
                value={formData.specs}
                onChange={e => setFormData({ ...formData, specs: e.target.value })}
                placeholder="e.g. 1000W, 15-inch woofer, Bluetooth"
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="available"
                checked={formData.available}
                onChange={e => setFormData({ ...formData, available: e.target.checked })}
                className="w-4 h-4 accent-primary rounded"
              />
              <label htmlFor="available" className="text-gray-400 text-sm">Available for sale</label>
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
                {submitting ? 'Saving...' : editingItem ? 'Update Equipment' : 'Add Equipment'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default EquipmentManager