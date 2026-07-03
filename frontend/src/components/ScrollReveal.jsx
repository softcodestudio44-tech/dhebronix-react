import { useRef, useEffect, useState } from 'react'

const ScrollReveal = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Fallback: always show after 2 seconds even if observer fails
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(fallbackTimer)
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { 
        threshold: 0.05,  // Lower threshold — trigger at 5% visibility
        rootMargin: '50px' // Start observing 50px before element enters viewport
      }
    )

    observer.observe(element)
    
    return () => {
      clearTimeout(fallbackTimer)
      observer.disconnect()
    }
  }, [delay])

  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(30px)'
      case 'down': return 'translateY(-30px)'
      case 'left': return 'translateX(30px)'
      case 'right': return 'translateX(-30px)'
      default: return 'translateY(30px)'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : getTransform(),
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal