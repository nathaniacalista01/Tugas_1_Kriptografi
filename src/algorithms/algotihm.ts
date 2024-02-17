import { affineCipher } from "./affine";
import { playfair } from "./playfair";

interface EncryptInterface {
  slope? : number;
  intercept?:number;
  key?: string;
  plainText: string;
  algorithm: string;
}

export const encrypt = ({ slope,intercept,key, plainText, algorithm }: EncryptInterface) => {
  switch (algorithm) {
    case "vignere":
      // Enter function for vignere
      return "vignere";
    case "playfair":
      return playfair({key,plainText});
    case "affine":
      return affineCipher({slope,intercept,plainText})
    default:
      break;
  }
};
