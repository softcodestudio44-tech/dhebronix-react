import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('dhebronix_admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

export const getEvents = () => api.get('/api/events')
export const getEvent = (id) => api.get(`/api/events/${id}`)
export const createEvent = (data) => api.post('/api/events', data)
export const updateEvent = (id, data) => api.put(`/api/events/${id}`, data)
export const deleteEvent = (id) => api.delete(`/api/events/${id}`)

export const getEquipment = () => api.get('/api/equipment')
export const getEquipmentAll = () => api.get('/api/equipment/all')
export const createEquipment = (data) => api.post('/api/equipment', data)
export const updateEquipment = (id, data) => api.put(`/api/equipment/${id}`, data)
export const deleteEquipment = (id) => api.delete(`/api/equipment/${id}`)

export const getBlogPosts = () => api.get('/api/blog')
export const getBlogPost = (id) => api.get(`/api/blog/${id}`)
export const createBlogPost = (data) => api.post('/api/blog', data)
export const updateBlogPost = (id, data) => api.put(`/api/blog/${id}`, data)
export const deleteBlogPost = (id) => api.delete(`/api/blog/${id}`)

export const getTestimonials = () => api.get('/api/testimonials')
export const createTestimonial = (data) => api.post('/api/testimonials', data)
export const updateTestimonial = (id, data) => api.put(`/api/testimonials/${id}`, data)
export const deleteTestimonial = (id) => api.delete(`/api/testimonials/${id}`)

export const getTeam = () => api.get('/api/team')
export const createTeamMember = (data) => api.post('/api/team', data)
export const updateTeamMember = (id, data) => api.put(`/api/team/${id}`, data)
export const deleteTeamMember = (id) => api.delete(`/api/team/${id}`)

export const getMessages = () => api.get('/api/messages')
export const deleteMessage = (id) => api.delete(`/api/messages/${id}`)
export const sendMessage = (data) => api.post('/api/messages', data)

export const getSettings = () => api.get('/api/settings')
export const updateSettings = (data) => api.put('/api/settings', data)

export const uploadImage = (file) => {
  const formData = new FormData()
  formData.append('image', file)
  return api.post('/api/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}