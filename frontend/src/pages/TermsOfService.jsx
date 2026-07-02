import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'

const TermsOfService = () => {
  return (
    <>
      <SEO title="Terms of Service" description="DHEBRONIX Multimedia Company Terms of Service - terms and conditions for using our website and services." />
      
      <PageHeader 
        title="Terms of Service" 
        breadcrumbs={[{ label: 'Home', link: '/' }, { label: 'Terms of Service' }]} 
      />

      <section className="section-padding bg-dark">
        <div className="container-custom max-w-4xl">
          <ScrollReveal>
            <article className="bg-dark-card border border-dark-border rounded-xl p-8 md:p-12">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-400 mb-6">Last updated: January 1, 2025</p>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-400 mb-6">
                  By accessing or using the DHEBRONIX Multimedia Company website and services, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services.
                </p>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">2. Services Description</h2>
                <p className="text-gray-400 mb-6">
                  DHEBRONIX Multimedia Company provides professional sound engineering services, event setup, equipment sales, 
                  sound installation, consultation, and training services. All services are subject to availability and scheduling.
                </p>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">3. Equipment Sales</h2>
                <p className="text-gray-400 mb-4">All equipment sales are subject to the following conditions:</p>
                <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2">
                  <li>Prices are subject to change without notice</li>
                  <li>All sales are final unless the item is defective</li>
                  <li>Warranty coverage varies by product and manufacturer</li>
                  <li>Payment must be received before delivery</li>
                  <li>Delivery fees may apply depending on location</li>
                </ul>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">4. Event Services</h2>
                <p className="text-gray-400 mb-4">For event services, the following applies:</p>
                <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2">
                  <li>A deposit may be required to secure your booking</li>
                  <li>Cancellation policies will be provided at the time of booking</li>
                  <li>We reserve the right to refuse service for any reason</li>
                  <li>Client is responsible for providing accurate event details</li>
                </ul>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">5. Intellectual Property</h2>
                <p className="text-gray-400 mb-6">
                  All content on this website, including text, images, logos, and designs, is the property of DHEBRONIX Multimedia Company 
                  and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create 
                  derivative works without our express permission.
                </p>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-400 mb-6">
                  DHEBRONIX Multimedia Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                  arising from your use of our services. Our total liability shall not exceed the amount paid for the specific service in question.
                </p>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">7. Governing Law</h2>
                <p className="text-gray-400 mb-6">
                  These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. 
                  Any disputes shall be resolved in the courts of Lagos State.
                </p>

                <h2 className="font-orbitron text-xl font-bold text-white mb-4">8. Contact Information</h2>
                <p className="text-gray-400">
                  For questions about these Terms, please contact us at:
                </p>
                <p className="text-gray-400 mt-2">
                  <strong>Email:</strong> dhebronixmultimedia@gmail.com<br />
                  <strong>Phone:</strong> +234 803 728 0457
                </p>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

export default TermsOfService