import { EnigmaMachine, RotorInterface } from "../../type/engima.type";
import { space_remover } from "../../utils/remover";

interface EncryptEnigmaInterface {
  plainText: string;
  firstRotor?: RotorInterface;
  secondRotor?: RotorInterface;
  thirdRotor?: RotorInterface;
}

export const enigmaCipher = ({
  plainText,
  firstRotor,
  secondRotor,
  thirdRotor,
}: EncryptEnigmaInterface) => {
  const enigmaMachine = new EnigmaMachine(firstRotor, secondRotor, thirdRotor);
  enigmaMachine.encrypt( space_remover(plainText.toUpperCase()));
};
