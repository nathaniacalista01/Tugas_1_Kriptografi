import { PlayfairMatrix } from "../type/playfair.type";
import { plainTextPlayfairConverter } from "../utils/plaintext.processing";
import { duplicate_remover, space_remover } from "../utils/remover";

interface PlayfairInterface {
  key?: string;
  plainText: string;
}

export const playfair = ({ key = "", plainText }: PlayfairInterface) => {
  const removed_duplicate_key = duplicate_remover(key.toUpperCase());
  const playfairMatrix = new PlayfairMatrix(removed_duplicate_key);
  const bigrams = plainTextPlayfairConverter(
    space_remover(plainText.toUpperCase())
  );
  console.log("Ini bigrams : ", bigrams)
  const descryptBigrams = [];
  for (const bigram of bigrams) {
    let decrypt;
    if (playfairMatrix.isSameRow(bigram[0], bigram[1])) {
      decrypt = [
        playfairMatrix.sameRow(bigram[0]),
        playfairMatrix.sameRow(bigram[1]),
      ];
    } else if (playfairMatrix.isSameCol(bigram[0], bigram[1])) {
      decrypt = [
        playfairMatrix.sameColumn(bigram[0]),
        playfairMatrix.sameColumn(bigram[1]),
      ];
    } else {
      decrypt = playfairMatrix.differentColumnAndRow(bigram[0], bigram[1]);
    }
    descryptBigrams.push(decrypt);
  }
  const result = descryptBigrams.map((bigram) => bigram.join("")).join("");

  return result;
};
