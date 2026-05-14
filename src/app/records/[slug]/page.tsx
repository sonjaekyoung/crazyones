import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata = { title: "기록" };

export default async function Page(props: PageProps<"/records/[slug]">) {
  const { slug } = await props.params;
  return (
    <PagePlaceholder
      eyebrow={`Record / ${slug}`}
      title="기록"
      line="이 자리에 형제의 글이 펼쳐진다."
    />
  );
}
