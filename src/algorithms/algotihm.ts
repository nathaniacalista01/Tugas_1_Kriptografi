import { playfair } from "./playfair";

interface EncryptInterface {
  key: string;
  plainText: string;
  algorithm: string;
}

export const encrypt = ({ key, plainText, algorithm }: EncryptInterface) => {
  switch (algorithm) {
    case "vignere":
      // Enter function for vignere
      return "vignere";
    case "playfair":
      return playfair({key,plainText});
    default:
      break;
  }
};
