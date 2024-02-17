interface MatrixConverterProps {
  matrix: string[][];
}
export const matrixConverter = ({ matrix }: MatrixConverterProps) => {
  return matrix.map((row) => row.map((element) => Number(element)));
};
