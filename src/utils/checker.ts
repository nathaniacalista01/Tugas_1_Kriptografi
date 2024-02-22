import React from "react";
import { RotorInterface } from "../type/engima.type";

export const checkVignere = (plainText?: string, key?: string) => {
  const isValid = plainText !== "" && key !== "";
  return !isValid;
};

const checkRotor = (
  rotor: RotorInterface,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  const cleanInnerRing = rotor.innerRing
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase();
  const result =
    cleanInnerRing.length === 26 && new Set(cleanInnerRing).size === 26;
  if (!result) {
    setErrorMessage("Rotor must consist of alphabet A-Z");
  } else {
    setErrorMessage("");
  }
  return result;
};

const checkMatrix = (matrix: string[][], plainText: string) => {
  for (const row of matrix) {
    for (const cell of row) {
      if (cell === "") {
        return true;
      }
    }
  }
  // If no cell is an empty string, the matrix is valid
  return plainText === "" ? true : false;
};

export const checkButton = (
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  algorithm: string,
  matrix: string[][],
  plainText: string,
  firstRotor?: RotorInterface,
  secondRotor?: RotorInterface,
  thirdRotor?: RotorInterface,
  slope?: number,
  intercept?: number,
  key?: string
) => {
  if (algorithm === "") {
    setIsDisabled(true);
  } else {
    switch (algorithm) {
      case "extended-vigenere":
        setIsDisabled(checkVignere(plainText, key));
        break;
      case "varian-vigenere":
        setIsDisabled(checkVignere(plainText, key));
        break;
      case "super":
        setIsDisabled(checkVignere(plainText, key));
        break;
      case "playfair":
        setIsDisabled(checkVignere(plainText, key));
        break;
      case "vigenere":
        setIsDisabled(checkVignere(plainText, key));
        break;
      case "affine":
        setIsDisabled(!(slope && intercept));
        break;
      case "hill":
        setIsDisabled(checkMatrix(matrix, plainText));
        break;
      case "enigma":
        if (firstRotor && secondRotor && thirdRotor) {
          setIsDisabled(
            !(
              checkRotor(firstRotor, setErrorMessage) &&
              checkRotor(secondRotor, setErrorMessage) &&
              checkRotor(thirdRotor, setErrorMessage)
            )
          );
        } else {
          setIsDisabled(true);
        }

        break;
    }
  }
};
