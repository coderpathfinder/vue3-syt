import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//引入nodejs核心库path，对于ts项目，需要安装@types/node依赖，否则会报找不到依赖，之后还要在tsconfig.json中进行配置
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //配置src文件夹别名
  resolve: {
    alias: {
      "@":path.resolve(__dirname, 'src')
    }
  },
  //配置代理跨域
  server: {
    proxy: {
      '/api': {
        target: 'http://syt.atguigu.cn',
        changeOrigin: true,
      },
    }
  }
})
