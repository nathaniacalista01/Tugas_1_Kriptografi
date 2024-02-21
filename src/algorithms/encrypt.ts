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
  extension,
}: EncryptInterface) => {
  // console.log("Ini extension : ", extension)
  const sanitized = sanitized_text(plainText);
  console.log(sanitized);
  console.log("ini ext", extension);
  switch (algorithm) {
    case "vigenere":
      return vigenere({ isStandard: true, key, plainText });
    case "varian-vigenere":
      return vigenere({ isStandard: false, key, plainText });
    case "extended-vigenere":
      return vigenereExt({ key, plainText });
    case "super":
      return superEncryption({ key, plainText });
    case "playfair":
      return playfair({ key, plainText: sanitized, extension });
    case "affine":
      return affineCipher({
        slope,
        intercept,
        plainText: sanitized,
        extension,
      });
    case "hill":
      return hillCipher({
        stringMatrix: matrix,
        plainText: sanitized,
        extension,
      });
    case "enigma":
      return enigmaCipher({
        plainText: sanitized,
        firstRotor,
        secondRotor,
        thirdRotor,
      });
    default:
      break;
  }
};
