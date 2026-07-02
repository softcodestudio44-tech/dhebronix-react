import { useState, useEffect } from 'react'
import { getSettings, updateSettings } from '../utils/api'
import { Save, Globe, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

const SettingsManager = () => {
  const [settings, setSettings] = useState(null)
  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    email: '',
    address: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings()
        const data = res.data
        setSettings(data)
        setFormData({
          companyName: data.company_name || '',
          phone: data.phone || '',
          email: data.email || '',
          address: data.address || '',
          whatsapp: data.whatsapp || '',
          facebook: data.facebook || '',
          instagram: data.instagram || '',
          youtube: data.youtube || '',
          twitter: data.twitter || ''
        })
      } catch (err) {
        console.error('Failed to fetch settings')
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setSaved(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateSettings(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-orbitron text-2xl font-bold text-white">Site Settings</h1>
        {saved && (
          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
            Saved successfully!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Info */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <h2 className="font-orbitron text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Globe size={20} className="text-primary-light" /> Company Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <h2 className="font-orbitron text-lg font-bold text-white mb-6 flex items-center gap-2">
            <MessageCircle size={20} className="text-primary-light" /> Social Media & Contact
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">WhatsApp Number</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="+2348037280457"
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Facebook URL</label>
              <input
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Instagram URL</label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">YouTube URL</label>
              <input
                type="url"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Twitter/X URL</label>
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <><Save size={18} /> Save Settings</>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SettingsManager