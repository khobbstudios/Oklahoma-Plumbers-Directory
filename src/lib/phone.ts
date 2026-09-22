/** Formats a US E.164 number ("+19182186868") as "(918) 218-6868". */
export function formatPhoneNumber(phoneE164: string): string {
  const digits = phoneE164.replace(/^\+1/, "");
  const area = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const line = digits.slice(6, 10);
  return `(${area}) ${prefix}-${line}`;
}
