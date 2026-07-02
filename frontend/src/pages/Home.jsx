import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Play, Volume2, Radio, Headphones, Mic, Music, Speaker, ChevronDown, Zap, Shield, Clock, Award } from 'lucide-react'
import { useData } from '../context/DataContext'
import EventCard from '../components/EventCard'
import ProductCard from '../components/ProductCard'
import TestimonialCard from '../components/TestimonialCard'
import StatsCounter from '../components/StatsCounter'
import ScrollReveal from '../components/ScrollReveal'
import EventModal from '../components/EventModal'
import EquipmentModal from '../components/EquipmentModal'
import SEO from '../components/SEO'

const Home = () => {
  const { events, equipment, testimonials, loading } = useData()
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const heroRef = useRef(null)

  // 3D Mouse tracking - desktop only
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const featuredEvents = events.slice(0, 6)
  const featuredEquipment = equipment.slice(0, 8)
  const featuredTestimonials = testimonials.slice(0, 3)

  const services = [
    { icon: Volume2, title: 'Live/Studio Setup', desc: 'Professional sound setup for concerts, churches, and studio recordings with crystal-clear audio quality.' },
    { icon: Radio, title: 'Event Setup', desc: 'Complete audio-visual setup for weddings, corporate events, and outdoor gatherings of any size.' },
    { icon: Headphones, title: 'Equipment Sales', desc: 'Premium speakers, mixers, microphones, and accessories at competitive prices with warranty.' },
    { icon: Mic, title: 'Sound Installation', desc: 'Permanent sound system installation for churches, halls, and event venues with expert calibration.' },
    { icon: Music, title: 'Consultation', desc: 'Expert advice on equipment selection, venue acoustics, and sound system design.' },
    { icon: Speaker, title: 'Training', desc: 'Professional training on sound engineering, mixing techniques, and equipment handling.' },
  ]

  const whyChooseUs = [
    { icon: Zap, title: 'Premium Quality', desc: 'Top-tier equipment from leading brands ensuring unmatched sound clarity.' },
    { icon: Shield, title: 'Reliable Service', desc: 'Punctual setup, professional crew, and 24/7 support for all events.' },
    { icon: Clock, title: 'Years Experience', desc: 'Over a decade of experience in sound engineering across Nigeria.' },
    { icon: Award, title: 'Certified Experts', desc: 'Trained and certified sound engineers with proven track records.' },
  ]

  return (
    <>
      <SEO 
        title="Home" 
        description="Professional sound engineering & multimedia company in Lagos, Nigeria. Live event setup, equipment sales, studio recording."
        keywords="sound engineering, multimedia, event setup, equipment sales, Lagos, Nigeria, live sound, studio recording"
      />

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1629096193181-89aa83f523cb?w=1920" 
            alt="Professional sound equipment"
            className="w-full h-full object-cover"
            onLoad={() => setHeroLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/75 to-primary/25" />
        </div>

        {/* 3D Sound Wave Ring - desktop only */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none hidden lg:flex">
          <div className="relative w-[500px] h-[500px] xl:w-[600px] xl:h-[600px] preserve-3d animate-spin-slow">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-primary/20"
                style={{
                  transform: `rotateX(${i * 30}deg) rotateY(${i * 45}deg) translateZ(${i * 30}px)`,
                }}
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.25, 0.5, 0.25],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 xl:w-32 xl:h-32 rounded-full bg-primary/15 blur-2xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Floating 3D Cards - desktop only */}
        <div className="absolute inset-0 pointer-events-none hidden xl:block">
          {[
            { icon: Volume2, label: 'Live Sound', delay: 0, x: -220, y: -140 },
            { icon: Mic, label: 'Recording', delay: 0.8, x: 220, y: -100 },
            { icon: Speaker, label: 'Equipment', delay: 1.6, x: -180, y: 140 },
            { icon: Radio, label: 'Broadcast', delay: 2.4, x: 180, y: 120 },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 pointer-events-auto"
              style={{
                x: card.x,
                y: card.y,
                rotateX,
                rotateY,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: card.delay + 0.5, duration: 0.6 }}
            >
              <motion.div
                className="w-20 h-20 xl:w-24 xl:h-24 bg-dark-card/70 backdrop-blur-md border border-primary/25 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer group hover:border-primary-light/60 transition-colors"
                whileHover={{ scale: 1.1, rotateY: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <card.icon size={20} className="text-primary-light group-hover:text-white" />
                <span className="text-[8px] text-gray-400 font-medium uppercase tracking-wider">{card.label}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Particle Sound Bars - desktop only */}
        <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 pointer-events-none overflow-hidden hidden md:block">
          <div className="flex items-end justify-center gap-1 h-full">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 md:w-2 bg-gradient-to-t from-primary/50 to-primary-light/15 rounded-t-sm"
                animate={{
                  height: ['10%', '25%', '55%', '15%', '40%', '10%'],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Particles - desktop only */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-light rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -Math.random() * 150 - 50],
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div 
          className="container-custom relative z-10 text-center px-4 py-20 md:py-0"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary/20 border border-primary/30 rounded-full mb-4 md:mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-primary-light rounded-full animate-pulse" />
              <span className="text-primary-light text-[10px] md:text-xs font-medium tracking-wider uppercase">Professional Sound Engineering</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight"
            style={{ transform: 'translateZ(40px)' }}
          >
            Elevating Your <br className="hidden sm:block" />
            <span className="text-gradient">Audio Experience</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-10 leading-relaxed"
            style={{ transform: 'translateZ(25px)' }}
          >
            Professional sound engineering and multimedia solutions for events of all sizes. 
            From live concerts to studio recordings, we deliver crystal-clear audio excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            style={{ transform: 'translateZ(30px)' }}
          >
            <Link to="/events" className="btn-primary text-sm md:text-base px-6 py-3 md:px-8 md:py-3.5 w-full sm:w-auto justify-center group">
              Explore Events <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/equipment" className="btn-outline text-sm md:text-base px-6 py-3 md:px-8 md:py-3.5 w-full sm:w-auto justify-center">
              <Play size={16} /> View Equipment
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 text-gray-400 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-primary-light text-xs md:text-sm font-medium tracking-wider uppercase">What We Do</span>
              <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Our Services</h2>
              <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="group bg-dark-card border border-dark-border rounded-xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary transition-colors">
                    <service.icon size={24} className="text-primary-light group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-orbitron text-base md:text-lg font-bold text-white mb-2 md:mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{service.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <StatsCounter />

      {/* Featured Events */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
              <div>
                <span className="text-primary-light text-xs md:text-sm font-medium tracking-wider uppercase">Portfolio</span>
                <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">Featured Events</h2>
                <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-primary to-primary-light mt-4" />
              </div>
              <Link to="/events" className="text-primary-light text-sm font-medium hover:text-white transition-colors mt-4 md:mt-0 flex items-center gap-2">
                View All Events <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-dark-card border border-dark-border rounded-xl h-64 md:h-80 animate-pulse" />
              ))}
            </div>
          ) : featuredEvents.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featuredEvents.map((event, i) => (
                <ScrollReveal key={event.id} delay={i * 100}>
                  <EventCard event={event} onClick={() => setSelectedEvent(event)} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 md:py-20 text-gray-500">No events available yet.</div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1588650033940-30ebeffe46ee?w=1400" 
            alt="Professional sound equipment"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-[#050505]" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <span className="text-primary-light text-xs md:text-sm font-medium tracking-wider uppercase">Why Us</span>
                <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-4 md:mb-6">
                  Why Choose <span className="text-gradient">DHEBRONIX?</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                  With over a decade of experience in professional sound engineering, we have built a reputation 
                  for excellence, reliability, and innovation. Our team of certified engineers uses only 
                  premium equipment to deliver unmatched audio experiences.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  {whyChooseUs.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                        <item.icon size={18} className="md:w-[22px] md:h-[22px] text-primary-light" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm md:text-base mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-xs md:text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <div className="relative mt-6 lg:mt-0">
                <img 
                  src="https://images.unsplash.com/photo-1665221965525-87fe35deabdd?w=800" 
                  alt="Live sound equipment"
                  className="rounded-2xl w-full"
                />
                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-dark-card border border-dark-border rounded-xl p-4 md:p-6 shadow-xl">
                  <div className="font-orbitron text-2xl md:text-3xl font-bold text-primary-light">10+</div>
                  <div className="text-gray-400 text-xs md:text-sm">Years of Excellence</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
              <div>
                <span className="text-primary-light text-xs md:text-sm font-medium tracking-wider uppercase">Shop</span>
                <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">Featured Equipment</h2>
                <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-primary to-primary-light mt-4" />
              </div>
              <Link to="/equipment" className="text-primary-light text-sm font-medium hover:text-white transition-colors mt-4 md:mt-0 flex items-center gap-2">
                View All Equipment <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-dark-card border border-dark-border rounded-xl h-72 md:h-96 animate-pulse" />
              ))}
            </div>
          ) : featuredEquipment.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredEquipment.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 100}>
                  <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 md:py-20 text-gray-500">No equipment available yet.</div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1400" 
            alt="Sound equipment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/92" />
        </div>
        
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-primary-light text-xs md:text-sm font-medium tracking-wider uppercase">Testimonials</span>
              <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-4">What Clients Say</h2>
              <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto" />
            </div>
          </ScrollReveal>

          {featuredTestimonials.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featuredTestimonials.map((t, i) => (
                <ScrollReveal key={t.id} delay={i * 150}>
                  <TestimonialCard testimonial={t} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-10 text-gray-500">No testimonials yet.</div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/20 to-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container-custom relative z-10 text-center px-4">
          <ScrollReveal>
            <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Ready to Elevate Your <span className="text-gradient">Event?</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-6 md:mb-10">
              Contact us today for a free consultation and quote. Let's make your next event unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Link to="/contact" className="btn-primary text-sm md:text-base px-6 py-3 md:px-8 md:py-3.5">
                Get a Quote <ArrowRight size={16} />
              </Link>
              <a href="https://wa.me/2348037280457" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm md:text-base px-6 py-3 md:px-8 md:py-3.5">
                WhatsApp Us
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Modals */}
      <EventModal 
        isOpen={!!selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
        event={selectedEvent} 
      />
      <EquipmentModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
    </>
  )
}

export default Home