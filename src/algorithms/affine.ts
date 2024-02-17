import { space_remover } from "../utils/remover";

interface AffineCipherProps {
  slope?: number;
  intercept?: number;
  plainText: string;
}

export const affineCipher = ({
  slope = 0,
  intercept = 0,
  plainText,
}: AffineCipherProps) => {
  let cipher = "";
  const text = space_remover(plainText).toUpperCase();
  for (const char of text) {
    const charCode =
      ((slope * (char.charCodeAt(0) - 65) + intercept) % 26) + 65;
    cipher += String.fromCharCode(charCode);
  }
  return cipher;
};
