import { decryptAffine } from "./decrypt/affine";
import { decryptVigenere } from "./decrypt/vigenere";
import { playfairDecrypt } from "./decrypt/playfair";

interface DecryptInterface {
  slope?: number;
  intercept?: number;
  key?: string;
  decryptText: string;
  algorithm: string;
}

export const decrypt = ({
  slope,
  intercept,
  key,
  decryptText,
  algorithm,
}: DecryptInterface) => {
  switch (algorithm) {
    case "vigenere":
      // Enter function for vignere
      return decryptVigenere({isStandard:true, key, decryptText});
    case "varian-vigenere":
      return decryptVigenere({isStandard:false, key, decryptText});
    case "playfair":
      return playfairDecrypt({ key, decryptText });
    case "affine":
      return decryptAffine({ slope, intercept, decryptText });
  }
};
