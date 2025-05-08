import { defineConfig } from "vitepress";

export default defineConfig({
  title: "JQLite",
  description: "The query language for JSON",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/logo.svg",
      },
    ],
  ],
  themeConfig: {
    socialLinks: [
      { icon: "github", link: "https://github.com/Jay-Karia/jqlite" },
    ],
    sidebar: [
      { text: "Get Started", link: "/get-started" },
      { text: "API Reference", link: "/api" },
    ],
  },
})
