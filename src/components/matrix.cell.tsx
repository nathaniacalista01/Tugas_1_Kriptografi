import { Input } from "@chakra-ui/react";
import React from "react";

interface MatrixCellProps {
  value: string;
  rowIndex: number;
  columnIndex: number;
  onValueChange: (
    rowIndex: number,
    columnIndex: number,
    newValue: string
  ) => void;
}

const MatrixCell = ({
  value,
  rowIndex,
  columnIndex,
  onValueChange,
}: MatrixCellProps) => {
  return (
    <Input
      value={value}
      type="number"
      onChange={(e) => onValueChange(rowIndex, columnIndex, e.target.value)}
      size={"sm"}
    />
  );
};

export default MatrixCell;
