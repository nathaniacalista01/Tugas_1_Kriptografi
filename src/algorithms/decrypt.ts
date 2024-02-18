import { playfairDecrypt } from "./decrypt/playfair";

interface DecryptInterface {
  key?: string;
  plainText: string;
  algorithm: string;
}

export const decrypt = ({ key, plainText, algorithm }: DecryptInterface) => {
  switch (algorithm) {
    case "playfair":
      return playfairDecrypt({ key, decryptText : plainText });
  }
};
