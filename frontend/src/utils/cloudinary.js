import axios from 'axios'

export const uploadToCloudinary = async (file) => {
  const formData = new FormData()
  formData.append('image', file)
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:10000'
  
  const res = await axios.post(`${apiUrl}/api/upload/image`, formData, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('dhebronix_admin_token')}`
    }
  })
  
  return res.data.url
}

export const uploadMultipleToCloudinary = async (files) => {
  const formData = new FormData()
  files.forEach(file => formData.append('images', file))
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:10000'
  
  const res = await axios.post(`${apiUrl}/api/upload/multiple`, formData, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('dhebronix_admin_token')}`
    }
  })
  
  return res.data.images.map(img => img.url)
}