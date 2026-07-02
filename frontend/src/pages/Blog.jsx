import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import BlogCard from '../components/BlogCard'
import ScrollReveal from '../components/ScrollReveal'
import { useData } from '../context/DataContext'
import { Search, Calendar } from 'lucide-react'
import SEO from '../components/SEO'

const Blog = () => {
  const { blogPosts, loading } = useData()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['All', 'Sound Engineering', 'Events', 'Equipment', 'Tips', 'Industry News']

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || post.category?.toLowerCase() === activeCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <SEO title="Blog" description="Read the latest articles on sound engineering, event tips, equipment reviews, and industry news." />
      
      <PageHeader 
        title="Our Blog" 
        breadcrumbs={[{ label: 'Home', link: '/' }, { label: 'Blog' }]} 
      />

      <section className="section-padding bg-dark">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-primary-light text-sm font-medium tracking-wider uppercase">Insights</span>
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Latest Articles</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Stay updated with the latest trends in sound engineering, event planning tips, equipment reviews, and industry news.
              </p>
            </div>
          </ScrollReveal>

          {/* Search & Filter */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
              <div className="relative w-full md:w-96">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-dark-card border border-dark-border rounded-full text-white text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat.toLowerCase())}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${activeCategory === cat.toLowerCase() ? 'bg-primary text-white' : 'bg-dark-card border border-dark-border text-gray-400 hover:border-primary hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-dark-card border border-dark-border rounded-xl h-96 animate-pulse" />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 100}>
                  <BlogCard post={post} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              {searchQuery ? 'No articles match your search.' : 'No blog posts available yet.'}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Blog