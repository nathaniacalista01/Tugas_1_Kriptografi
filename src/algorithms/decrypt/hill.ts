import { HillMatrix, HillMatrixPlainText } from "../../type/hill.type";
import { convertPlainTextToNumber } from "../../utils/plaintext.processing";
import { space_remover } from "../../utils/remover";

interface DecryptHillCipherProps {
  stringMatrix?: string[][];
  decryptText: string;
  extension? : string;
}

export const decryptHill = ({
  stringMatrix = [
    ["", ""],
    ["", ""],
  ],
  decryptText,
  extension
}: DecryptHillCipherProps) => {
  const normalizedText = space_remover(decryptText).toLowerCase();
  const numbers = convertPlainTextToNumber(normalizedText);
  const matrix = new HillMatrix(stringMatrix);
  const decryptTextMatrix = new HillMatrixPlainText(
    numbers,
    stringMatrix.length
  );
  const result = matrix.decryptMatrix(decryptTextMatrix);
  if(extension){
    return result + "." + extension
  }
  return result;
};
