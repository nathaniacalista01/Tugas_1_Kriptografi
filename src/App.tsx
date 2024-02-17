import React, { useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { encrypt } from "./algorithms/algotihm";

function App() {
  // const [count, setCount] = useState(0)
  const [type, setType] = useState("text");
  const [plainText, setPlainText] = useState("");
  const [algorithm, setAlgorithm] = useState("vignere");
  const [key, setKey] = useState("");
  const [decryptText, setDecryptText] = useState("");

  const handleEncrypt = () => {
    const result = encrypt({ key, plainText, algorithm });
    setDecryptText(result ? result : "")
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const handleAlgorithmChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAlgorithm(event.target.value);
  };
  return (
    <Box
      w={"full"}
      maxW={"100v2w"}
      minH={"100vh"}
      display={"flex"}
      flexDir={"column"}
    >
      <Heading>Welcome to Cipher</Heading>
      <Box
        display={"flex"}
        flexDir={"column"}
        alignSelf={"center"}
        mt={"4rem"}
        w={"50vw"}
        gap={4}
      >
        <FormControl>
          <FormLabel>Input Type</FormLabel>
          <Select
            placeholder="Select your input type"
            size={"lg"}
            value={type}
            onChange={(e) => handleTypeChange(e)}
          >
            <option value="text">Text</option>
            <option value="file">File</option>
          </Select>
        </FormControl>

        <FormControl id="input-text">
          <FormLabel>Input text:</FormLabel>
          {type === "text" ? (
            <Input
              type="text"
              placeholder="Enter your plain text here"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
            />
          ) : (
            <Input type="file" />
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Algorithm :</FormLabel>
          <Select
            placeholder="Select your encryption algorithm"
            onChange={(e) => handleAlgorithmChange(e)}
            value={algorithm}
          >
            <option value="vignere"> Vignere Cipher Standard</option>
            <option value="varian-vignere">
              Varian Vignere Cipher Standard
            </option>
            <option value="extended-vignere">Extended Vignere</option>
            <option value="playfair">Playfair Cipher</option>
            <option value="affine">Affine Cipher</option>
            <option value="hill">Hill Cipher</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Key :</FormLabel>
          <Input
            type="text"
            placeholder="Enter your key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Decrypt Text</FormLabel>
          <Input
            type="text"
            value={decryptText}
            onChange={(e) => setDecryptText(e.target.value)}
          />
        </FormControl>
        <ButtonGroup variant="outline" spacing="6" mt={12}>
          <Button colorScheme="blue" onClick={() => handleEncrypt()}>
            Ecnrypt
          </Button>
          <Button>Decrypt</Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default App;
