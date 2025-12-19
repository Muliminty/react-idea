import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 获取仓库名称（用于 GitHub Pages）
const getBasePath = () => {
  // 如果是 GitHub Actions 环境
  if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1]
    return `/${repoName}/`
  }
  // 开发环境使用根路径
  return '/'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? getBasePath() : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
