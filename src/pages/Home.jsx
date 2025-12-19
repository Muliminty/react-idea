import { Link } from 'react-router-dom'
import { useEffects } from '../hooks/useEffects'
import EffectCard from '../components/EffectCard'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import './Home.css'

function Home() {
  const {
    effects,
    allTags,
    allCategories,
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    selectedCategory,
    setSelectedCategory,
    clearFilters,
    hasActiveFilters,
  } = useEffects()

  return (
    <div className="home">
      <header className="home-header">
        <div className="header-content">
          <h1>
            <span className="icon">✨</span>
            React 特效灵感
          </h1>
          <p>探索创意特效，获取灵感，复制代码</p>
        </div>
      </header>

      <div className="home-content">
        <aside className="sidebar">
          <FilterPanel
            tags={allTags}
            categories={allCategories}
            selectedTags={selectedTags}
            selectedCategory={selectedCategory}
            onTagToggle={toggleTag}
            onCategoryChange={setSelectedCategory}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </aside>

        <main className="main-content">
          <div className="toolbar">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <div className="results-count">
              找到 <strong>{effects.length}</strong> 个特效
            </div>
          </div>

          {effects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>没有找到匹配的特效</h3>
              <p>尝试调整搜索条件或筛选器</p>
              <button onClick={clearFilters} className="clear-filters-btn">
                清除所有筛选
              </button>
            </div>
          ) : (
            <div className="effects-grid">
              {effects.map((effect) => (
                <Link key={effect.meta.id} to={`/effect/${effect.meta.id}`}>
                  <EffectCard effect={effect} />
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Home

