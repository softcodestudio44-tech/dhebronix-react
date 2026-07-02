import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const useScrollAnimation = (options = {}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    ...options
  })

  return { ref, inView }
}

export const useFadeInUp = (delay = 0) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    if (inView && ref.current) {
      ref.current.style.animationDelay = `${delay}ms`
    }
  }, [inView, delay, ref])

  return { ref, inView }
}