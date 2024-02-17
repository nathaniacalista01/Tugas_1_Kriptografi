export const plainTextPlayfairConverter = (plainText: string) => {
  // Mengubah plain text sesuai dengan default dari si playfair
  const result = [];
  let i = 0;
  while (i < plainText.length) {
    let bigram = plainText[i];
    if (i + 1 < plainText.length) {
      if (plainText[i] === plainText[i + 1]) {
        bigram += "X";
        i += 1;
      } else {
        bigram += plainText[i + 1];
        i += 2;
      }
    } else {
      bigram += "X";
      i += 1;
    }
    result.push(bigram);
  }
  return result;
};
export const convertPlainTextToNumber = (normalizedText: string) => {
  return Array.from(normalizedText).map(
    (char) => char.charCodeAt(0) - "a".charCodeAt(0)
  );
};
