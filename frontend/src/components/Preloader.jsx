import { useState, useEffect } from 'react'
import { Volume2 } from 'lucide-react'

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setFadeOut(true)
            setTimeout(onComplete, 500)
          }, 300)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-4 border-dark-border flex items-center justify-center">
          <Volume2 size={40} className="text-primary-light animate-pulse-slow" />
        </div>
        <div 
          className="absolute inset-0 rounded-full border-4 border-primary-light border-t-transparent animate-spin"
          style={{ animationDuration: '1s' }}
        />
      </div>
      
      <h2 className="font-orbitron text-2xl font-bold text-white mb-2 tracking-wider">DHEBRONIX</h2>
      <p className="text-gray-500 text-xs uppercase tracking-[4px] mb-8">Multimedia Company</p>
      
      <div className="w-64 h-1 bg-dark-border rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-150"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      
      <p className="text-gray-500 text-xs mt-4">{Math.min(Math.round(progress), 100)}%</p>
    </div>
  )
}

export default Preloader