import { Star, Quote } from 'lucide-react'

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6 relative">
      <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className={i < (testimonial.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
        ))}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{testimonial.text}"</p>
      <div className="border-t border-dark-border pt-4">
        <h4 className="font-semibold text-white">{testimonial.name}</h4>
        <p className="text-primary-light text-xs">{testimonial.event}</p>
      </div>
    </div>
  )
}

export default TestimonialCard