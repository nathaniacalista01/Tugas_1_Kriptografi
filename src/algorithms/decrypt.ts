import { decryptAffine } from "./decrypt/affine";

import { decryptVigenere } from "./decrypt/vigenere";

import { decryptHill } from "./decrypt/hill";

import { playfairDecrypt } from "./decrypt/playfair";
import { RotorInterface } from "../type/engima.type";
import { decryptEnigma } from "./decrypt/enigma";
import { decryptVigenereExt } from "./decrypt/vigenereExt";
import { superDecryption } from "./decrypt/super";

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
  extension?: string;
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
  extension,
}: DecryptInterface) => {
  switch (algorithm) {
    case "vigenere":
      // Enter function for vignere
      return decryptVigenere({ isStandard: true, key, decryptText, extension });
    case "varian-vigenere":
      return decryptVigenere({ isStandard: false, key, decryptText, extension });
    case "extended-vigenere":
      return decryptVigenereExt({ key, decryptText, extension });
    case "super":
      return superDecryption({ key, decryptText, extension });
    case "playfair":
      return playfairDecrypt({ key, decryptText, extension });
    case "affine":
      return decryptAffine({ slope, intercept, decryptText, extension });
    case "hill":
      return decryptHill({ stringMatrix: matrix, decryptText, extension });
    case "enigma":
      return decryptEnigma({
        decryptText,
        firstRotor,
        secondRotor,
        thirdRotor,
        extension
      });
  }
};
