import { Link } from 'react-router-dom'

const PageHeader = ({ title, breadcrumbs }) => {
  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 bg-[url('https://images.unsplash.com/photo-1588650033940-30ebeffe46ee?w=1920&auto=format&fit=crop&q=80')] bg-cover bg-center">
      {/* Lighter overlay so mixer is visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-primary/30" />
      <div className="container-custom relative z-10 text-center px-4">
        <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 break-words">
          {title.split(' ').map((word, i, arr) => (
            <span key={i} className={i === arr.length - 1 ? 'text-primary-light' : 'text-white'}>
              {word}{' '}
            </span>
          ))}
        </h1>
        <nav className="text-xs sm:text-sm text-gray-400">
          {breadcrumbs.map((crumb, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2">/</span>}
              {crumb.link ? (
                <Link to={crumb.link} className="text-primary-light hover:text-white transition-colors">{crumb.label}</Link>
              ) : (
                <span className="text-gray-300">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default PageHeader