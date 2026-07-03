import Modal from './Modal'
import { ShoppingCart, Tag, Box, Info } from 'lucide-react'

const EquipmentModal = ({ isOpen, onClose, product }) => {
  if (!product) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image — smaller on mobile */}
        <div className="relative h-48 sm:h-56 md:h-64 bg-dark">
          <img 
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800'} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.condition && (
            <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded-full ${product.condition === 'new' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
              {product.condition.toUpperCase()}
            </span>
          )}
        </div>
        
        {/* Content — compact on mobile */}
        <div className="p-4 sm:p-5 md:p-6">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 truncate">{product.brand || 'DHEBRONIX'}</div>
          <h2 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">{product.name}</h2>
          
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-light">₦{product.price?.toLocaleString()}</span>
            {product.old_price && (
              <span className="text-gray-500 text-sm md:text-lg line-through">₦{product.old_price?.toLocaleString()}</span>
            )}
          </div>

          <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
            <div className="flex items-center gap-2 md:gap-3 text-gray-300 text-sm">
              <Tag size={14} className="text-primary-light shrink-0" />
              <span className="truncate">Category: <span className="text-white capitalize">{product.category}</span></span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-gray-300 text-sm">
              <Box size={14} className="text-primary-light shrink-0" />
              <span>Condition: <span className="text-white capitalize">{product.condition || 'New'}</span></span>
            </div>
            {product.specs && (
              <div className="flex items-start gap-2 md:gap-3 text-gray-300 text-sm">
                <Info size={14} className="text-primary-light mt-0.5 shrink-0" />
                <span className="break-words">Specs: <span className="text-white">{product.specs}</span></span>
              </div>
            )}
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-4 md:mb-6 line-clamp-4 md:line-clamp-none">{product.description}</p>

          <a 
            href={`https://wa.me/2348037280457?text=Hi DHEBRONIX, I'm interested in buying: ${product.name} (₦${product.price?.toLocaleString()})`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center text-sm py-2.5 md:py-3"
          >
            <ShoppingCart size={16} className="md:w-[18px] md:h-[18px]" /> Buy via WhatsApp
          </a>
        </div>
      </div>
    </Modal>
  )
}

export default EquipmentModal