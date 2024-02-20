import { decryptAffine } from "./decrypt/affine";

import { decryptVigenere } from "./decrypt/vigenere";

import { decryptHill } from "./decrypt/hill";

import { playfairDecrypt } from "./decrypt/playfair";
import { decryptVigenereExt } from "./decrypt/vigenereExt";

interface DecryptInterface {
  matrix?: string[][];
  slope?: number;
  intercept?: number;
  key?: string;
  decryptText: string;
  algorithm: string;
}

export const decrypt = ({
  matrix,
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
    case "extended-vigenere":
        return decryptVigenereExt({key, decryptText, isFile: false})
    case "playfair":
      return playfairDecrypt({ key, decryptText });
    case "affine":
      return decryptAffine({ slope, intercept, decryptText });
    case "hill":
      return decryptHill({ stringMatrix: matrix, decryptText });
  }
};
