import { EnigmaMachine, RotorInterface } from "../../type/engima.type";
import { space_remover } from "../../utils/remover";

interface EncryptEnigmaInterface {
  plainText: string;
  firstRotor?: RotorInterface;
  secondRotor?: RotorInterface;
  thirdRotor?: RotorInterface;
  extension?: string;
}

export const enigmaCipher = ({
  plainText,
  firstRotor,
  secondRotor,
  thirdRotor,
  extension,
}: EncryptEnigmaInterface) => {
  const enigmaMachine = new EnigmaMachine(firstRotor, secondRotor, thirdRotor);
  const result = enigmaMachine.encrypt(space_remover(plainText.toUpperCase()));

  if (extension) {
    return result + "." + extension;
  }
  return result;
};
