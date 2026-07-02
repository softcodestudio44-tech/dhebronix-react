import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { CalendarCheck, Users, Award, Volume2 } from 'lucide-react'

const stats = [
  { icon: CalendarCheck, value: 50, label: 'Events Completed', suffix: '+' },
  { icon: Users, value: 100, label: 'Happy Clients', suffix: '+' },
  { icon: Award, value: 10, label: 'Years Experience', suffix: '+' },
  { icon: Volume2, value: 500, label: 'Equipment Pieces', suffix: '+' },
]

const StatsCounter = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section className="relative py-20 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1400')] bg-cover bg-fixed bg-center">
      <div className="absolute inset-0 bg-black/85" />
      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-10 h-10 text-primary-light mx-auto mb-4" />
              <div className="font-orbitron text-4xl lg:text-5xl font-bold text-white mb-2">
                {inView ? <CountUp end={stat.value} duration={2} /> : 0}
                <span className="text-2xl text-primary-light">{stat.suffix}</span>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsCounter