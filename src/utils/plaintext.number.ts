export const convertPlainTextToNumber = (normalizedText : string) => {
  return Array.from(normalizedText).map(
    (char) => char.charCodeAt(0) - "a".charCodeAt(0)
  );
};
