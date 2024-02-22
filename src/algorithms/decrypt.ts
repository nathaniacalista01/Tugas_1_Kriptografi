import { decryptAffine } from "./decrypt/affine";

import { decryptVigenere } from "./decrypt/vigenere";

import { decryptHill } from "./decrypt/hill";

import { playfairDecrypt } from "./decrypt/playfair";
import { RotorInterface } from "../type/engima.type";
import { decryptEnigma } from "./decrypt/enigma";
import { decryptVigenereExt } from "./decrypt/vigenereExt";
import { superDecryption } from "./decrypt/super";
import { sanitized_text } from "../utils/plaintext.processing";

interface DecryptInterface {
  matrix?: string[][];
  slope?: number;
  intercept?: number;
  key?: string;
  decryptText: string;
  algorithm: string;
  firstRotor: RotorInterface;
  secondRotor: RotorInterface;
  thirdRotor: RotorInterface;
}

export const decrypt = ({
  matrix,
  slope,
  intercept,
  key,
  decryptText,
  algorithm,
  firstRotor,
  secondRotor,
  thirdRotor,
}: DecryptInterface) => {
  switch (algorithm) {
    case "vigenere":
      return decryptVigenere({
        isStandard: true,
        key,
        decryptText: sanitized_text(decryptText),
      });
    case "varian-vigenere":
      return decryptVigenere({
        isStandard: false,
        key,
        decryptText: sanitized_text(decryptText),
      });
    case "extended-vigenere":
      return decryptVigenereExt({ key, decryptText });
    case "super":
      return superDecryption({ key, decryptText });
    case "playfair":
      return playfairDecrypt({ key, decryptText });
    case "affine":
      return decryptAffine({
        slope,
        intercept,
        decryptText: sanitized_text(decryptText),
      });
    case "hill":
      return decryptHill({
        stringMatrix: matrix,
        decryptText: sanitized_text(decryptText),
      });
    case "enigma":
      return decryptEnigma({
        decryptText: sanitized_text(decryptText),
        firstRotor,
        secondRotor,
        thirdRotor,
      });
  }
};
