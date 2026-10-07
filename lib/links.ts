export type ExternalKey = "cliente" | "fornecedores" | "carreiras" | "imprensa" | "linkedin" | "instagram" | "youtube";

/**
 * Destinos fora da página (portais e redes).
 * Ainda não existem: enquanto o valor for null, o link leva ao contato (#contato).
 * Quando houver a URL real, troque aqui e todos os pontos do site são atualizados.
 */
export const EXTERNAL: Record<ExternalKey, string | null> = {
  cliente: null,
  fornecedores: null,
  carreiras: null,
  imprensa: null,
  linkedin: null,
  instagram: null,
  youtube: null,
};

export const externalHref = (key: ExternalKey) => EXTERNAL[key] ?? "#contato";
