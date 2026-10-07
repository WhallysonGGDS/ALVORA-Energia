import { Arrow } from "./Arrow";

type Props = {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** CTA: texto + seta que avança, sublinhado que se desenha no hover. */
export default function CtaLink({ href, children, tone = "dark", className = "" }: Props) {
  const color = tone === "light" ? "text-paper" : "text-ink";
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center gap-4 pb-2 text-[0.8125rem] font-medium uppercase tracking-[0.14em] ${color} ${className}`}
    >
      <span>{children}</span>
      <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-current/25 transition-colors duration-500 group-hover:border-sun group-hover:bg-sun group-hover:text-ink">
        <Arrow className="transition-transform duration-500 ease-cine group-hover:translate-x-[2px]" />
      </span>
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-[0.18] bg-current/60 transition-transform duration-700 ease-cine group-hover:scale-x-100" />
    </a>
  );
}
