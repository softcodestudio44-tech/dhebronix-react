import { MessageCircle } from 'lucide-react'

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/2348037280457"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/40 hover:scale-110 transition-transform animate-pulse-slow"
    >
      <MessageCircle size={28} />
    </a>
  )
}

export default WhatsAppFloat