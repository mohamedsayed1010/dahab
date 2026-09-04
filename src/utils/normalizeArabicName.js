/**
 * Arabic name handling for the login form.
 *
 * Mirrors backend src/utils/normalizeArabicName.js exactly, so the two
 * sides agree on what counts as "the same name".
 *
 * IMPORTANT - two different jobs:
 *
 *   cleanNameForSubmit()  what we actually SEND. Removes only things the
 *                         user cannot have meant (stray/duplicated spaces,
 *                         zero-width characters). Letters are left exactly
 *                         as typed, because /api/auth/signin also CREATES
 *                         the account on a first-time phone - folding here
 *                         would permanently store a different spelling.
 *
 *   normalizeArabicName() full fold, for comparing two names on the client.
 *                         The backend applies the same fold and remains
 *                         authoritative for the actual login decision.
 */

const INVISIBLE = /[\u200B-\u200F\u2060\u00AD\u061C\uFEFF]/g;
const TATWEEL = /\u0640/g;
const TASHKEEL = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g;
const WHITESPACE = /\s+/g;

const LETTER_FOLD = {
  "\u0629": "\u0647", // ta marbuta -> ha
  "\u0649": "\u064A", // alef maksura -> yeh
  "\u0623": "\u0627", // alef hamza above -> alef
  "\u0625": "\u0627", // alef hamza below -> alef
  "\u0622": "\u0627", // alef madda -> alef
  "\u0671": "\u0627", // alef wasla -> alef
  "\u0624": "\u0648", // waw hamza -> waw
  "\u0626": "\u064A", // yeh hamza -> yeh
};

/** Safe cleanup of the value we transmit. Letters are preserved. */
export const cleanNameForSubmit = (value) => {
  if (typeof value !== "string") return "";

  return value
    .normalize("NFC")
    .replace(INVISIBLE, "")
    .replace(WHITESPACE, " ")
    .trim();
};

/** Full normalisation - same rules as the backend. For comparison only. */
export const normalizeArabicName = (value) => {
  if (typeof value !== "string") return "";

  let out = value.normalize("NFC");

  out = out.replace(INVISIBLE, "");
  out = out.replace(TATWEEL, "");
  out = out.replace(TASHKEEL, "");

  out = Array.from(out, (ch) => LETTER_FOLD[ch] ?? ch).join("");

  out = out.replace(WHITESPACE, " ").trim();

  return out;
};

export const namesMatch = (a, b) =>
  normalizeArabicName(a).toLowerCase() === normalizeArabicName(b).toLowerCase();

export default normalizeArabicName;
