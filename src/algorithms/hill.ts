import { HillMatrix, HillMatrixPlainText } from "../type/hill.type";
import { convertPlainTextToNumber } from "../utils/plaintext.processing";

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
  //   console.log("INi matrix :", matrix, plainText);
  const normalizedText = plainText.replace(/\s+/g, "").toLowerCase();
  const numbers = convertPlainTextToNumber(normalizedText);
  const matrix = new HillMatrix(stringMatrix);
  const plainTextMatrix = new HillMatrixPlainText(numbers, stringMatrix.length);

  console.log("Ini matrix : ", matrix);
  console.log("INi numbers", plainTextMatrix);

  return "hill";
};
