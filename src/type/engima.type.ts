import { converStringRotorToNumber } from "../utils/rotor";

export interface RotorInterface {
  innerRing: string;
  initialPosition: string;
}

export class Rotor {
  private outerRing: number[];
  private innerRing: number[];
  public constructor(rotor: RotorInterface) {
    // console.log(rotor.outerRing)
    this.innerRing = converStringRotorToNumber(rotor.innerRing.toUpperCase());
    // console.log("Ini awal2 outer ring : ", this.outerRing)
    const initialPositionNumber =
      rotor.initialPosition.toUpperCase().charCodeAt(0) - "A".charCodeAt(0) + 1;

    this.outerRing = [];

    for (let i = initialPositionNumber; i <= 26; i++) {
      this.outerRing.push(i);
    }

    for (let i = 1; i < initialPositionNumber; i++) {
      this.outerRing.push(i);
    }
    console.log("Selesai construct rotor : ", this.outerRing, this.innerRing);
  }

  public encrypt(input: number) {
    // Ubah plain text jadi angka
    const outerNumber = this.outerRing[input];
    // console.log("Inii outer number : ", outerNumber);
    const innerNumber = this.innerRing.indexOf(outerNumber);
    // console.log("Ini innernumber : ", innerNumber);
    return innerNumber;
  }

  public decrypt(input: number) {
    const innerNumber = this.innerRing[input];
    const outerNumber = this.outerRing.indexOf(innerNumber);
    return outerNumber;
  }

  public rotate() {
    console.log("======= BEFORE ==========");
    console.log(this.outerRing, this.innerRing);
    const outerNumber = this.outerRing.pop();
    const innerNumber = this.innerRing.pop();

    if (outerNumber && innerNumber) {
      this.outerRing.unshift(outerNumber);
      this.innerRing.unshift(innerNumber);
    }
    console.log("=======AFTER============");
    console.log(this.outerRing, this.innerRing);
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
    console.log("Ini numbers : ", numbers);
    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i];
      const firstResult = this.rotors[0].encrypt(number - 1);
      console.log("Start 1 : ", firstResult);

      const secondResult = this.rotors[1].encrypt(firstResult);
      console.log("Start 2 : ", secondResult);

      console.log("Start 3 : ");
      const finalResult = this.rotors[2].encrypt(secondResult);
      console.log("Start 3 : ", finalResult);

      //   console.log(finalResult+1)
      results += String.fromCharCode(65 + finalResult);
      //   console.log(this.rotors[currentRotor]);
      //   console.log(this.rotors[currentRotor]);

      rotationCount += 1;
      this.rotors[currentRotor].rotate();

      if (rotationCount === 26) {
        console.log("Ganti rotor");
        console.log(this.rotors[currentRotor]);
        if (currentRotor === 0) {
          currentRotor = 2;
        } else {
          currentRotor -= 1;
        }
        rotationCount = 1;
        console.log(this.rotors[currentRotor]);
        this.rotors[currentRotor].rotate();
      }
    }
    // console.log("Ini results : ", results);
    return results;
  }

  public decrypt(decryptText: string) {
    const numbers = converStringRotorToNumber(decryptText);
    let results = "";
    let currentRotor = 2;
    let rotationCount = 0;
    console.log("Ini numbers : ", numbers);
    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i];
      const firstResult = this.rotors[2].decrypt(number - 1);
      console.log("Start 1 : ", firstResult);

      const secondResult = this.rotors[1].decrypt(firstResult);
      console.log("Start 2 : ", secondResult);

      console.log("Start 3 : ");
      const finalResult = this.rotors[0].decrypt(secondResult);
      console.log("Start 3 : ", finalResult);

      //   console.log(finalResult+1)
      results += String.fromCharCode(65 + finalResult);
      //   console.log(this.rotors[currentRotor]);
      //   console.log(this.rotors[currentRotor]);

      rotationCount += 1;
      this.rotors[currentRotor].rotate();

      if (rotationCount === 26) {
        console.log("Ganti rotor");
        console.log(this.rotors[currentRotor]);
        if (currentRotor === 0) {
          currentRotor = 2;
        } else {
          currentRotor -= 1;
        }
        rotationCount = 1;
        console.log(this.rotors[currentRotor]);
        this.rotors[currentRotor].rotate();
      }
    }
    // console.log("Ini results : ", results);
    return results;
  }
}
