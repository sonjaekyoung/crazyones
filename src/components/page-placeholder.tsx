import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: string;
  line?: string;
  className?: string;
};

export function PagePlaceholder({ eyebrow, title, line, className }: Props) {
  return (
    <section
      className={cn(
        "flex min-h-[60vh] items-center justify-center px-6",
        className,
      )}
    >
      <div className="max-w-xl text-center">
        {eyebrow && (
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-ash">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {line && <p className="mt-6 text-ash">{line}</p>}
        <p className="mt-12 text-[10px] uppercase tracking-[0.4em] text-ash/50">
          곧, 이 자리에 기록이 쌓인다
        </p>
      </div>
    </section>
  );
}
