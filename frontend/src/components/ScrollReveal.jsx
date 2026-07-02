import { useRef, useEffect, useState } from 'react'

const ScrollReveal = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(40px)'
      case 'down': return 'translateY(-40px)'
      case 'left': return 'translateX(40px)'
      case 'right': return 'translateX(-40px)'
      default: return 'translateY(40px)'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : getTransform(),
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal