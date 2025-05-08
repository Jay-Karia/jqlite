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
    socialLinks: [{ icon: "github", link: "https://github.com/Jay-Karia/jqlite" }],
    sidebar: [
      { text: "Get Started", link: "/get-started" },
      { text: "API Reference", link: "/api" },
      { text: "Examples", link: "/examples" },
      {
        base: "features",
        text: "Features",
        items: [
          { text: "Basic Selection", link: "/basic" },
          { text: "Fallback", link: "/fallback" },
          { text: "Wildcard", link: "/wildcard" },
          { text: "Array Slices", link: "/slices" },
          { text: "Multiple Key Selection", link: "/selection" },
          { text: "Key Omission", link: "/omission" },
          { text: "Functions", link: "/functions" },
          { text: "Comparison Operators", link: "/comparison" },
          { text: "Conditions", link: "/conditions" },
        ],
      },
      { text: "Configurations", link: "/config" },
      { text: "Errors", link: "/errors" },
    ],
  },
});
