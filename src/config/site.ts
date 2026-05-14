export const SITE = {
  name: "광인회관",
  url: "https://crazyones.us",
  description: "미쳐야 미친다. 세상을 바꿀 수 있다고 믿는 형제들의 회관.",

  blog: {
    label: "블로그",
    url: "https://crazyones2019.substack.com",
    external: true,
  },

  nav: [
    { label: "광인 형제", href: "/brothers", external: false },
    { label: "블로그", href: "#blog-link", external: true },
  ],
} as const;

export const BLOG_URL = SITE.blog.url;
