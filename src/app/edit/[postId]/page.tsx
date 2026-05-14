import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata = { title: "기록 고쳐쓰기" };

export default async function Page(props: PageProps<"/edit/[postId]">) {
  const { postId } = await props.params;
  return (
    <PagePlaceholder
      eyebrow={`Revise / ${postId}`}
      title="기록 고쳐쓰기"
      line="자신이 새긴 글만 다시 다듬을 수 있다."
    />
  );
}
