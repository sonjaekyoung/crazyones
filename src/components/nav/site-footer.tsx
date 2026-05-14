export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-seam/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-ash">
            Here&rsquo;s to the Crazy Ones
          </p>
          <p className="mt-3 text-sm text-ash">미쳐야 미친다.</p>
        </div>
        <p className="text-xs text-ash/60">© {year} 광인회관</p>
      </div>
    </footer>
  );
}
