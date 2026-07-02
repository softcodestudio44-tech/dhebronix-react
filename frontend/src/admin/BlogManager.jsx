import { useState } from 'react'
import { useData } from '../context/DataContext'
import { createBlogPost, updateBlogPost, deleteBlogPost } from '../utils/api'
import { uploadToCloudinary } from '../utils/cloudinary'
import { Plus, Pencil, Trash2, X, Upload, Image as ImageIcon, Eye, EyeOff } from 'lucide-react'
import Modal from '../components/Modal'

const BlogManager = () => {
  const { blogPosts, refreshData } = useData()
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Sound Engineering',
    author: 'DHEBRONIX Team',
    date: '',
    content: '',
    excerpt: '',
    tags: '',
    image: '',
    status: 'published'
  })
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const categories = ['Sound Engineering', 'Events', 'Equipment', 'Tips', 'Industry News']

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Sound Engineering',
      author: 'DHEBRONIX Team',
      date: '',
      content: '',
      excerpt: '',
      tags: '',
      image: '',
      status: 'published'
    })
    setEditingPost(null)
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData({
      title: post.title || '',
      category: post.category || 'Sound Engineering',
      author: post.author || 'DHEBRONIX Team',
      date: post.date ? post.date.split('T')[0] : '',
      content: post.content || '',
      excerpt: post.excerpt || '',
      tags: post.tags ? post.tags.join(', ') : '',
      image: post.image || '',
      status: post.status || 'published'
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

    const payload = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map(s => s.trim()).filter(Boolean) : []
    }

    try {
      if (editingPost) {
        await updateBlogPost(editingPost.id, payload)
      } else {
        await createBlogPost(payload)
      }
      await refreshData()
      setShowForm(false)
      resetForm()
    } catch (err) {
      alert('Failed to save blog post')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return
    try {
      await deleteBlogPost(id)
      await refreshData()
    } catch (err) {
      alert('Failed to delete blog post')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-orbitron text-2xl font-bold text-white">Blog Manager</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary text-sm"
        >
          <Plus size={18} /> New Post
        </button>
      </div>

      {/* Blog Table */}
      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Post</th>
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Category</th>
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Date</th>
                <th className="text-left text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-right text-gray-400 text-xs uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map(post => (
                <tr key={post.id} className="border-b border-dark-border hover:bg-dark/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="w-10 h-10 rounded object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-dark rounded flex items-center justify-center">
                          <ImageIcon size={16} className="text-gray-600" />
                        </div>
                      )}
                      <div>
                        <div className="text-white text-sm font-medium line-clamp-1">{post.title}</div>
                        <div className="text-gray-500 text-xs">By {post.author}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary/20 text-primary-light text-xs rounded-full">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {post.date ? new Date(post.date).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${post.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {post.status || 'published'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="w-8 h-8 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogPosts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">No blog posts yet. Write your first article!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} maxWidth="max-w-3xl">
        <div className="p-6">
          <h2 className="font-orbitron text-xl font-bold text-white mb-6">
            {editingPost ? 'Edit Blog Post' : 'New Blog Post'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={e => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Excerpt</label>
              <input
                type="text"
                value={formData.excerpt}
                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Short summary of the post"
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Content *</label>
              <textarea
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                required
                rows={8}
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary resize-none"
                placeholder="Write your blog post content here..."
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                placeholder="sound, events, tips"
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Featured Image</label>
              {formData.image && (
                <div className="relative w-32 h-20 rounded-lg overflow-hidden mb-3 group">
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
                {uploading ? 'Uploading...' : 'Upload Featured Image'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={formData.status === 'published'}
                onChange={e => setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })}
                className="w-4 h-4 accent-primary rounded"
              />
              <label htmlFor="published" className="text-gray-400 text-sm">Publish immediately</label>
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
                {submitting ? 'Saving...' : editingPost ? 'Update Post' : 'Publish Post'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default BlogManager