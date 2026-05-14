# 광인 형제 이미지

광인 형제 카드에 사용할 로고/얼굴 사진 자리.

## 파일 규칙

각 형제마다 두 파일을 넣는다 (id 는 `src/data/brothers.ts` 의 entry 와 일치).

- `{id}-logo.svg` — 회사 로고 (SVG 우선, 안 되면 PNG 투명)
- `{id}-founder.jpg` — 형제 얼굴 (1:1 또는 4:5, 1200px 이상 권장)

### 예시

```
liner-logo.svg
liner-founder.jpg
wrtn-logo.svg
wrtn-founder.jpg
```

## 등록

파일을 넣은 뒤 `src/data/brothers.ts` 의 해당 entry 에 경로를 추가한다.

```ts
{
  id: "liner",
  companyName: "Liner",
  founderName: "김광인",
  logoUrl: "/images/brothers/liner-logo.svg",
  founderImageUrl: "/images/brothers/liner-founder.jpg",
  websiteUrl: "https://getliner.com",
}
```

로고/사진 중 하나만 있어도 카드가 깨지지 않는다 — 없는 쪽은 fallback UI 가 자동으로 표시된다.
