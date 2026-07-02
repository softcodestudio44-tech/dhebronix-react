import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Twitter, Phone, Mail, MapPin, Clock } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Events & Setups', path: '/events' },
    { label: 'Equipment', path: '/equipment' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <footer className="bg-[#050505] border-t border-dark-border pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo.png" alt="DHEBRONIX" className="h-10 w-10 object-contain" />
              <div>
                <span className="font-orbitron text-sm font-bold text-primary-light">DHEBRONIX</span>
                <span className="block text-[7px] text-gray-500 tracking-[2px] uppercase">Multimedia Company</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Professional sound engineering and multimedia solutions for events of all sizes. Elevating your experience with premium audio excellence.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=100091654633566" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/dhebronixmc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://youtube.com/@dhebronixmultimedia935" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all">
                <Youtube size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-orbitron text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 text-sm hover:text-primary-light hover:pl-1 transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-orbitron text-white font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {['Live/Studio Setup', 'Event Setup', 'Equipment Sales', 'Sound Installation', 'Consultation', 'Training', 'Live Streaming'].map(service => (
                <li key={service}>
                  <span className="text-gray-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-orbitron text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={18} className="text-primary-light mt-0.5 shrink-0" />
                Lagos, Nigeria
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={18} className="text-primary-light shrink-0" />
                +234 803 728 0457
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={18} className="text-primary-light shrink-0" />
                dhebronixmultimedia@gmail.com
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Clock size={18} className="text-primary-light shrink-0" />
                Mon - Sat: 8AM - 8PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-border pt-8 text-center">
          <p className="text-gray-500 text-sm mb-2">&copy; 2025 DHEBRONIX Multimedia Company. All Rights Reserved.</p>
          <p className="text-gray-600 text-xs">
            <Link to="/privacy-policy" className="hover:text-primary-light">Privacy Policy</Link>
            {' | '}
            <Link to="/terms-of-service" className="hover:text-primary-light">Terms of Service</Link>
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Designed by <a href="https://softcode-studio.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">Softcode Web Studio</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer