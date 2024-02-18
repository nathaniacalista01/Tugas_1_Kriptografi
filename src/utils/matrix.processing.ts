interface MatrixConverterProps {
  matrix: string[][];
}

interface MatrixNumberToString{
  matrix : number[]
}

export const matrixConverter = ({ matrix }: MatrixConverterProps) => {
  return matrix.map((row) => row.map((element) => Number(element)));
};


export const matrixNumberToString = ({matrix}: MatrixNumberToString) =>{
  return matrix.map(number => String.fromCharCode(number + 65))
}