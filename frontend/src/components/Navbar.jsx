import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/events', label: 'Events & Setups' },
    { path: '/equipment', label: 'Equipment' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-xl py-2 shadow-lg shadow-primary/10' : 'bg-transparent py-3 md:py-4'}`}>
        <div className="container-custom flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <img src="/images/logo.png" alt="DHEBRONIX" className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 object-contain" />
            <div className="flex flex-col">
              <span className="font-orbitron text-sm md:text-base lg:text-lg font-bold text-primary-light tracking-wider">DHEBRONIX</span>
              <span className="text-[6px] md:text-[7px] lg:text-[8px] text-gray-400 tracking-[2px] md:tracking-[3px] uppercase">Multimedia Company</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path} className={`text-sm font-medium transition-colors duration-300 relative py-1 ${isActive(link.path) ? 'text-primary-light' : 'text-gray-300 hover:text-primary-light'}`}>
                  {link.label}
                  {isActive(link.path) && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary-light" />}
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/contact" className="hidden lg:inline-flex btn-primary text-sm">
            Get Quote
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black z-[200] transition-all duration-300 flex flex-col ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border">
          <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <img src="/images/logo.png" alt="DHEBRONIX" className="h-8 w-8 object-contain" />
            <span className="font-orbitron text-sm font-bold text-primary-light">DHEBRONIX</span>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="text-white p-2">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setMenuOpen(false)}
              className={`text-2xl font-orbitron ${isActive(link.path) ? 'text-primary-light' : 'text-white'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary mt-4" onClick={() => setMenuOpen(false)}>
            Get Quote
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar