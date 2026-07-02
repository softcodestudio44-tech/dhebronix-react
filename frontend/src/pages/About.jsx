import PageHeader from '../components/PageHeader'
import TeamCard from '../components/TeamCard'
import ScrollReveal from '../components/ScrollReveal'
import { useData } from '../context/DataContext'
import { Target, Eye, Heart, CheckCircle } from 'lucide-react'
import SEO from '../components/SEO'

const About = () => {
  const { team } = useData()

  const values = [
    { icon: Target, title: 'Mission', desc: 'To deliver world-class audio-visual experiences that exceed client expectations through innovation, professionalism, and cutting-edge technology.' },
    { icon: Eye, title: 'Vision', desc: 'To become Africa\'s most trusted and sought-after multimedia company, setting the standard for sound engineering excellence.' },
    { icon: Heart, title: 'Values', desc: 'Integrity, Excellence, Innovation, Reliability, and Customer Satisfaction drive everything we do at DHEBRONIX.' },
  ]

  const milestones = [
    { year: '2015', title: 'Founded', desc: 'DHEBRONIX Multimedia Company was established in Lagos, Nigeria.' },
    { year: '2017', title: 'First Major Event', desc: 'Handled sound for a 5,000+ capacity concert, establishing our reputation.' },
    { year: '2019', title: 'Equipment Sales', desc: 'Launched equipment sales division, offering premium audio gear.' },
    { year: '2021', title: 'Studio Setup', desc: 'Expanded into professional studio recording and installation services.' },
    { year: '2023', title: 'National Reach', desc: 'Now serving clients across all 36 states in Nigeria.' },
    { year: '2025', title: 'Digital Platform', desc: 'Launched our new digital platform for seamless client experience.' },
  ]

  return (
    <>
      <SEO title="About Us" description="Learn about DHEBRONIX Multimedia Company - professional sound engineering in Lagos, Nigeria." />
      
      <PageHeader 
        title="About Us" 
        breadcrumbs={[{ label: 'Home', link: '/' }, { label: 'About Us' }]} 
      />

      {/* About Content */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <ScrollReveal direction="left">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800" 
                  alt="DHEBRONIX team at work"
                  className="rounded-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-dark-card border border-dark-border rounded-xl p-6 shadow-xl">
                  <div className="font-orbitron text-4xl font-bold text-primary-light">10+</div>
                  <div className="text-gray-400 text-sm">Years Experience</div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <span className="text-primary-light text-sm font-medium tracking-wider uppercase">Who We Are</span>
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-2 mb-6">
                Nigeria's Premier <span className="text-gradient">Sound Engineering</span> Company
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                DHEBRONIX Multimedia Company is a leading professional sound engineering and multimedia 
                solutions provider based in Lagos, Nigeria. Founded with a passion for delivering 
                crystal-clear audio experiences, we have grown to become one of the most trusted names 
                in the industry.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Our team of certified sound engineers and technicians brings over a decade of combined 
                experience to every project. From intimate gatherings to large-scale concerts, we have 
                the expertise and equipment to handle events of any size.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {['Professional Sound Engineers', 'Premium Equipment', 'Nationwide Coverage', '24/7 Support'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle size={16} className="text-primary-light" />
                    {item}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {values.map((value, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-dark-card border border-dark-border rounded-xl p-8 text-center hover:border-primary/50 transition-all">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon size={32} className="text-primary-light" />
                  </div>
                  <h3 className="font-orbitron text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Timeline */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary-light text-sm font-medium tracking-wider uppercase">Our Journey</span>
              <h2 className="font-orbitron text-3xl font-bold text-white mt-2">Milestones</h2>
            </div>
          </ScrollReveal>
          
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                        <span className="font-orbitron text-2xl font-bold text-primary-light">{milestone.year}</span>
                        <h4 className="text-white font-semibold mt-2 mb-1">{milestone.title}</h4>
                        <p className="text-gray-400 text-sm">{milestone.desc}</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-dark hidden md:block shrink-0 z-10" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-[#050505]">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary-light text-sm font-medium tracking-wider uppercase">Our Team</span>
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Meet The Experts</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto" />
            </div>
          </ScrollReveal>

          {team.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <ScrollReveal key={member.id} delay={i * 100}>
                  <TeamCard member={member} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">No team members listed yet.</div>
          )}
        </div>
      </section>
    </>
  )
}

export default About