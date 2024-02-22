import { RotorInterface } from "../type/engima.type";
import { sanitized_text } from "../utils/plaintext.processing";
import { affineCipher } from "./encrypt/affine";
import { enigmaCipher } from "./encrypt/enigma";
import { hillCipher } from "./encrypt/hill";
import { playfair } from "./encrypt/playfair";
import { superEncryption } from "./encrypt/super";
import { vigenere } from "./encrypt/vigenere";
import { vigenereExt } from "./encrypt/vigenereExt";
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
  extension?: string;
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
  // const sanitized = sanitized_text(plainText);
  switch (algorithm) {
    case "vigenere":
      return vigenere({
        isStandard: true,
        key,
        plainText: sanitized_text(plainText),
      });
    case "varian-vigenere":
      return vigenere({
        isStandard: false,
        key,
        plainText: sanitized_text(plainText),
      });
    case "extended-vigenere":
      return vigenereExt({ key, plainText });
    case "super":
      return superEncryption({ key, plainText });
    case "playfair":
      return playfair({ key, plainText: sanitized_text(plainText) });
    case "affine":
      return affineCipher({
        slope,
        intercept,
        plainText: sanitized_text(plainText),
      });
    case "hill":
      return hillCipher({
        stringMatrix: matrix,
        plainText: sanitized_text(plainText),
      });
    case "enigma":
      return enigmaCipher({
        plainText: sanitized_text(plainText),
        firstRotor,
        secondRotor,
        thirdRotor,
      });
    default:
      break;
  }
};
