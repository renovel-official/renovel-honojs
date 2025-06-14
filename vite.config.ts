import { cloudflare } from '@cloudflare/vite-plugin'
import build from '@hono/vite-build/cloudflare-workers'
import { defineConfig } from 'vite'
import ssrHotReload from 'vite-plugin-ssr-hot-reload'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command, isSsrBuild }) => {
  const common = {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    // JSX の設定（Preact ベースの JSX）
    esbuild: {
      jsxImportSource: 'hono/jsx',
    },
  }

  if (command === 'serve') {
    return {
      ...common,
      plugins: [
        // ssrHotReload(), // 有効にしたければコメントアウト解除
        cloudflare(),
        tailwindcss()
      ]
    }
  }

  if (!isSsrBuild) {
    return {
      ...common,
      build: {
        rollupOptions: {
          input: ['./src/style.css'],
          output: {
            assetFileNames: 'assets/[name].[ext]'
          }
        }
      }
    }
  }

  // ✅ SSR ビルド時に ChatRoom を削除しないよう設定追加
  return {
    ...common,
    plugins: [
      build({ 
        outputDir: 'dist-server'
      })
    ],
    build: {
      rollupOptions: {
        treeshake: {
          moduleSideEffects: (id) => {
            // durable-objects.ts が含まれる場合は副作用ありと判定して除外を防ぐ
            return id.includes('durable-objects');
          }
        }
      }
    }
  }
})