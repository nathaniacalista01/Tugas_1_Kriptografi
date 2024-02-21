import { PlayfairMatrix } from "../../type/playfair.type";
import { bigramsConverter } from "../../utils/plaintext.processing";
import { duplicate_remover } from "../../utils/remover";

interface PlayfairInterface {
  key?: string;
  plainText: string;
  extension?: string;
}

export const playfair = ({
  key = "",
  plainText,
  extension,
}: PlayfairInterface) => {
  const removed_duplicate_key = duplicate_remover(key.toUpperCase());
  const playfairMatrix = new PlayfairMatrix(removed_duplicate_key);

  const bigrams = bigramsConverter(plainText.replace("J", "I"));
  const descryptBigrams = [];
  for (const bigram of bigrams) {
    let decrypt;
    if (playfairMatrix.isSameRow(bigram[0], bigram[1])) {
      decrypt = [
        playfairMatrix.encryptSameRow(bigram[0]),
        playfairMatrix.encryptSameRow(bigram[1]),
      ];
    } else if (playfairMatrix.isSameCol(bigram[0], bigram[1])) {
      decrypt = [
        playfairMatrix.encryptSameColumn(bigram[0]),
        playfairMatrix.encryptSameColumn(bigram[1]),
      ];
    } else {
      decrypt = playfairMatrix.differentColumnAndRow(bigram[0], bigram[1]);
    }
    descryptBigrams.push(decrypt);
  }
  const result = descryptBigrams.map((bigram) => bigram.join("")).join("");
  if (extension) {
    return result + "." + extension;
  }
  return result;
};
