import type { Brother } from "@/types/brother";

/**
 * 광인 형제 명단.
 *
 * 회주가 직접 큐레이팅한다 — 자동 폼은 만들지 않는다 (톤 깨짐 방지).
 *
 * 추가/수정 방법:
 *   1) 로고 이미지 → /public/images/brothers/<id>-logo.svg  (SVG 우선, 안 되면 PNG/투명)
 *   2) 얼굴 사진   → /public/images/brothers/<id>-founder.jpg (가능하면 1:1 또는 4:5, 1200px+)
 *   3) 아래 배열의 해당 entry 를 채운다.
 *
 * logoUrl / founderImageUrl / websiteUrl 이 비어있으면 카드가 자동으로 fallback UI 를 표시한다.
 */
export const brothers: Brother[] = [
  { id: "liner", companyName: "Liner", founderName: "이름 미정" },
  { id: "xmayacrew", companyName: "xmayacrew", founderName: "이름 미정" },
  { id: "vacatio", companyName: "VACATIO", founderName: "이름 미정" },
  { id: "ironpig", companyName: "IRONPIG", founderName: "이름 미정" },
  { id: "endo-health", companyName: "ENDO HEALTH", founderName: "이름 미정" },
  { id: "planfit", companyName: "Planfit", founderName: "이름 미정" },
  { id: "cstt", companyName: "CSTT", founderName: "이름 미정" },
  { id: "zdvc", companyName: "ZDVC", founderName: "이름 미정" },
  { id: "wrtn", companyName: "wrtn.", founderName: "이름 미정" },
  { id: "doeat", companyName: "doeat", founderName: "이름 미정" },
  { id: "delightroom", companyName: "DelightRoom", founderName: "이름 미정" },
  { id: "sooho", companyName: "SooHo", founderName: "이름 미정" },
  { id: "f1-studio", companyName: "F1 studio", founderName: "이름 미정" },
  { id: "lingoalpha", companyName: "lingoalpha", founderName: "이름 미정" },
  { id: "any-way", companyName: "ANY-WAY", founderName: "이름 미정" },
  { id: "nb", companyName: "NB", founderName: "이름 미정" },
];
