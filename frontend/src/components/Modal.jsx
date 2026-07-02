import { X } from 'lucide-react'

const Modal = ({ isOpen, onClose, children, maxWidth = 'max-w-4xl' }) => {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in-up"
      onClick={onClose}
    >
      <div 
        className={`relative bg-dark-card border border-dark-border rounded-2xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto shadow-2xl shadow-primary/10`}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-light transition-colors z-10"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal