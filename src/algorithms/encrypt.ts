import { RotorInterface } from "../type/engima.type";
import { affineCipher } from "./encrypt/affine";
import { enigmaCipher } from "./encrypt/enigma";
import { hillCipher } from "./encrypt/hill";
import { playfair } from "./encrypt/playfair";
import { vigenere } from "./encrypt/vigenere";


interface EncryptInterface {
  matrix?: string[][];
  slope?: number;
  intercept?: number;
  key?: string;
  plainText: string;
  algorithm: string;
  firstRotor?: RotorInterface;
  secondRotor?: RotorInterface;
  thirdRotor?: RotorInterface;
}

export const encrypt = ({
  matrix,
  slope,
  intercept,
  key,
  plainText,
  algorithm,
  firstRotor,
  secondRotor,
  thirdRotor,
}: EncryptInterface) => {
  switch (algorithm) {
    case "vigenere":
      // Enter function for vignere
      return vigenere({ isStandard: true, key, plainText });
    case "varian-vigenere":
      return vigenere({ isStandard: false, key, plainText });
    case "extended-vigenere":
      return "extended";
    case "super":
      return "super";
    case "playfair":
      return playfair({ key, plainText });
    case "affine":
      return affineCipher({ slope, intercept, plainText });
    case "hill":
      return hillCipher({ stringMatrix: matrix, plainText });
    case "enigma":
      return enigmaCipher({ plainText, firstRotor, secondRotor, thirdRotor });
    default:
      break;
  }
};
