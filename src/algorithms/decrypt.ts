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
}: DecryptInterface) => {
  let extension;
  let content = decryptText;
  console.log('content')
  console.log(content)
  const parts = decryptText.split(".");
  if (parts.length > 1) {
    extension = parts[parts.length-1];
    content  = parts.slice(0, -1).join("")
  }
  
  console.log("Ini extension : ", extension);

  switch (algorithm) {
    case "vigenere":
      // Enter function for vignere
      return decryptVigenere({ isStandard: true, key, decryptText : content, extension });
    case "varian-vigenere":
      return decryptVigenere({ isStandard: false, key, decryptText : content, extension });
    case "extended-vigenere":
      return decryptVigenereExt({ key, decryptText : content, extension});
    case "super":
      return superDecryption({ key, decryptText : content, extension});
    case "playfair":
      return playfairDecrypt({ key, decryptText : content, extension });
    case "affine":
      return decryptAffine({ slope, intercept, decryptText : content, extension });
    case "hill":
      return decryptHill({ stringMatrix: matrix, decryptText : content, extension });
    case "enigma":
      return decryptEnigma({
        decryptText,
        firstRotor,
        secondRotor,
        thirdRotor,
        extension,
      });
  }
};
