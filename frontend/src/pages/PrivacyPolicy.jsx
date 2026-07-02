import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'

const PrivacyPolicy = () => {
  return (
    <>
      <SEO title="Privacy Policy" description="DHEBRONIX Multimedia Company Privacy Policy - how we collect, use, and protect your personal information." />
      
      <PageHeader 
        title="Privacy Policy" 
        breadcrumbs={[{ label: 'Home', link: '/' }, { label: 'Privacy Policy' }]} 
      />

      <section className="section-padding bg-dark">
        <div className="container-custom max-w-4xl">
          <ScrollReveal>
            <article className="bg-dark-card border border-dark-border rounded-xl p-8 md:p-12">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-400 mb-6">Last updated: January 1, 2025</p>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">1. Introduction</h2>
                <p className="text-gray-400 mb-6">
                  DHEBRONIX Multimedia Company ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
                  This Privacy Policy explains how we collect, use, store, and protect your information when you use our website and services.
                </p>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">2. Information We Collect</h2>
                <p className="text-gray-400 mb-4">We may collect the following types of information:</p>
                <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, and event details you provide through our contact form.</li>
                  <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited and time spent.</li>
                  <li><strong>Device Information:</strong> Browser type, IP address, and device type for analytics and security purposes.</li>
                </ul>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-400 mb-4">We use your information to:</p>
                <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2">
                  <li>Respond to your inquiries and provide requested services</li>
                  <li>Process equipment orders and event bookings</li>
                  <li>Send updates about our services (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">4. Data Security</h2>
                <p className="text-gray-400 mb-6">
                  We implement appropriate security measures to protect your personal information from unauthorized access, 
                  alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">5. Third-Party Services</h2>
                <p className="text-gray-400 mb-6">
                  We may use third-party services (such as payment processors and analytics tools) that collect, monitor, 
                  and analyze data. These third parties have their own privacy policies governing their use of your information.
                </p>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">6. Your Rights</h2>
                <p className="text-gray-400 mb-6">
                  You have the right to access, correct, or delete your personal information. To exercise these rights, 
                  please contact us at dhebronixmultimedia@gmail.com.
                </p>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">7. Contact Us</h2>
                <p className="text-gray-400">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-gray-400 mt-2">
                  <strong>Email:</strong> dhebronixmultimedia@gmail.com<br />
                  <strong>Phone:</strong> +234 803 728 0457<br />
                  <strong>Address:</strong> Lagos, Nigeria
                </p>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy