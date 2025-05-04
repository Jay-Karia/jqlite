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
      { text: "Introduction", link: "/introduction" },
      { text: "Get Started", link: "/get-started" },
      { text: "How To", link: "/how-to" },
      { text: "Troubleshoot", link: "/troubleshoot" },
      { text: "Migrate from v4", link: "/migrate-from-v4" },
    ],
  },
})
