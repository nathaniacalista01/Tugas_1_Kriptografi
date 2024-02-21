import * as math from "mathjs";

interface MatrixConverterProps {
  matrix: string[][];
}

interface MatrixNumberToString {
  matrix: number[];
}

export const matrixConverter = ({ matrix }: MatrixConverterProps) => {
  return matrix.map((row) => row.map((element) => Number(element)));
};

export const matrixNumberToString = ({ matrix }: MatrixNumberToString) => {
  return matrix.map((number) => String.fromCharCode(number + 65));
};

export const getModInverse = (a: number) => {
  let inverse = 0;
  for (let i = 0; i < 26; i++) {
    if ((a * i) % 26 === 1) {
      inverse = i;
    }
  }
  return inverse;
};

export const matrixDeterminant = (matrix: number[][]) => {
  const n = matrix.length;
  let det = 0;
  if (n === 1) {
    return matrix[0][0];
  }
  if (n === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
  }
  for (let i = 0; i < n; i++) {
    det += matrix[0][i] * cofactor(matrix, 0, i);
  }
  return det;
};

export const cofactor = (matrix: number[][], row: number, col: number) => {
  const subMatrix = matrix
    .filter((_, r) => r !== row)
    .map((row) => row.filter((_, c) => c !== col));
  const result = Math.pow(-1, row + col) * math.det(subMatrix);
  // console.log("Ini result :", result);
  return result;
};

export const adjugateMatrix = (matrix: number[][]) => {
  const n = matrix.length;
  const adj = new Array(n).fill(0).map(() => new Array(n).fill(0));
  if (n === 1) {
    adj[0][0] = 1;
    return adj;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // console.log("Ini cofactor", cofactor(matrix, i, j));
      adj[j][i] = cofactor(matrix, i, j);
    }
  }
  return adj;
};

export const matrixInverse = (matrix: number[][]) => {
  const det = matrixDeterminant(matrix);
  // console.log("ini det : ", math.det(matrix));
  const detInv = getModInverse(det % 26 > 0 ? det % 26 : (det % 26) + 26);
  // console.log("Ini det inv : ", detInv);
  if (detInv === null) {
    throw new Error("Matrix is not invertible under modulo 26");
  }
  const adj = adjugateMatrix(matrix);
  // console.log("Ini adjugate : ", adj);
  const n = matrix.length;
  const invMatrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      invMatrix[i][j] = (detInv * adj[i][j]) % 26;
      if (invMatrix[i][j] < 0) invMatrix[i][j] += 26;
    }
  }
  return invMatrix;
};

export const isMatrixValid = (matrix: string[][]) => {
  const numberMatrix = matrixConverter({ matrix });
  const det = math.det(numberMatrix); // Assuming you have this function implemented
  const detMod = det % 26;

  // Use math.gcd to calculate the GCD
  return math.gcd(detMod, 26) === 1;
};
