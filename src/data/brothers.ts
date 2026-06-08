import type { Brother } from "@/types/brother";

/**
 * 광인 형제 명단.
 *
 * 지금은 인물 중심 수배지 구조를 먼저 잡아두고, 사진/회사 정보는 나중에
 * 각 entry 에 채워 넣는다.
 *
 * 추가/수정 방법:
 *   1) 인물 사진   → /public/images/brothers/<id>-founder.jpg
 *   2) 회사 로고   → /public/images/brothers/<id>-logo.svg
 *   3) 기업가치    → bounty 필드에 표시 문구를 입력한다.
 *
 * founderImageUrl / logoUrl / bounty 가 비어 있으면 카드가 자동으로
 * 준비중 UI 를 표시한다.
 */
const BROTHER_NAMES = [
  "정근식",
  "김민욱",
  "김용진",
  "김주환",
  "김진우",
  "김호성",
  "남성필",
  "김민재",
  "박도현",
  "박지수",
  "방역주",
  "백현우",
  "손균우",
  "손재경",
  "신재명",
  "오준호",
  "우찬민",
  "유도희",
  "윤용섭",
  "윤희상",
  "이민석",
  "이세영",
  "이수지",
  "이윤석",
  "지동환",
  "지현준",
  "최재형",
  "김태용",
  "표시형",
  "김하경",
  "최찬열",
  "김민상",
  "이도현",
  "이재헌",
  "정성현",
] as const;

export const brothers: Brother[] = BROTHER_NAMES.map((founderName, index) => ({
  id: `brother-${String(index + 1).padStart(2, "0")}`,
  companyName: "회사 미정",
  founderName,
  bounty: "기업가치 미정",
}));
