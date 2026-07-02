import { Link } from 'react-router-dom'
import { Volume2, ArrowLeft, Home } from 'lucide-react'
import SEO from '../components/SEO'

const NotFound = () => {
  return (
    <>
      <SEO title="404 - Page Not Found" description="The page you are looking for does not exist. Return to DHEBRONIX Multimedia Company homepage." />
      
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div className="text-center">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <h1 className="font-orbitron text-8xl md:text-9xl font-bold text-gradient opacity-20">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Volume2 size={64} className="text-primary-light animate-pulse" />
            </div>
          </div>
          
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-4">
            Signal Lost
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            The frequency you're tuned into doesn't exist. The page may have been moved or deleted.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-primary">
              <Home size={18} /> Back to Home
            </Link>
            <button onClick={() => window.history.back()} className="btn-outline">
              <ArrowLeft size={18} /> Go Back
            </button>
          </div>
          
          {/* Sound wave decoration */}
          <div className="flex items-end justify-center gap-1 mt-12 h-16">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary/30 rounded-full animate-pulse"
                style={{
                  height: `${20 + Math.random() * 40}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.5 + Math.random() * 1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound