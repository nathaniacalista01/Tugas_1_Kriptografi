import { affineCipher } from "./encrypt/affine";
import { hillCipher } from "./encrypt/hill";
import { playfair } from "./encrypt/playfair";
import { vigenere } from "./encrypt/vigenere";
import { vigenereExt } from "./encrypt/vigenereExt";
interface EncryptInterface {
  matrix?: string[][];
  slope?: number;
  intercept?: number;
  key?: string;
  plainText: string;
  algorithm: string;
}

export const encrypt = ({
  matrix,
  slope,
  intercept,
  key,
  plainText,
  algorithm,
}: EncryptInterface) => {
  switch (algorithm) {
    case "vigenere":
      return vigenere({isStandard:true, key, plainText});
    case "varian-vigenere":
      return vigenere({isStandard:false, key, plainText});
    case "extended-vigenere":
      return vigenereExt({key, plainText});
    case "super":
      return "super";
    case "playfair":
      return playfair({ key, plainText });
    case "affine":
      return affineCipher({ slope, intercept, plainText });
    case "hill":
      return hillCipher({ stringMatrix: matrix, plainText });
    default:
      break;
  }
};
