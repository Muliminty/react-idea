import { Link } from 'react-router-dom'
import { useEffects } from '../hooks/useEffects'
import Navbar from '../components/Navbar'
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
      <Navbar />
      
      <header className="home-header">
        <div className="header-content">
          <div className="header-badge">
            <span className="badge-icon">🎉</span>
            <span>探索创意特效组件</span>
          </div>
          <h1>
            <span className="title-line">React 特效</span>
            <span className="title-line gradient-text">灵感平台</span>
          </h1>
          <p className="header-description">
            高度可定制的动画组件，让你的 React 项目脱颖而出
          </p>
          <div className="header-actions">
            <a href="#components" className="cta-button">
              浏览组件
            </a>
          </div>
        </div>
      </header>

      <div className="home-content" id="components">
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
