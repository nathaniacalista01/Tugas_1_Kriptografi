import React from "react";
import { Box, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { RotorInterface } from "../type/engima.type";

interface RotorProps {
  firstRotor: RotorInterface;
  setFirstRotor: React.Dispatch<React.SetStateAction<RotorInterface>>;
  secondRotor: RotorInterface;
  setSecondRotor: React.Dispatch<React.SetStateAction<RotorInterface>>;
  thirdRotor: RotorInterface;
  setThirdRotor: React.Dispatch<React.SetStateAction<RotorInterface>>;
}
const EnigmaKey = ({
  firstRotor,
  setFirstRotor,
  secondRotor,
  setSecondRotor,
  thirdRotor,
  setThirdRotor,
}: RotorProps) => {
  return (
    <Box display={"flex"} flexDir={"column"}>
      <FormControl display={"flex"} flexDir={"row"}>
        <Box width={"50%"}>
          <FormLabel>First Rotor</FormLabel>
          <Input
            placeholder="Outer Ring"
            type="text"
            value={firstRotor.innerRing}
            onChange={(e) =>
              setFirstRotor((prev) => ({
                ...prev,
                innerRing: e.target.value,
              }))
            }
          />
        </Box>
        <Box width={"25%"}>
          <FormLabel>Initial Position:</FormLabel>
          <Select
            value={firstRotor.initialPosition}
            onChange={(e) =>
              setFirstRotor((prev) => ({
                ...prev,
                initialPosition: e.target.value,
              }))
            }
          >
            {[...Array(26)].map((_, i) => (
              <option key={i} value={String.fromCharCode(65 + i)}>
                {String.fromCharCode(65 + i)}
              </option>
            ))}
          </Select>
        </Box>
      </FormControl>
      <FormControl display={"flex"} flexDir={"row"}>
        <Box width={"50%"}>
          <FormLabel>Second Rotor</FormLabel>
          <Input
            placeholder="Outer Ring"
            type="text"
            value={secondRotor.innerRing}
            onChange={(e) =>
              setSecondRotor((prev) => ({
                ...prev,
                innerRing: e.target.value,
              }))
            }
          />
        </Box>
        <Box width={"25%"}>
          <FormLabel>Initial Position:</FormLabel>
          <Select
            value={secondRotor.initialPosition}
            onChange={(e) =>
              setSecondRotor((prev) => ({
                ...prev,
                initialPosition: e.target.value,
              }))
            }
          >
            {[...Array(26)].map((_, i) => (
              <option key={i} value={String.fromCharCode(65 + i)}>
                {String.fromCharCode(65 + i)}
              </option>
            ))}
          </Select>
        </Box>
      </FormControl>
      <FormControl display={"flex"} flexDir={"row"}>
        <Box width={"50%"}>
          <FormLabel>Third Rotor</FormLabel>
          <Input
            placeholder="Outer Ring"
            type="text"
            value={thirdRotor.innerRing}
            onChange={(e) =>
              setThirdRotor((prev) => ({
                ...prev,
                innerRing: e.target.value,
              }))
            }
          />
        </Box>
        <Box width={"25%"}>
          <FormLabel>Initial Position:</FormLabel>
          <Select
            value={thirdRotor.initialPosition}
            onChange={(e) => {
              console.log(e.target.value);
              setThirdRotor((prev) => ({
                ...prev,
                initialPosition: e.target.value,
              }));
            }}
          >
            {[...Array(26)].map((_, i) => (
              <option key={i} value={String.fromCharCode(65 + i)}>
                {String.fromCharCode(65 + i)}
              </option>
            ))}
          </Select>
        </Box>
      </FormControl>
    </Box>
  );
};

export default EnigmaKey;
