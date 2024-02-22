
interface vigenereExtInterface {
  key?: string;
  plainText: string;
}

export const vigenereExt = ({ key = "", plainText }: vigenereExtInterface) => {
  //   plainText = space_remover(plainText);
  const keyLength = key.length;
  console.log("Ini pl;ain text di vignere ext", plainText.length);
  let cipherText = "";
  for (let i = 0; i < plainText.length; i++) {
    let charCode = plainText.charCodeAt(i);
    charCode = charCode + (key.charCodeAt(i % keyLength) % 256);
    cipherText += String.fromCharCode(charCode);
  }
  console.log("Ini cipher text : ", plainText.length);
  return cipherText;
};
