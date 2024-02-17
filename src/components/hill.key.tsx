import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Grid,
} from "@chakra-ui/react";

const MatrixDisplay = () => {
  const [rows, setRows] = useState<string>("");
  const [columns, setColumns] = useState<string>("");
  const [matrix, setMatrix] = useState<number[][]>(
    Array(Number(rows))
      .fill(null)
      .map(() => Array(Number(columns)).fill(0))
  );


  // Update the dimensions of the matrix
  const updateMatrixSize = (newRows: number, newColumns: number) => {
    const newMatrix = Array(newRows)
      .fill(null)
      .map(() => Array(newColumns).fill(0));
    setMatrix(newMatrix);
  };

  // Handle the form submission
  const handleResize = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form submission from refreshing the page
    updateMatrixSize(Number(rows), Number(columns));
  };

  return (
    <Box>
      <form onSubmit={handleResize}>
        <FormControl>
          <FormLabel htmlFor="rows">Rows:</FormLabel>
          <Input
            id="rows"
            type="number"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            placeholder="Number of rows"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="columns">Columns:</FormLabel>
          <Input
            id="columns"
            type="number"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            placeholder="Number of columns"
          />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">
          Resize Matrix
        </Button>
      </form>
      <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={2} mt={4}>
        {matrix.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <Box
              key={`${rowIndex}-${columnIndex}`}
              border="1px"
              borderColor="gray.200"
              padding={2}
              textAlign="center"
            >
              {cell}
            </Box>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default MatrixDisplay;
