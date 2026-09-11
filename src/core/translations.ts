import * as core from "@ptlabTadej/sitegen-landing-core/translations";

export * from "@ptlabTadej/sitegen-landing-core/translations";

/*
 * The core package ships its interface strings in title case — "Nazaj na Vrh", "Kdo Smo",
 * "Back to Top". Slovenian does not capitalise inner words, and Lumiera sets every label in
 * sentence case, so the strings are brought to sentence case here, once, for every component
 * that reads them. The proper fix belongs in the core package; until it lands there, this
 * keeps the theme right without touching the contract.
 *
 * A word is lowered only when it is plainly title-cased: one capital followed by lower-case
 * letters, hyphenated parts included ("E-pošto"). Words in capitals ("FAQ", "404"), words
 * with an inner capital ("LinkedIn") and the English "I" are left alone, and so is the first
 * word of every sentence and the word after a dash ("404 - Stran ni najdena").
 */
const TITLE_WORD = /^(\p{Lu}\p{Ll}*(?:[-’']\p{L}+)*)(\p{P}*)$/u;

export function toSentenceCase(text: string): string {
  let sentenceStart = true;

  return text
    .split(/(\s+)/)
    .map((token) => {
      if (token === "" || /^\s+$/.test(token)) return token;

      const match = token.match(TITLE_WORD);
      const result =
        !sentenceStart && match && match[1] !== "I"
          ? match[1].toLocaleLowerCase("sl") + match[2]
          : token;

      sentenceStart = /[.!?:]$/.test(token) || /^[-–—]$/.test(token);
      return result;
    })
    .join("");
}

/* Translation objects are shared per language, so each one is converted once. */
const converted = new WeakMap<object, unknown>();

function sentenceCaseDeep<T>(value: T): T {
  if (typeof value === "string") return toSentenceCase(value) as T;
  if (!value || typeof value !== "object") return value;

  const cached = converted.get(value as object);
  if (cached) return cached as T;

  const mapped = Array.isArray(value)
    ? value.map((item) => sentenceCaseDeep(item))
    : Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, item]) => [
          key,
          sentenceCaseDeep(item),
        ]),
      );

  converted.set(value as object, mapped);
  return mapped as T;
}

const sentenceCased =
  <A extends unknown[], R>(fn: (...args: A) => R) =>
  (...args: A): R =>
    sentenceCaseDeep(fn(...args));

export const getAboutTranslation = sentenceCased(core.getAboutTranslation);
export const getBlogTranslation = sentenceCased(core.getBlogTranslation);
export const getButtonTranslation = sentenceCased(core.getButtonTranslation);
export const getCallToActionTranslation = sentenceCased(core.getCallToActionTranslation);
export const getCareersTranslation = sentenceCased(core.getCareersTranslation);
export const getCataloguesTranslation = sentenceCased(core.getCataloguesTranslation);
export const getContactTranslation = sentenceCased(core.getContactTranslation);
export const getDemoPopupTranslation = sentenceCased(core.getDemoPopupTranslation);
export const getEventsTranslation = sentenceCased(core.getEventsTranslation);
export const getFaqTranslation = sentenceCased(core.getFaqTranslation);
export const getGalleryTranslation = sentenceCased(core.getGalleryTranslation);
export const getLegalTranslation = sentenceCased(core.getLegalTranslation);
export const getNotFoundTranslation = sentenceCased(core.getNotFoundTranslation);
export const getPortfolioTranslation = sentenceCased(core.getPortfolioTranslation);
export const getPriceTranslation = sentenceCased(core.getPriceTranslation);
export const getReviewTranslation = sentenceCased(core.getReviewTranslation);
export const getServicesTranslation = sentenceCased(core.getServicesTranslation);
export const getSubscriptionsTranslation = sentenceCased(core.getSubscriptionsTranslation);
export const getTeamTranslation = sentenceCased(core.getTeamTranslation);
export const getVideosTranslation = sentenceCased(core.getVideosTranslation);
export const getWhyUsTranslation = sentenceCased(core.getWhyUsTranslation);
