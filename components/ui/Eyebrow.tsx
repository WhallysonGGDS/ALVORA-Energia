/** Marcador de capítulo: número + nome, alinhados a uma hairline. */
export default function Eyebrow({ n, children, className = "" }: { n: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span data-fade="" className="label tabular-nums opacity-50">
        {n}
      </span>
      <span data-draw="" className="hairline w-10 opacity-40" />
      <span data-fade="" className="label">
        {children}
      </span>
    </div>
  );
}
