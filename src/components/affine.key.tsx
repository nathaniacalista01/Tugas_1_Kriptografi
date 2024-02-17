// AffineCipherForm.jsx
import React from "react";
import { FormControl, FormLabel, Select, Box } from "@chakra-ui/react";

interface AffineCipherFormInterface {
  slope: number;
  intercept: number;
  handleSlopeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInterceptChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const AffineCipherForm = ({
  slope,
  intercept,
  handleSlopeChange,
  handleInterceptChange,
}: AffineCipherFormInterface) => {
  return (
    <FormControl display={"flex"} flexDirection={"row"} gap={4}>
      <Box width={"50%"}>
        <FormLabel>Slope / A</FormLabel>
        <Select
          placeholder="Select your slope/a"
          onChange={handleSlopeChange}
          value={slope}
        >
          {[1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25].map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </Select>
      </Box>
      <Box width={"50%"}>
        <FormLabel>Intercept/B</FormLabel>
        <Select
          placeholder="Select your intercept/b"
          value={intercept}
          onChange={handleInterceptChange}
        >
          {[...Array(26).keys()].map((number) => (
            <option key={number} value={number + 1}>
              {number + 1}
            </option>
          ))}
        </Select>
      </Box>
    </FormControl>
  );
};

export default AffineCipherForm;
