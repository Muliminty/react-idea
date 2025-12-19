import { useState, useMemo } from 'react'
import { loadEffects } from '../utils/effectLoader'

// 缓存已加载的特效
let cachedEffects = null

export function useEffects() {
  const [effects] = useState(() => {
    if (!cachedEffects) {
      cachedEffects = loadEffects()
    }
    return cachedEffects
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  // 获取所有标签
  const allTags = useMemo(() => {
    const tagSet = new Set()
    effects.forEach((effect) => {
      effect.meta.tags.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [effects])

  // 获取所有分类
  const allCategories = useMemo(() => {
    const categorySet = new Set()
    effects.forEach((effect) => {
      if (effect.meta.category) {
        categorySet.add(effect.meta.category)
      }
    })
    return Array.from(categorySet).sort()
  }, [effects])

  // 过滤特效
  const filteredEffects = useMemo(() => {
    return effects.filter((effect) => {
      // 搜索过滤
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          effect.meta.title.toLowerCase().includes(query) ||
          effect.meta.description.toLowerCase().includes(query) ||
          effect.meta.tags.some((tag) => tag.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // 标签过滤
      if (selectedTags.length > 0) {
        const hasSelectedTag = selectedTags.some((tag) =>
          effect.meta.tags.includes(tag)
        )
        if (!hasSelectedTag) return false
      }

      // 分类过滤
      if (selectedCategory && effect.meta.category !== selectedCategory) {
        return false
      }

      return true
    })
  }, [effects, searchQuery, selectedTags, selectedCategory])

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
    setSelectedCategory('')
  }

  return {
    effects: filteredEffects,
    allTags,
    allCategories,
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    selectedCategory,
    setSelectedCategory,
    clearFilters,
    hasActiveFilters: searchQuery !== '' || selectedTags.length > 0 || selectedCategory !== '',
  }
}

