import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:10000'

// Module-level state — survives React StrictMode, HMR, and all remounts
let globalHasFetched = false
let globalFetchPromise = null

// localStorage cache helpers
const getCache = () => {
  try {
    const cached = localStorage.getItem('dhebronix_cache')
    if (cached) {
      const parsed = JSON.parse(cached)
      if (Date.now() - parsed.timestamp < 10 * 60 * 1000) return parsed
    }
  } catch (e) { /* ignore */ }
  return null
}

const saveCache = (data) => {
  try {
    localStorage.setItem('dhebronix_cache', JSON.stringify({ ...data, timestamp: Date.now() }))
  } catch (e) { /* ignore */ }
}

export const DataProvider = ({ children }) => {
  const cached = getCache()
  
  const [events, setEvents] = useState(cached?.events || [])
  const [equipment, setEquipment] = useState(cached?.equipment || [])
  const [blogPosts, setBlogPosts] = useState(cached?.blogPosts || [])
  const [testimonials, setTestimonials] = useState(cached?.testimonials || [])
  const [team, setTeam] = useState(cached?.team || [])
  const [settings, setSettings] = useState(cached?.settings || null)
  const [loading, setLoading] = useState(!cached)
  const [error, setError] = useState(null)

  useEffect(() => {
    // If already fetched globally, use cache and stop
    if (globalHasFetched) {
      if (cached) {
        setEvents(cached.events || [])
        setEquipment(cached.equipment || [])
        setBlogPosts(cached.blogPosts || [])
        setTestimonials(cached.testimonials || [])
        setTeam(cached.team || [])
        setSettings(cached.settings || null)
      }
      setLoading(false)
      return
    }

    // If fetch is already in progress, wait for it
    if (globalFetchPromise) {
      globalFetchPromise.then(() => setLoading(false))
      return
    }

    // Start fetching
    globalFetchPromise = (async () => {
      if (cached) {
        setEvents(cached.events || [])
        setEquipment(cached.equipment || [])
        setBlogPosts(cached.blogPosts || [])
        setTestimonials(cached.testimonials || [])
        setTeam(cached.team || [])
        setSettings(cached.settings || null)
        setLoading(false)
        globalHasFetched = true
        return
      }

      try {
        setLoading(true)

        // Sequential requests with 1.5s delay to avoid 429
        const delay = (ms) => new Promise(r => setTimeout(r, ms))

        const eventsRes = await axios.get(`${apiUrl}/api/events`, { timeout: 10000 }).catch(() => ({ data: [] }))
        await delay(1500)
        
        const equipRes = await axios.get(`${apiUrl}/api/equipment`, { timeout: 10000 }).catch(() => ({ data: [] }))
        await delay(1500)
        
        const blogRes = await axios.get(`${apiUrl}/api/blog`, { timeout: 10000 }).catch(() => ({ data: [] }))
        await delay(1500)
        
        const testRes = await axios.get(`${apiUrl}/api/testimonials`, { timeout: 10000 }).catch(() => ({ data: [] }))
        await delay(1500)
        
        const teamRes = await axios.get(`${apiUrl}/api/team`, { timeout: 10000 }).catch(() => ({ data: [] }))
        await delay(1500)
        
        const settingsRes = await axios.get(`${apiUrl}/api/settings`, { timeout: 10000 }).catch(() => ({ data: null }))

        const data = {
          events: eventsRes.data || [],
          equipment: equipRes.data || [],
          blogPosts: blogRes.data || [],
          testimonials: testRes.data || [],
          team: teamRes.data || [],
          settings: settingsRes.data || null
        }

        saveCache(data)

        setEvents(data.events)
        setEquipment(data.equipment)
        setBlogPosts(data.blogPosts)
        setTestimonials(data.testimonials)
        setTeam(data.team)
        setSettings(data.settings)
        setError(null)
      } catch (err) {
        setError('Failed to load data')
        console.error('Data fetch error:', err)
      } finally {
        setLoading(false)
        globalHasFetched = true
      }
    })()

  }, []) // Empty array — effect logic is guarded by module-level variables

  const refreshData = () => {
    globalHasFetched = false
    globalFetchPromise = null
    localStorage.removeItem('dhebronix_cache')
    window.location.reload()
  }

  return (
    <DataContext.Provider value={{
      events, equipment, blogPosts, testimonials, team, settings,
      loading, error, refreshData
    }}>
      {children}
    </DataContext.Provider>
  )
}