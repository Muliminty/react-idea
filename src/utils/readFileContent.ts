// 在开发环境中读取文件内容
// 注意：在生产环境中，这些文件会被打包，需要使用不同的方法

export async function readFileContent(filePath: string): Promise<string> {
  try {
    // 在开发环境中，使用 fetch 读取源文件
    if (import.meta.env.DEV) {
      const response = await fetch(filePath)
      if (response.ok) {
        return await response.text()
      }
    }
    return ''
  } catch (error) {
    console.error(`Failed to read file: ${filePath}`, error)
    return ''
  }
}

