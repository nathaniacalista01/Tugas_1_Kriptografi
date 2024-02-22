import { PlayfairMatrix } from "../../type/playfair.type";
import {
  bigramsConverter,
  removeXFromPlainText,
} from "../../utils/plaintext.processing";
import { duplicate_remover, space_remover } from "../../utils/remover";

interface PlayfairDecryptInterface {
  key?: string;
  decryptText: string;
  extension? : string;
}

export const playfairDecrypt = ({
  key = "",
  decryptText,
  extension
}: PlayfairDecryptInterface) => {
  const removedDuplicateKey = duplicate_remover(key.toUpperCase());
  const playfairMatrix = new PlayfairMatrix(removedDuplicateKey);
  const bigrams = bigramsConverter(
    space_remover(decryptText.replace("J", "I").toUpperCase())
  );

  const plainTextBigrams = [];
  for (const bigram of bigrams) {
    let encrypt;
    if (playfairMatrix.isSameRow(bigram[0], bigram[1])) {
      encrypt = [
        playfairMatrix.decryptSameRow(bigram[0]),
        playfairMatrix.decryptSameRow(bigram[1]),
      ];
    } else if (playfairMatrix.isSameCol(bigram[0], bigram[1])) {
      encrypt = [
        playfairMatrix.decryptSameColumn(bigram[0]),
        playfairMatrix.decryptSameColumn(bigram[1]),
      ];
    } else {
      encrypt = playfairMatrix.differentColumnAndRow(bigram[0], bigram[1]);
    }
    plainTextBigrams.push(encrypt);
  }
  const result = plainTextBigrams.map((bigram) => bigram.join("")).join("");
  if (extension) {
    return removeXFromPlainText(result) + "." + extension;
  }
  return removeXFromPlainText(result);
};
