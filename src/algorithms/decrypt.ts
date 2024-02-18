import { decryptAffine } from "./decrypt/affine";
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
    case "playfair":
      return playfairDecrypt({ key, decryptText });
    case "affine":
      return decryptAffine({ slope, intercept, decryptText });
  }
};
