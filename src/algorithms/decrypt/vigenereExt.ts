
interface vigenereExtDecryptInterface {
  key?: string;
  decryptText: string;
}

export const decryptVigenereExt = ({
  key = "",
  decryptText,
}: vigenereExtDecryptInterface) => {
  let decryptedText = decryptText;
  const keyLength = key.length;
  for (let i = 0; i < decryptText.length; i++) {
    const charCodeCipherText = decryptText.charCodeAt(i);
    const charCodeKey = key.charCodeAt(i % keyLength);

    const decryptedCharCode = (charCodeCipherText - charCodeKey) % 256;
    decryptedText += String.fromCharCode(decryptedCharCode);
  }

  return decryptedText;
};
