import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Volume2, Lock, Eye, EyeOff } from 'lucide-react'

const AdminLogin = () => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [isAdmin, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Volume2 size={40} className="text-primary-light" />
          </div>
          <h1 className="font-orbitron text-2xl font-bold text-white">DHEBRONIX</h1>
          <p className="text-gray-500 text-sm">Admin Dashboard</p>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-xl p-8">
          <h2 className="font-orbitron text-lg font-bold text-white mb-6 text-center">Admin Access</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          <a href="/" className="hover:text-primary-light transition-colors">← Back to Website</a>
        </p>
      </div>
    </div>
  )
}

export default AdminLogin