import React, { useEffect, useState } from "react";
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
  Text,
} from "@chakra-ui/react";
import { encrypt } from "./algorithms/encrypt";
import AffineCipherForm from "./components/affine.key";
import MatrixDisplay from "./components/hill.key";
import { decrypt } from "./algorithms/decrypt";
import EnigmaKey from "./components/enigma.key";
import { downloadFile } from "./utils/file.downloader";
import { isMatrixValid } from "./utils/matrix.processing";
import { checkButton } from "./utils/checker";

function App() {
  const [type, setType] = useState("text");
  const [plainText, setPlainText] = useState<string>("");
  const [algorithm, setAlgorithm] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [slope, setSlope] = useState<number | undefined>();
  const [intercept, setIntercept] = useState<number | undefined>();
  const [value, setValue] = useState("encrypt");
  const [isDisabled, setIsDisabled] = useState(false);
  const [firstRotor, setFirstRotor] = useState({
    innerRing: "",
    initialPosition: "",
  });
  const [secondRotor, setSecondRotor] = useState({
    innerRing: "",
    initialPosition: "",
  });
  const [thirdRotor, setThirdRotor] = useState({
    innerRing: "",
    initialPosition: "",
  });
  const [matrix, setMatrix] = useState<string[][]>([[], []]);
  const [file, setFile] = useState<File | null>();
  const [filename, setFilename] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [base64, setBase64] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const reset = () => {
    setFile(null);
    setPlainText("");
    setErrorMessage("");
    setFilename("");
    setResult("");
    setBase64("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleDecrypt = () => {
    if (algorithm === "hill" && !isMatrixValid(matrix)) {
      setErrorMessage("Matrix is not valid");
      return;
    } else {
      setErrorMessage("");
    }
    const result = decrypt({
      matrix,
      slope,
      intercept,
      key,
      decryptText: plainText,
      algorithm,
      firstRotor,
      secondRotor,
      thirdRotor,
    });
    setResult(result ? result : "");
  };
  const handleEncrypt = () => {
    if (algorithm === "hill" && !isMatrixValid(matrix)) {
      setErrorMessage("Matrix is not valid");
      return;
    } else {
      setErrorMessage("");
    }
    const encryptResult = encrypt({
      matrix,
      slope,
      intercept,
      key,
      plainText,
      algorithm,
      firstRotor,
      secondRotor,
      thirdRotor,
    });
    setResult(encryptResult ? encryptResult : "");
    setBase64(btoa(encryptResult ? encryptResult : ""));

    // console.log("ini result : ", result, result?.length);
  };
  const saveToBinaryFile = (): void => {
    downloadFile(result, filename);
  };

  const handleSlopeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSlope(Number(event.target.value));
    setResult("");
  };

  const handleInterceptChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIntercept(Number(event.target.value));
    setResult("");
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlainText("");
    setFile(null);
    setType(event.target.value);
  };

  useEffect(() => {
    checkButton(
      setIsDisabled,
      setErrorMessage,
      algorithm,
      matrix,
      plainText,
      firstRotor,
      secondRotor,
      thirdRotor,
      slope,
      intercept,
      key
    );
  }, [
    plainText,
    slope,
    intercept,
    matrix,
    key,
    firstRotor,
    secondRotor,
    thirdRotor,
    algorithm,
  ]);

  useEffect(() => {
    reset();
  }, [type, value]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      if (file.name.split(".").length > 1) {
        setFilename(file.name);
      }
      if (file.name.includes(".txt")) {
        reader.readAsText(file, "ISO-8859-1");
        reader.onload = () => {
          const text = reader.result;
          setPlainText(text as string);
        };
      } else {
        reader.readAsBinaryString(file);
        reader.onload = () => {
          const arrBuffer = reader.result as string;
          const binaryString = arrBuffer;
          console.log(binaryString.length);

          // console.log("Ini binary string : ", binaryString)
          setPlainText(binaryString);
        };
      }
    } else {
      setIsDisabled(false);
    }
  }, [file]);

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
        <FormLabel>Input Type</FormLabel>
        <FormControl w={"100%"} display={"flex"} flexDir={"row"} gap={4}>
          <Select
            placeholder="Select your input type"
            size={"lg"}
            value={type}
            onChange={(e) => handleTypeChange(e)}
            w={"50%"}
          >
            <option value="text">Text</option>
            <option value="file">File</option>
          </Select>
          <RadioGroup
            onChange={setValue}
            value={value}
            w={"50%"}
            display={"flex"}
            alignItems={"center"}
          >
            <Stack direction={"row"}>
              <Radio value="encrypt">Encrypt</Radio>
              <Radio value="decrypt">Decrypt</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl id="input-text">
          <FormLabel>
            {value === "encrypt" ? "Input Text" : "Encrypted Text"}
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
            <Input
              type="file"
              ref={fileInputRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Algorithm :</FormLabel>
          <Select
            placeholder="Select your encryption algorithm"
            onChange={(e) => setAlgorithm(e.target.value)}
            value={algorithm}
          >
            <option value="vigenere"> Vigenere Cipher Standard</option>
            <option value="varian-vigenere">
              Varian Vigenere Cipher Standard
            </option>
            <option value="extended-vigenere">Extended Vigenere</option>
            <option value="playfair">Playfair Cipher</option>
            <option value="super">Super Enkripsi</option>
            <option value="affine">Affine Cipher</option>
            <option value="hill">Hill Cipher</option>
            <option value={"enigma"}>Enigma Cipher</option>
          </Select>
        </FormControl>
        {algorithm === "enigma" && (
          <EnigmaKey
            firstRotor={firstRotor}
            setFirstRotor={setFirstRotor}
            secondRotor={secondRotor}
            setSecondRotor={setSecondRotor}
            thirdRotor={thirdRotor}
            setThirdRotor={setThirdRotor}
          />
        )}
        {(algorithm === "vigenere" ||
          algorithm === "varian-vigenere" ||
          algorithm === "playfair" ||
          algorithm === "extended-vigenere" ||
          algorithm === "super") && (
          <FormControl>
            <FormLabel>Key :</FormLabel>
            <Input
              type="text"
              placeholder="Enter your key"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
          </FormControl>
        )}
        {algorithm === "affine" && (
          <AffineCipherForm
            slope={slope ? slope : 0}
            intercept={intercept ? intercept : 0}
            handleSlopeChange={handleSlopeChange}
            handleInterceptChange={handleInterceptChange}
          />
        )}
        {algorithm === "hill" && (
          <MatrixDisplay matrix={matrix} setMatrix={setMatrix} />
        )}
        {result && (
          <>
            <Text>Result (Plain)</Text>
            <Input type="text" value={result} placeholder="Result" />
          </>
        )}
        {base64 && (
          <>
            <Text>Result (Base 64: )</Text>

            <Input type="text" value={base64} placeholder="Result in base64" />
          </>
        )}

        <ButtonGroup variant="outline" spacing="6" mt={12}>
          {value === "encrypt" ? (
            <Button
              colorScheme="blue"
              onClick={() => handleEncrypt()}
              isDisabled={isDisabled}
            >
              Ecnrypt
            </Button>
          ) : (
            <Button
              colorScheme="blue"
              onClick={() => handleDecrypt()}
              // isDisabled={isDisabled}
            >
              Decrypt
            </Button>
          )}
          <Button
            colorScheme="green"
            onClick={saveToBinaryFile}
            isDisabled={result === "" ? true : false}
          >
            Save to File
          </Button>
        </ButtonGroup>
        {errorMessage && <Text color={"red"}>{errorMessage}</Text>}
      </Box>
    </Box>
  );
}

export default App;
