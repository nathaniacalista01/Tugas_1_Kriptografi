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
  let normalizedText = plainText.replace(/\s+/g, "").toLowerCase();
  normalizedText = normalizedText.replace(/[^a-zA-Z ]/g, "");
  const numbers = convertPlainTextToNumber(normalizedText);
  const matrix = new HillMatrix(stringMatrix);
  const plainTextMatrix = new HillMatrixPlainText(numbers, stringMatrix.length);
  const result = matrix.encryptMatrix(plainTextMatrix);
  return result;
};
