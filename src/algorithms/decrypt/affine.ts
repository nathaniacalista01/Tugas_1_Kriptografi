import { space_remover } from "../../utils/remover";

interface DecryptAffineCipherProps {
  slope?: number;
  intercept?: number;
  decryptText: string;
}

export const decryptAffine = ({
  slope = 0,
  intercept = 0,
  decryptText,
}: DecryptAffineCipherProps) => {
  let plainText = "";
  const decrypt = space_remover(decryptText).toUpperCase();
  let a_inverse = 0;
  for (let i = 0; i < 26; i++) {
    if ((slope * i) % 26 == 1) {
      a_inverse = i;
    }
  }
  for (const char of decrypt) {
    const number = String.fromCharCode(
      ((a_inverse * (char.charCodeAt(0) + 65 - intercept)) % 26) + 65
    );
    plainText += number;
  }
  console.log("Ini plain text : ", plainText);
  return plainText;
};
