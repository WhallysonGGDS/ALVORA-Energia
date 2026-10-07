import type { ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  delay?: number;
  id?: string;
};

/** Título com reveal por linha (máscara + translate). As quebras são intencionais, não automáticas. */
export default function Lines({ as: Tag = "h2", lines, className = "", delay, id }: Props) {
  return (
    <Tag id={id} className={className} data-lines="" data-delay={delay}>
      {lines.map((l, i) => (
        <span className="line" key={i}>
          <span className="line-inner">{l}</span>
        </span>
      ))}
    </Tag>
  );
}
