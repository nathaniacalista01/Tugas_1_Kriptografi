import { space_remover } from "../../utils/remover";

interface AffineCipherProps {
  slope?: number;
  intercept?: number;
  plainText: string;
  extension?: string;
}

export const affineCipher = ({
  slope = 0,
  intercept = 0,
  plainText,
  extension,
}: AffineCipherProps) => {
  let cipher = "";
  const text = space_remover(plainText)
    .toUpperCase()
    .replace(/[^A-Z]/g, "");

  console.log("Ini text : ", text);
  for (let i = 0; i < text.length; i++) {
    let charCode = plainText.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      charCode = ((slope * (charCode - 65) + intercept) % 26) + 65;
      cipher += String.fromCharCode(charCode);
    } else if (charCode >= 97 && charCode <= 122) {
      charCode = ((slope * (charCode - 97) + intercept) % 26) + 97;
      cipher += String.fromCharCode(charCode);
    }
  }
  if (extension) {
    console.log("Ada extension")
    return cipher + "." + extension;
  }
  return cipher;
};
