import { converStringRotorToNumber } from "../utils/rotor";

export interface RotorInterface {
  innerRing: string;
  initialPosition: string;
}

export class Rotor {
  private outerRing: number[];
  private innerRing: number[];
  public constructor(rotor: RotorInterface) {
    this.innerRing = converStringRotorToNumber(rotor.innerRing.toUpperCase());
    const initialPositionNumber =
      rotor.initialPosition.toUpperCase().charCodeAt(0) - "A".charCodeAt(0) + 1;

    this.outerRing = [];

    for (let i = initialPositionNumber; i <= 26; i++) {
      this.outerRing.push(i);
    }

    for (let i = 1; i < initialPositionNumber; i++) {
      this.outerRing.push(i);
    }
  }

  public encrypt(input: number) {
    const outerNumber = this.outerRing[input];
    const innerNumber = this.innerRing.indexOf(outerNumber);
    return innerNumber;
  }

  public decrypt(input: number) {
    const innerNumber = this.innerRing[input];
    const outerNumber = this.outerRing.indexOf(innerNumber);
    return outerNumber;
  }

  public rotate() {
    const outerNumber = this.outerRing.pop();
    const innerNumber = this.innerRing.pop();

    if (outerNumber && innerNumber) {
      this.outerRing.unshift(outerNumber);
      this.innerRing.unshift(innerNumber);
    }
  }
}

export class EnigmaMachine {
  private rotors: Rotor[] = [];
  constructor(
    firstRotor: RotorInterface = {
      innerRing: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      initialPosition: "A",
    },
    secondRotor: RotorInterface = {
      innerRing: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      initialPosition: "B",
    },
    thirdRotor: RotorInterface = {
      innerRing: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      initialPosition: "C",
    }
  ) {
    this.rotors.push(new Rotor(firstRotor));
    this.rotors.push(new Rotor(secondRotor));
    this.rotors.push(new Rotor(thirdRotor));
  }

  public encrypt(plainText: string) {
    const numbers = converStringRotorToNumber(plainText.toUpperCase());
    let results = "";
    let currentRotor = 2;
    let rotationCount = 0;
    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i];
      const firstResult = this.rotors[0].encrypt(number - 1);

      const secondResult = this.rotors[1].encrypt(firstResult);

      const finalResult = this.rotors[2].encrypt(secondResult);

      results += String.fromCharCode(65 + finalResult);

      rotationCount += 1;
      this.rotors[currentRotor].rotate();

      if (rotationCount === 26) {
        if (currentRotor === 0) {
          currentRotor = 2;
        } else {
          currentRotor -= 1;
        }
        rotationCount = 1;
        this.rotors[currentRotor].rotate();
      }
    }
    return results;
  }

  public decrypt(decryptText: string) {
    const numbers = converStringRotorToNumber(decryptText);
    let results = "";
    let currentRotor = 2;
    let rotationCount = 0;
    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i];
      const firstResult = this.rotors[2].decrypt(number - 1);

      const secondResult = this.rotors[1].decrypt(firstResult);

      const finalResult = this.rotors[0].decrypt(secondResult);

      results += String.fromCharCode(65 + finalResult);
      
      rotationCount += 1;
      this.rotors[currentRotor].rotate();

      if (rotationCount === 26) {
        if (currentRotor === 0) {
          currentRotor = 2;
        } else {
          currentRotor -= 1;
        }
        rotationCount = 1;
        this.rotors[currentRotor].rotate();
      }
    }
    return results;
  }
}
