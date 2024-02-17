import { convertPlainTextToNumber } from "../utils/plaintext.number";

interface HillCipherProps {
  matrix?: string[][];
  plainText: string;
}
export const hillCipher = ({
  matrix = [
    ["", ""],
    ["", ""],
  ],
  plainText,
}: HillCipherProps) => {
  console.log("INi matrix :", matrix, plainText);
  const normalizedText = plainText.replace(/\s+/g, "").toLowerCase();
  const numbers = convertPlainTextToNumber(normalizedText);
  console.log("INi numbers", numbers);
  return "hill";
};
