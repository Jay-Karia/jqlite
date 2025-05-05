import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JQLite",
  description: "The query language for JSON",
  head: [
    ['link', {
      rel: 'icon',
      href: '/logo.ico'
    }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API Reference', link: '/api-reference' }
    ],

    sidebar: [
      {
        items: [
          { text: 'Get Started', link: '/get-started' },
          { text: 'API Reference', link: '/api-reference' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Jay-Karia/jqlite' }
    ]
  }
})
