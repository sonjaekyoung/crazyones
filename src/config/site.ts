export const SITE = {
  name: "광인회관",
  alternateName: "Gwangin Hall",
  url: "https://crazyones.us",
  description: "광인회관은 서울 마포구 홍대에서 미친 창업가들이 함께 사는 집.",
  descriptionEn:
    "Official website of Gwangin Hall (광인회관), the house in Hongdae, Seoul where crazy founders live together.",
  email: "crazyones.us@gmail.com",
  logo: "/logo/kuang.png",
  address: {
    locality: "마포구",
    region: "서울특별시",
    country: "KR",
  },

  blog: {
    label: "블로그",
    url: "https://crazyones2019.substack.com",
    external: true,
  },

  newsletter: {
    label: "뉴스레터",
    url: "https://crazys-ones.beehiiv.com/",
    external: true,
  },

  nav: [
    { label: "광인 형제", href: "/brothers", external: false },
    { label: "블로그", href: "#blog-link", external: true },
  ],
} as const;

export const BLOG_URL = SITE.blog.url;
export const NEWSLETTER_URL = SITE.newsletter.url;
