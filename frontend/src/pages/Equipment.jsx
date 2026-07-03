import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import EquipmentModal from '../components/EquipmentModal'
import FilterButtons from '../components/FilterButtons'
import ScrollReveal from '../components/ScrollReveal'
import { useData } from '../context/DataContext'
import SEO from '../components/SEO'

const Equipment = () => {
  const { equipment, loading } = useData()
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const categories = [
    { value: 'speakers', label: 'Speakers' },
    { value: 'mixers', label: 'Mixers' },
    { value: 'microphones', label: 'Microphones' },
    { value: 'amplifiers', label: 'Amplifiers' },
    { value: 'lighting', label: 'Lighting' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'musical instruments', label: 'Musical Instruments' },
  ]

  const filteredEquipment = activeFilter === 'all' 
    ? equipment 
    : equipment.filter(e => e.category?.toLowerCase() === activeFilter)

  return (
    <>
      <SEO title="Equipment" description="Browse premium audio equipment for sale - speakers, mixers, microphones, amplifiers, and more." />
      
      <PageHeader 
        title="Equipment" 
        breadcrumbs={[{ label: 'Home', link: '/' }, { label: 'Equipment' }]} 
      />

      <section className="py-12 sm:py-20 px-4 bg-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-10">
              <span className="text-primary-light text-xs sm:text-sm font-medium tracking-wider uppercase">Shop</span>
              <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-3 sm:mb-4">Premium Equipment</h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto px-2">
                Quality audio equipment for sale. All items are tested and come with warranty. 
                Contact us via WhatsApp to purchase.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <FilterButtons 
              categories={categories} 
              activeFilter={activeFilter} 
              onFilterChange={setActiveFilter} 
            />
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-dark-card border border-dark-border rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : filteredEquipment.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredEquipment.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 100}>
                  <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              {activeFilter === 'all' ? 'No equipment available yet.' : `No ${activeFilter} found.`}
            </div>
          )}
        </div>
      </section>

      <EquipmentModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
    </>
  )
}

export default Equipment