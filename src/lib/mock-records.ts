export type MockRecord = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags?: string[];
};

export const mockRecords: MockRecord[] = [
  {
    slug: "the-first-night",
    title: "회관의 첫 밤",
    excerpt:
      "도원에서 만난 그날, 우리는 같은 술잔을 들고 있었다. 그리고 같은 새벽을 보았다.",
    author: "회주",
    date: "2026-05-12",
    tags: ["회관", "기록"],
  },
  {
    slug: "what-i-broke-this-week",
    title: "이번 주 내가 깬 것",
    excerpt:
      "한 가지 가설이 무너졌고, 두 가지가 새로 섰다. 깨진 자리에만 새 길이 생긴다.",
    author: "광인K",
    date: "2026-05-10",
    tags: ["실험", "실패"],
  },
  {
    slug: "founders-are-mad",
    title: "창업가는 정상이 아니다",
    excerpt:
      "그리고 그것은 결함이 아니라 자격이다. 미친 사람만이 미친 미래를 본다.",
    author: "광인J",
    date: "2026-05-07",
    tags: ["철학"],
  },
];
