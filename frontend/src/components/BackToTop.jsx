import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 z-50 w-11 h-11 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <ChevronUp size={20} />
    </button>
  )
}

export default BackToTop