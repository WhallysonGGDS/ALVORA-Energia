/** Marca ALVORA: o sol nascendo sobre a linha do horizonte. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 28 16" className="h-[14px] w-auto" aria-hidden fill="none">
        <path d="M5 14a9 9 0 0 1 18 0" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="14" cy="14" r="3.2" fill="var(--color-sun)" />
        <path d="M0 14.9h28" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="text-[15px] font-medium tracking-[0.32em]">ALVORA</span>
    </span>
  );
}
