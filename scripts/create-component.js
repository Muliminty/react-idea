#!/usr/bin/env node

/**
 * 组件模板生成脚本
 * 
 * 使用方法: npm run create-component
 * 
 * 功能：
 * 1. 交互式输入组件名称
 * 2. 验证名称格式（kebab-case）
 * 3. 复制模板文件到新目录
 * 4. 替换模板中的占位符
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')
const templateDir = join(projectRoot, 'src/effects/_template')
const effectsDir = join(projectRoot, 'src/effects')

// 创建 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// 提问函数
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

// 验证 kebab-case 格式
function isValidKebabCase(name) {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)
}

// 转换为 PascalCase
function toPascalCase(kebabCase) {
  return kebabCase
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

// 替换文件内容中的占位符
function replacePlaceholders(content, replacements) {
  let result = content
  for (const [placeholder, value] of Object.entries(replacements)) {
    const regex = new RegExp(placeholder, 'g')
    result = result.replace(regex, value)
  }
  return result
}

// 主函数
async function main() {
  console.log('\n🎨 创建新的特效组件模板\n')

  // 1. 获取组件名称
  let componentName = await question('请输入组件名称（kebab-case，如：my-awesome-effect）: ')
  componentName = componentName.trim()

  if (!componentName) {
    console.error('❌ 组件名称不能为空')
    rl.close()
    process.exit(1)
  }

  // 2. 验证格式
  if (!isValidKebabCase(componentName)) {
    console.error('❌ 组件名称格式不正确，请使用 kebab-case（如：my-awesome-effect）')
    rl.close()
    process.exit(1)
  }

  // 3. 检查目标文件夹是否存在
  const targetDir = join(effectsDir, componentName)
  if (existsSync(targetDir)) {
    console.error(`❌ 组件文件夹已存在: ${targetDir}`)
    rl.close()
    process.exit(1)
  }

  // 4. 获取组件标题（可选）
  const componentTitle = await question('请输入组件标题（中文，直接回车使用默认）: ').then(answer => {
    return answer.trim() || toPascalCase(componentName)
  })

  // 5. 准备替换映射
  const replacements = {
    'your-effect-id': componentName,
    '你的特效名称': componentTitle,
    'YourEffectComponent': toPascalCase(componentName),
    'your-effect': componentName
  }

  try {
    // 6. 创建目标目录
    mkdirSync(targetDir, { recursive: true })
    console.log(`\n📁 创建目录: ${targetDir}`)

    // 7. 复制并处理模板文件
    const files = ['index.jsx', 'Component.jsx', 'Component.css']
    
    for (const file of files) {
      const sourcePath = join(templateDir, file)
      const targetPath = join(targetDir, file)

      if (!existsSync(sourcePath)) {
        console.warn(`⚠️  模板文件不存在: ${sourcePath}`)
        continue
      }

      // 读取模板内容
      let content = readFileSync(sourcePath, 'utf-8')
      
      // 替换占位符
      content = replacePlaceholders(content, replacements)
      
      // 写入新文件
      writeFileSync(targetPath, content, 'utf-8')
      console.log(`✅ 创建文件: ${file}`)
    }

    console.log(`\n🎉 组件模板创建成功！`)
    console.log(`\n📂 组件路径: src/effects/${componentName}/`)
    console.log(`\n💡 下一步:`)
    console.log(`   1. 编辑 src/effects/${componentName}/Component.jsx 实现你的特效`)
    console.log(`   2. 编辑 src/effects/${componentName}/Component.css 添加样式`)
    console.log(`   3. 编辑 src/effects/${componentName}/index.jsx 更新元数据`)
    console.log(`   4. 刷新页面，组件会自动显示在界面上\n`)

  } catch (error) {
    console.error('❌ 创建组件时出错:', error.message)
    rl.close()
    process.exit(1)
  }

  rl.close()
}

// 运行主函数
main().catch((error) => {
  console.error('❌ 发生错误:', error)
  rl.close()
  process.exit(1)
})

