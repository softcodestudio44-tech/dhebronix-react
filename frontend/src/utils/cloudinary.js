import axios from 'axios'
import api from './api.js'

export const uploadToCloudinary = async (file) => {
  const formData = new FormData()
  formData.append('image', file)
  
  try {
    const res = await api.post('/api/upload/image', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data.url
  } catch (err) {
    console.error('Upload error:', err.response?.data || err.message)
    throw new Error(err.response?.data?.error || 'Upload failed')
  }
}

export const uploadMultipleToCloudinary = async (files) => {
  const formData = new FormData()
  files.forEach(file => formData.append('images', file))
  
  try {
    const res = await api.post('/api/upload/multiple', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data.images.map(img => img.url)
  } catch (err) {
    console.error('Multiple upload error:', err.response?.data || err.message)
    throw new Error(err.response?.data?.error || 'Upload failed')
  }
}