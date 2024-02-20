import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Grid,
} from "@chakra-ui/react";
import MatrixCell from "./matrix.cell";

interface MatrixDisplayProps {
  matrix: string[][];
  setMatrix: React.Dispatch<React.SetStateAction<string[][]>>;
}

const MatrixDisplay = ({ matrix, setMatrix }: MatrixDisplayProps) => {
  const [rows, setRows] = useState<string>("");
  const updateMatrixSize = (newRows: number, newColumns: number) => {
    const newMatrix = Array(newRows)
      .fill(null)
      .map(() => Array(newColumns).fill(""));
    setMatrix(newMatrix);
  };

  const handleResize = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateMatrixSize(Number(rows), Number(rows));
  };

  const handleCellChange = (
    rowIndex: number,
    columnIndex: number,
    newValue: string
  ) => {
    const newMatrix = matrix.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === columnIndex ? newValue : cell
      )
    );
    setMatrix(newMatrix);
  };
  return (
    <Box>
      <form onSubmit={handleResize}>
        <Box display={"flex"} flexDir={"row"} gap={5}>
          <FormControl width={"50%"}>
            <FormLabel htmlFor="rows">Rows:</FormLabel>
            <Input
              id="rows"
              type="number"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              placeholder="Number of rows"
            />
          </FormControl>
        </Box>

        <Button mt={4} colorScheme="blue" type="submit">
          Resize Matrix
        </Button>
      </form>
      <Grid templateColumns={`repeat(${rows}, 1fr)`} gap={2} mt={4}>
        {matrix.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <Box
              key={`${rowIndex}-${columnIndex}`}
              border="1px"
              borderColor="gray.200"
              padding={2}
              textAlign="center"
            >
              <MatrixCell
                value={cell}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                onValueChange={handleCellChange}
              />
            </Box>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default MatrixDisplay;
