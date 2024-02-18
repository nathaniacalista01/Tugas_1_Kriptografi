import { affineCipher } from "./encrypt/affine";
import { hillCipher } from "./encrypt/hill";
import { playfair } from "./encrypt/playfair";

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
    case "vignere":
      // Enter function for vignere
      return "vignere";
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
