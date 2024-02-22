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
  console.log("Ini decryp text length", decryptText.length);
  switch (algorithm) {
    case "vigenere":
      // Enter function for vignere
      return decryptVigenere({ isStandard: true, key, decryptText });
    case "varian-vigenere":
      return decryptVigenere({ isStandard: false, key, decryptText });
    case "extended-vigenere":
      return decryptVigenereExt({ key, decryptText });
    case "super":
      return superDecryption({ key, decryptText });
    case "playfair":
      return playfairDecrypt({ key, decryptText });
    case "affine":
      return decryptAffine({ slope, intercept, decryptText });
    case "hill":
      return decryptHill({ stringMatrix: matrix, decryptText });
    case "enigma":
      return decryptEnigma({
        decryptText,
        firstRotor,
        secondRotor,
        thirdRotor,
      });
  }
};
