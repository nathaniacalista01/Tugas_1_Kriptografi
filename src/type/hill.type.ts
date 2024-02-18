import {
  matrixConverter,
  matrixNumberToString,
} from "../utils/matrix.processing";

export class HillMatrix {
  private matrix: number[][];
  constructor(stringMatrix: string[][]) {
    this.matrix = matrixConverter({ matrix: stringMatrix });
  }

  public getMatrix() {
    return this.matrix;
  }

  public encryptMatrix(plainTextMatrices: HillMatrixPlainText) {
    const results = [];
    for (const plainText of plainTextMatrices.getMatrices()) {
      const result = this.multiplyMatrix(plainText);
      results.push(...result);
    }
    const decryptText = matrixNumberToString({ matrix: results });
    return decryptText.join("");
  }

  public multiplyMatrix(plainText: number[]) {
    const results = [];
    for (let i = 0; i < this.matrix.length; i++) {
      const rows = this.matrix[i];
      let result = 0;
      for (let j = 0; j < rows.length; j++) {
        result += rows[j] * plainText[j];
      }
      results.push(result % 26);
    }
    return results;
  }
}

export class HillMatrixPlainText {
  private matrices: number[][] = [];
  constructor(matrix: number[], size: number) {
    for (let i = 0; i < matrix.length; i += size) {
      const chunk = matrix.slice(i, i + size);
      //   Handle kasus kalau misalnya ada sisa (plain text bukan kelipatan dari size)
      while (chunk.length < size) {
        chunk.push(0);
      }
      this.matrices.push(chunk);
    }
  }

  public getMatrices() {
    return this.matrices;
  }
}
