# 광인회관 · Crazy Ones

> 미쳐야 미친다. 세상을 바꿀 수 있다고 믿는 형제들의 회관.

광인회관(狂人會館) 공식 웹사이트 — `crazyones.us`.

광인회관은 회사가 아니다. 회관이다.
창업에 미친 형제들이 모여 점을 찍고, 선을 잇고, 기록을 남기는 곳.

---

## 시작하기

```bash
npm install
npm run dev
```

→ http://localhost:3000

빌드/검증:

```bash
npm run build       # 프로덕션 빌드 (Turbopack)
npm run lint        # ESLint
npx tsc --noEmit    # 타입 체크
```

## 기술 스택

| 영역 | 도구 |
|---|---|
| 프레임워크 | Next.js 16 (App Router, Turbopack 기본) |
| 런타임 | React 19.2, TypeScript 5 |
| 스타일 | Tailwind CSS v4 (다크 모드 only) |
| 모션 | Framer Motion |
| 폰트 | Pretendard Variable (KR) + Cinzel (EN display) |
| DB / Auth | Supabase (Phase 4부터) |
| 배포 | Vercel + Cloudflare DNS |

> ⚠ Next.js 16은 v15 대비 깨지는 변경이 많다. 코드를 만지기 전에 `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` 를 한 번 보고 시작할 것. 특히 `params`, `searchParams`, `cookies`, `headers` 는 **모두 async** 다.

## 폴더 구조

```
src/
  app/                  App Router 라우트
    page.tsx              / (홈 — 광인회관 랜딩)
    records/              /records (광인들의 기록)
    write/, edit/         글쓰기 / 고쳐쓰기
    oath/                 /oath (광인의 문 — 도원결의 입장문)
    members/              /members (형제 명부)
    join/                 /join (새로운 형제)
    admin/                /admin (회주 전용 — 회관 관리소)
    layout.tsx            루트 레이아웃 (헤더 / 푸터)
    globals.css           Tailwind v4 + 디자인 토큰
    icon.png, apple-icon.png   Next 파일 컨벤션 favicon
  components/
    landing/              홈 랜딩 7개 섹션
      dot-field.tsx         배경 점-선 캔버스
      hero.tsx
      intro.tsx
      oath-story.tsx
      dots-connected.tsx
      companies-grid.tsx
      recent-records.tsx
      next-brother-cta.tsx
    site-header.tsx
    site-footer.tsx
    page-placeholder.tsx
  data/
    members.ts            회주가 직접 큐레이팅 (회사 로고 그리드)
  lib/
    cn.ts                 clsx + tailwind-merge
    mock-records.ts       /records 가 붙기 전 더미
  types/
    member.ts
public/
  logo/                   狂 한자 로고 (webp/png)
```

## 디자인 토큰

`src/app/globals.css` 의 `@theme` 블록에 정의되어 있다. Tailwind 유틸로 바로 쓸 수 있다.

| 토큰 | 값 | 용도 |
|---|---|---|
| `bg-night` | `#0a0a0b` | 회관의 밤 (메인 배경) |
| `bg-hall` | `#111114` | 카드 / 표면 |
| `bg-hall-elevated` | `#16161a` | 살짝 올라온 표면 |
| `border-seam` | `#2a2a2e` | 구분선 |
| `text-bone` | `#ededed` | 본문 |
| `text-ash` | `#9a9aa0` | 보조 텍스트 |
| `text-gold` / `bg-gold` | `#e6c36a` | 강조 (오래된 황금, 횃불) |
| `text-glow` | `#7dd3fc` | 신호 / 점 연결 글로우 |
| `font-display` | Cinzel | 영문 헤드 |

## 권한 체계

| 내부 role | UI 명칭 | 권한 |
|---|---|---|
| `master` | **회주** | 모든 글 수정/삭제, 형제 관리, 입장문 관리 |
| `member` | **광인 형제** | 자기 글 작성/수정/삭제 |
| `guest` | 일반 방문자 | published 글 읽기 |

광인 형제가 되려면 `/oath` 에서 **도원결의 입장문**을 통과해야 한다. 입장문은 환경변수/DB에서 해시로만 관리한다 — 평문 절대 금지.

## 카피라이팅 톤

지켜야 할 것:
- 한국어 중심, 묵직하지만 위트
- "형제 / 회주 / 회관 / 광인 / 기록 / 도원결의" 명칭 일관
- 진지하지만 오글거리지 않게, 위트 있지만 가볍지 않게

피해야 할 것:
- "Welcome, Crazy One"
- "Access granted" / "Login successful"
- 마법 / 열쇠 / 던전 / 비밀결사 같은 판타지 어휘
- 흔한 SaaS 랜딩 문구

## 로드맵

- [x] Phase 1 — 프로젝트 세팅, 라우팅, 디자인 토대, 狂 로고
- [x] Phase 2 — 랜딩페이지 (7개 섹션 + 모션)
- [ ] Phase 3 — `/records` 읽기 구조 (mock → 정제)
- [ ] Phase 4 — Supabase 연결 (schema + RLS)
- [ ] Phase 5 — `/oath` 도원결의 인증
- [ ] Phase 6 — 글 CRUD (광인 형제)
- [ ] Phase 7 — `/admin` 회주 관리소
- [ ] Phase 8 — 멤버 회사 그리드 실데이터
- [ ] Phase 9 — SEO, OG, 배포

## 환경변수

`.env.example` 참고. Phase 4 부터 채운다.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OATH_FALLBACK_HASH=
```

## 협업 규칙

- 새 카피는 위 "톤" 기준 통과해야 한다. 어울리지 않으면 PR에서 다시 다듬는다.
- 멤버 회사 로고 / 그리드는 **회주가 직접 큐레이팅**. 자동 폼은 만들지 않는다 (톤 깨짐 방지).
- 광인 형제는 글만 쓴다. 디자인/구조 변경은 회주 또는 합의된 형제만.
- Phase 단위로 PR을 끊고, 각 PR은 `tsc --noEmit` + `eslint` + `npm run build` 통과를 기본 조건으로 한다.

## 라이선스

비공개 · 광인회관 내부 프로젝트.
