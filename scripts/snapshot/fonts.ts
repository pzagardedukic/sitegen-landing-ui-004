/**
 * Next's font compiler is not run during META rendering.
 *
 * These names are this theme's own: Lumiera sets headings in Fraunces and everything else
 * in Figtree (see `src/app/theme/fonts.ts`). The bundle resolves `next/font/google` to this
 * file, so a family imported there and missing here fails the standalone build rather than
 * falling back quietly.
 */
const font =
  (name: string) =>
  (options: { variable?: string } = {}) => ({
    style: { fontFamily: `'${name}', sans-serif` },
    variable: options.variable || "",
    className: "",
  });
export const Fraunces = font("Fraunces");
export const Figtree = font("Figtree");
