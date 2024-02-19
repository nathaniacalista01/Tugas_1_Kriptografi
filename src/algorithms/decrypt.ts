import { decryptAffine } from "./decrypt/affine";
import { decryptHill } from "./decrypt/hill";
import { playfairDecrypt } from "./decrypt/playfair";

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
    case "playfair":
      return playfairDecrypt({ key, decryptText });
    case "affine":
      return decryptAffine({ slope, intercept, decryptText });
    case "hill":
      return decryptHill({ stringMatrix: matrix, decryptText });
  }
};
