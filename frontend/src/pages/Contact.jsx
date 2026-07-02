import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import { sendMessage } from '../utils/api'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react'
import SEO from '../components/SEO'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    eventDate: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await sendMessage(formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', service: '', eventDate: '', message: '' })
    } catch (err) {
      alert('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+234 803 728 0457', href: 'tel:+2348037280457' },
    { icon: Mail, label: 'Email', value: 'dhebronixmultimedia@gmail.com', href: 'mailto:dhebronixmultimedia@gmail.com' },
    { icon: MapPin, label: 'Address', value: 'Lagos, Nigeria', href: '#' },
    { icon: Clock, label: 'Working Hours', value: 'Mon - Sat: 8AM - 8PM', href: '#' },
  ]

  const services = [
    'Live/Studio Setup',
    'Event Setup',
    'Equipment Sales',
    'Sound Installation',
    'Consultation',
    'Training',
    'Other'
  ]

  return (
    <>
      <SEO title="Contact Us" description="Get in touch with DHEBRONIX Multimedia Company for professional sound engineering services in Lagos, Nigeria." />
      
      <PageHeader 
        title="Contact Us" 
        breadcrumbs={[{ label: 'Home', link: '/' }, { label: 'Contact Us' }]} 
      />

      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <ScrollReveal direction="left">
              <div>
                <span className="text-primary-light text-sm font-medium tracking-wider uppercase">Get In Touch</span>
                <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-2 mb-6">
                  Let's Discuss Your <span className="text-gradient">Next Event</span>
                </h2>
                <p className="text-gray-400 leading-relaxed mb-10">
                  Ready to elevate your event with professional sound? Fill out the form or reach out to us directly. 
                  We typically respond within 24 hours.
                </p>

                <div className="space-y-6 mb-10">
                  {contactInfo.map((info, i) => (
                    <a 
                      key={i} 
                      href={info.href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                        <info.icon size={22} className="text-primary-light group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">{info.label}</div>
                        <div className="text-white font-medium group-hover:text-primary-light transition-colors">{info.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                <a 
                  href="https://wa.me/2348037280457"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-medium text-sm hover:bg-green-600 transition-colors"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal direction="right">
              <div className="bg-dark-card border border-dark-border rounded-xl p-6 md:p-8">
                {submitted ? (
                  <div className="text-center py-10">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                    <h3 className="font-orbitron text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400 text-sm mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="text-primary-light text-sm hover:text-white transition-colors">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary transition-colors"
                          placeholder="+234 803 728 0457"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Service Needed</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary transition-colors"
                        >
                          <option value="">Select a service</option>
                          {services.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Event Date</label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-dark border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                        placeholder="Tell us about your event..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <><Send size={18} /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-80 bg-dark-card border-y border-dark-border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126846.0!2d3.3!3d6.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1609459200000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="DHEBRONIX Location"
        />
      </section>
    </>
  )
}

export default Contact