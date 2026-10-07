import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** atributos de motion repassados ao wrapper (data-clip, data-parallax...) */
  motion?: Record<string, string | number | undefined>;
};

/** Fotografia protagonista: wrapper com overflow para parallax/clip, next/image com fill. */
export default function Photo({ src, alt, sizes, priority, className = "", imgClassName = "", motion }: Props) {
  return (
    <div className={`media ${className}`} {...motion}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={80}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}
