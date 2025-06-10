import { defineConfig } from 'vitepress';
import { themeConfig } from './themeConfig';
import { viteConfig } from './viteConfig';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "WEBGISTAMPLATE1",
  base: '/webGISTamplate1/',
  themeConfig: themeConfig,
  vite: viteConfig,
  appearance: 'force-dark',
})
