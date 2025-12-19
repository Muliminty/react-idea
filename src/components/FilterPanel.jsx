import './FilterPanel.css'

function FilterPanel({
  tags,
  categories,
  selectedTags,
  selectedCategory,
  onTagToggle,
  onCategoryChange,
  onClearFilters,
  hasActiveFilters,
}) {
  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>筛选</h3>
        {hasActiveFilters && (
          <button onClick={onClearFilters} className="clear-all-btn">
            清除
          </button>
        )}
      </div>

      {categories.length > 0 && (
        <div className="filter-section">
          <h4>分类</h4>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="category"
                value=""
                checked={selectedCategory === ''}
                onChange={() => onCategoryChange('')}
              />
              <span>全部</span>
            </label>
            {categories.map((category) => (
              <label key={category} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => onCategoryChange(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {tags.length > 0 && (
        <div className="filter-section">
          <h4>标签</h4>
          <div className="filter-tags">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`filter-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterPanel

