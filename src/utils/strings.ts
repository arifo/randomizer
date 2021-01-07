export const isNumber = (text: string) => /^[0-9]*$/.test(text);
export const isLetter = (text: string) => /^[A-Za-z]*$/.test(text);

export function pluralize(count: number, str: string, countText?: string) {
  if (typeof count === 'number' && count !== 1) {
    return `${countText || count} ${str}s`;
  }
  return `${countText || count} ${str}`;
}

export const uniqueId = () =>
  Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
