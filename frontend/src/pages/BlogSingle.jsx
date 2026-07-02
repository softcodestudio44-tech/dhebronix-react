import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { getBlogPost } from '../utils/api'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'

const BlogSingle = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getBlogPost(id)
        setPost(res.data)
      } catch (err) {
        setError('Blog post not found')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-orbitron text-2xl text-white mb-4">Post Not Found</h2>
          <Link to="/blog" className="text-primary-light hover:text-white transition-colors">← Back to Blog</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO title={post.title} description={post.excerpt || post.content?.substring(0, 160)} image={post.image} />
      
      {/* Hero Image */}
      <div className="relative h-80 md:h-[500px]">
        <img 
          src={post.image || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1400'} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-custom pb-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-300 text-sm hover:text-primary-light transition-colors mb-4">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full mb-4 inline-block">
            {post.category}
          </span>
          <h1 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
            <span className="flex items-center gap-1"><User size={14} /> {post.author || 'DHEBRONIX Team'}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(post.date)}</span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <ScrollReveal className="lg:col-span-2">
              <article className="bg-dark-card border border-dark-border rounded-xl p-6 md:p-10">
                <div 
                  className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content?.replace(/\n/g, '<br/>') || '' }}
                />
                
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-dark-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag size={16} className="text-primary-light" />
                      <span className="text-white text-sm font-medium">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-dark border border-dark-border rounded-full text-gray-400 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share */}
                <div className="mt-8 pt-6 border-t border-dark-border">
                  <div className="flex items-center gap-4">
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                      <Share2 size={16} /> Share:
                    </span>
                    <a href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                      <Facebook size={16} />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                      <Twitter size={16} />
                    </a>
                    <a href={`https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-[#0A66C2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                      <Linkedin size={16} />
                    </a>
                  </div>
                </div>
              </article>
            </ScrollReveal>

            {/* Sidebar */}
            <ScrollReveal>
              <div className="space-y-6">
                {/* Author */}
                <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                  <h3 className="font-orbitron text-lg font-bold text-white mb-4">About the Author</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                      <User size={28} className="text-primary-light" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{post.author || 'DHEBRONIX Team'}</h4>
                      <p className="text-gray-500 text-xs">Sound Engineering Expert</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6">
                  <h3 className="font-orbitron text-lg font-bold text-white mb-3">Need Sound Services?</h3>
                  <p className="text-gray-400 text-sm mb-4">Contact us for professional sound engineering for your next event.</p>
                  <Link to="/contact" className="btn-primary w-full justify-center text-sm">
                    Get a Quote
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogSingle