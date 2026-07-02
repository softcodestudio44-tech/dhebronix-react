import { Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const BlogCard = ({ post }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <article className="group bg-dark-card border border-dark-border rounded-xl overflow-hidden card-hover">
      <div className="relative h-52 overflow-hidden">
        <img 
          src={post.image || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600'} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
          <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(post.date)}</span>
          <span>By {post.author || 'DHEBRONIX Team'}</span>
        </div>
        <h3 className="font-orbitron text-lg font-bold text-white mb-3 group-hover:text-primary-light transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{post.excerpt || post.content?.substring(0, 120) + '...'}</p>
        <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-primary-light text-sm font-medium hover:gap-3 transition-all">
          Read More <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}

export default BlogCard