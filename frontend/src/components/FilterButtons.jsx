const FilterButtons = ({ categories, activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      <button
        onClick={() => onFilterChange('all')}
        className={`px-6 py-2.5 rounded-full border-2 font-medium text-sm transition-all duration-300 ${activeFilter === 'all' ? 'bg-gradient-to-r from-primary to-primary-light border-primary text-white' : 'border-dark-border text-gray-300 hover:border-primary hover:text-white'}`}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category.value}
          onClick={() => onFilterChange(category.value)}
          className={`px-6 py-2.5 rounded-full border-2 font-medium text-sm transition-all duration-300 capitalize ${activeFilter === category.value ? 'bg-gradient-to-r from-primary to-primary-light border-primary text-white' : 'border-dark-border text-gray-300 hover:border-primary hover:text-white'}`}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

export default FilterButtons