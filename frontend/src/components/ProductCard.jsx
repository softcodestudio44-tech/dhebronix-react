import { ShoppingCart, Eye } from 'lucide-react'

const ProductCard = ({ product, onClick }) => {
  const discount = product.old_price && product.old_price > product.price
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : 0

  return (
    <div className="group bg-dark-card border border-dark-border rounded-xl overflow-hidden card-hover">
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <img 
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded ${product.condition === 'new' ? 'bg-primary text-white' : 'bg-yellow-500/80 text-black'}`}>
            {product.condition || 'New'}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button onClick={onClick} className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-light transition-colors">
            <Eye size={20} />
          </button>
          <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-dark hover:bg-gray-200 transition-colors">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 truncate">{product.brand || 'DHEBRONIX'}</div>
        <h3 className="font-semibold text-white mb-2 truncate text-sm sm:text-base">{product.name}</h3>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-primary-light font-bold text-base sm:text-lg">₦{product.price?.toLocaleString()}</span>
          {product.old_price && (
            <span className="text-gray-500 text-xs sm:text-sm line-through">₦{product.old_price?.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard