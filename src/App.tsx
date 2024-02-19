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
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { encrypt } from "./algorithms/encrypt";
import AffineCipherForm from "./components/affine.key";
import MatrixDisplay from "./components/hill.key";
import { decrypt } from "./algorithms/decrypt";

function App() {
  const [type, setType] = useState("text");
  const [plainText, setPlainText] = useState("");
  const [algorithm, setAlgorithm] = useState("vignere");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [slope, setSlope] = useState(0);
  const [intercept, setIntercept] = useState(0);
  const [value, setValue] = useState("encrypt");
  const [matrix, setMatrix] = useState<string[][]>(
    Array(Number(0))
      .fill("")
      .map(() => Array(Number(0)).fill(""))
  );

  const handleDecrypt = () => {
    const result = decrypt({
      matrix,
      slope,
      intercept,
      key,
      decryptText: plainText,
      algorithm,
    });
    setResult(result ? result : "");
  };
  const handleEncrypt = () => {
    const result = encrypt({
      matrix,
      slope,
      intercept,
      key,
      plainText,
      algorithm,
    });
    setResult(result ? result : "");
  };
  const saveToBinaryFile = (): void => {
    // Ensure 'result' is a string before proceeding
    if (typeof result !== "string") {
      console.error("Result is not a string.");
      return;
    }

    const blob = new Blob([result], { type: "application/octet-stream" });
    const fileURL = URL.createObjectURL(blob);

    const tempLink = document.createElement("a");
    tempLink.href = fileURL;
    tempLink.setAttribute("download", "data.bin");
    document.body.appendChild(tempLink); 
    tempLink.click();

    URL.revokeObjectURL(fileURL);
    document.body.removeChild(tempLink);
  };

  const handleSlopeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSlope(Number(event.target.value));
  };

  const handleInterceptChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIntercept(Number(event.target.value));
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
            onChange={(e) => setType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="file">File</option>
          </Select>
        </FormControl>
        <FormControl>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction={"row"}>
              <Radio value="encrypt">Encrypt</Radio>
              <Radio value="decrypt">Decrypt</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl id="input-text">
          <FormLabel>
            {value === "encrypt" ? "Input Text" : "Input Decrypt"}
          </FormLabel>
          {type === "text" ? (
            <Input
              type="text"
              placeholder={
                value === "encrypt"
                  ? "Enter your plain text here"
                  : "Enter your encrypted text here"
              }
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
            onChange={(e) => setAlgorithm(e.target.value)}
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
        {algorithm === "affine" && (
          <AffineCipherForm
            slope={slope}
            intercept={intercept}
            handleSlopeChange={handleSlopeChange}
            handleInterceptChange={handleInterceptChange}
          />
        )}
        {algorithm === "playfair" && (
          <FormControl>
            <FormLabel>Key :</FormLabel>
            <Input
              type="text"
              placeholder="Enter your key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </FormControl>
        )}
        {algorithm === "hill" && (
          <MatrixDisplay matrix={matrix} setMatrix={setMatrix} />
        )}
        <FormControl>
          <FormLabel onClick={() => console.log(algorithm)}>Result</FormLabel>
          <Input type="text" value={result} />
        </FormControl>
        <ButtonGroup variant="outline" spacing="6" mt={12}>
          {value === "encrypt" ? (
            <Button colorScheme="blue" onClick={() => handleEncrypt()}>
              Ecnrypt
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={() => handleDecrypt()}>
              Decrypt
            </Button>
          )}
          <Button colorScheme="green" onClick={saveToBinaryFile}>
            Save to File
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default App;
