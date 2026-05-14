import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata = { title: "회관 관리소", robots: { index: false } };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="The Keep"
      title="회관 관리소"
      line="회주만 이 문을 열 수 있다."
    />
  );
}
