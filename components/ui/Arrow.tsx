export function Arrow({ className = "", diagonal = false }: { className?: string; diagonal?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`h-[0.9em] w-[0.9em] ${diagonal ? "-rotate-45" : ""} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}
