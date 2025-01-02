import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { resolve } from 'path'
import envConfig from './env';
// import autoImportStyles from './plugin/vite-plugin-auto-import-styles';
// import viteCustomStartupInfo from './plugin/vite-custom-startup-info'; // 导入自定义插件

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = envConfig[mode];

  return {
    plugins: [
      react(),
      // autoImportStyles(),
      // viteCustomStartupInfo()
    ],
    server: {
      host: '0.0.0.0',
      port: parseInt(env.VITE_PORT, 10),
      proxy: env.proxy // 传入代理配置
    },
    presets: ["@babel/preset-react"],
    define: {
      'process.env': env
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/, // 正则表达式来匹配 .js 和 .jsx 文件
    },
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        "@": resolve(__dirname, 'src'), // 路径别名
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            // @import "@/assets/scss/variables.scss";
            // @import "@/assets/scss/utils.scss";
          `
        }
      }
    }
  };
});