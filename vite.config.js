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

const base = process.env.NODE_ENV === 'production' ? getBasePath() : '/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // 确保资源文件名包含 hash，避免缓存问题
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  // 开发服务器配置
  server: {
    port: 5173,
  },
  // 确保所有资源路径都使用 base
  publicDir: 'public',
})
