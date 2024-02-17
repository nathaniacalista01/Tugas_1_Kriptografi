import { matrixConverter } from "../utils/matrix.processing";

export class HillMatrix {
  private matrix: number[][];
  constructor(stringMatrix: string[][]) {
    this.matrix = matrixConverter({ matrix: stringMatrix });
  }

  public getMatrix() {
    return this.matrix;
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
