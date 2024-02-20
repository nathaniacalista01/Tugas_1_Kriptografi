import { HillMatrix, HillMatrixPlainText } from "../../type/hill.type";
import { convertPlainTextToNumber } from "../../utils/plaintext.processing";

interface HillCipherProps {
  stringMatrix?: string[][];
  plainText: string;
}
export const hillCipher = ({
  stringMatrix = [
    ["", ""],
    ["", ""],
  ],
  plainText,
}: HillCipherProps) => {
    console.log("INi matrix :", stringMatrix, plainText);
  const normalizedText = plainText.replace(/\s+/g, "").toLowerCase();
  const numbers = convertPlainTextToNumber(normalizedText);
  console.log("Ino normalized", plainText)
  console.log("Ini numbers : ", numbers)
  const matrix = new HillMatrix(stringMatrix);
  const plainTextMatrix = new HillMatrixPlainText(numbers, stringMatrix.length);
  const result = matrix.encryptMatrix(plainTextMatrix);
  return result;
};
