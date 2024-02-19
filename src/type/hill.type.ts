import {
  matrixConverter,
  matrixInverse,
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
  public decryptMatrix(decryptTextMatrices: HillMatrixPlainText) {
    const results = [];
    for (const decryptText of decryptTextMatrices.getMatrices()) {
      const result = this.multiplyInverseMatrix(decryptText);
      results.push(...result);
    }
    const encryptText = matrixNumberToString({ matrix: results });
    console.log("Ini ecnrypt text : ", encryptText);
    return encryptText.join("");
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

  public multiplyInverseMatrix(decryptText: number[]) {
    const results = [];
    const inverseMatrix = this.getInverse();
    for (let i = 0; i < inverseMatrix.length; i++) {
      const rows = inverseMatrix[i];
      let result = 0;
      for (let j = 0; j < rows.length; j++) {
        result += rows[j] * decryptText[j];
      }
      results.push(result % 26);
    }
    return results;
  }
  public getInverse() {
    return matrixInverse(this.matrix);
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
