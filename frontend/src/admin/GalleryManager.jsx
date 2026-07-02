import { useState } from 'react'
import { useData } from '../context/DataContext'
import { uploadMultipleToCloudinary } from '../utils/cloudinary'
import { Upload, X, Image as ImageIcon, Trash2 } from 'lucide-react'

const GalleryManager = () => {
  const { events, equipment, refreshData } = useData()
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('events')

  const allImages = activeTab === 'events'
    ? events.flatMap(e => e.images || []).filter(Boolean)
    : equipment.flatMap(e => e.images || []).filter(Boolean)

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    setUploading(true)
    try {
      await uploadMultipleToCloudinary(files)
      alert('Images uploaded! Note: Images are attached to events/equipment items. Use those managers to associate images.')
    } catch (err) {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-orbitron text-2xl font-bold text-white">Gallery Manager</h1>
        <label className="btn-primary text-sm cursor-pointer">
          <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload Images'}
          <input type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['events', 'equipment'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-primary text-white' : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Images
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {allImages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allImages.map((img, i) => (
            <div key={i} className="group relative aspect-square rounded-xl overflow-hidden bg-dark-card border border-dark-border">
              <img src={img} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a href={img} target="_blank" rel="noopener noreferrer" className="text-white text-xs hover:text-primary-light transition-colors">
                  View Full
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-dark-card border border-dark-border rounded-xl">
          <ImageIcon size={48} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">No Images</h3>
          <p className="text-gray-500 text-sm">Images from {activeTab} will appear here.</p>
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <p className="text-yellow-400 text-sm">
          <strong>Note:</strong> To add images, use the Events Manager or Equipment Manager. 
          Upload images directly when creating or editing an item.
        </p>
      </div>
    </div>
  )
}

export default GalleryManager