import { Linkedin, Instagram } from 'lucide-react'

const TeamCard = ({ member }) => {
  return (
    <div className="group bg-dark-card border border-dark-border rounded-xl overflow-hidden card-hover text-center">
      <div className="relative h-72 overflow-hidden">
        <img 
          src={member.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'} 
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0">
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-light transition-colors">
              <Linkedin size={16} />
            </a>
          )}
          {member.instagram && (
            <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-light transition-colors">
              <Instagram size={16} />
            </a>
          )}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-orbitron text-lg font-bold text-white mb-1">{member.name}</h3>
        <p className="text-primary-light text-sm">{member.role}</p>
        {member.bio && <p className="text-gray-400 text-xs mt-2 line-clamp-2">{member.bio}</p>}
      </div>
    </div>
  )
}

export default TeamCard