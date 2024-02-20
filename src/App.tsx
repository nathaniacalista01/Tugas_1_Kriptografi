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
import { isRotorValid } from "./utils/rotor";

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
  const [matrix, setMatrix] = useState<string[][]>(
    Array(Number(0))
      .fill("")
      .map(() => Array(Number(0)).fill(""))
  );
  const [file, setFile] = useState<File | null>();
  const [extension, setExtension] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleDecrypt = () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        // Get extension type
        // console.log("Ini type : ", file.name.split(".")[1]);
        if (reader.result) {
          const text = reader.result;
          setPlainText(text as string);
        } else {
          setErrorMessage("File can't be read, please check again your file");
        }
      };
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
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        // Get extension type
        // console.log("Ini type : ", file.name.split(".")[1]);
        if (file.name.split(".").length > 1) {
          setExtension(file.name.split(".")[1]);
        }
        if (reader.result) {
          const text = reader.result;
          setPlainText(text as string);
        } else {
          setErrorMessage("File can't be read, please check again your file");
        }
      };
    }
    const result = encrypt({
      matrix,
      slope,
      intercept,
      key,
      plainText,
      algorithm,
      firstRotor,
      secondRotor,
      thirdRotor,
      extension,
    });
    setResult(result ? result : "");
  };
  const saveToBinaryFile = (): void => {
    if (typeof result !== "string") {
      console.error("Result is not a string.");
      return;
    }
    const parts = result.split(".");

    // Periksa apakah split berhasil
    let fileName;
    let fileURL;
    let blob;
    if (parts.length > 1) {
      const extension = parts[1];
      const content = parts[0];

      // Gabungkan content dengan extension untuk nama file
      fileName = `data.${extension}`;

      // Buat blob dengan content dan type sesuai extension
      blob = new Blob([content], {
        type: "application/octet-stream",
      });

      // Lanjutkan proses download seperti sebelumnya
      fileURL = URL.createObjectURL(blob);
      // ... (your existing download logic using fileURL)
    } else {
      // Default ke .bin jika split gagal
      fileName = "data.bin";
      blob = new Blob([result], { type: "application/octet-stream" });
      fileURL = URL.createObjectURL(blob);
    }

    const tempLink = document.createElement("a");
    tempLink.href = fileURL;
    tempLink.setAttribute("download", fileName);
    document.body.appendChild(tempLink);
    tempLink.click();

    URL.revokeObjectURL(fileURL);
    document.body.removeChild(tempLink);
  };

  const checkEncrypt = () => {
    if (algorithm === "") {
      setIsDisabled(true);
    } else {
      switch (algorithm) {
        case "vignere":
          setIsDisabled(key === "" || plainText === "");
          break;
        case "playfair":
          setIsDisabled(key === "" || plainText === "");
          break;
        case "affine":
          setIsDisabled(!(slope && intercept));
          break;
        case "hill":
          setIsDisabled(matrix.length <= 0);
          break;
        case "enigma":
          setIsDisabled(
            !(
              isRotorValid(firstRotor) &&
              isRotorValid(secondRotor) &&
              isRotorValid(thirdRotor)
            )
          );
          break;
      }
    }
  };

  const handleSlopeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSlope(Number(event.target.value));
  };

  const handleInterceptChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIntercept(Number(event.target.value));
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlainText("");
    setFile(null);
    setType(event.target.value);
  };

  useEffect(() => {
    checkEncrypt();
  }, [
    plainText,
    slope,
    intercept,
    matrix,
    key,
    firstRotor,
    secondRotor,
    thirdRotor,
  ]);

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
            <>
              <Input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              {errorMessage && <Text color={"red"}>{errorMessage}</Text>}
            </>
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
          algorithm === "extended-vigenere") && (
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
            slope={slope ? slope : 1}
            intercept={intercept ? intercept : 0}
            handleSlopeChange={handleSlopeChange}
            handleInterceptChange={handleInterceptChange}
          />
        )}
        {algorithm === "hill" && (
          <MatrixDisplay matrix={matrix} setMatrix={setMatrix} />
        )}
        {result && (
          <FormControl>
            <FormLabel>Result</FormLabel>
            <Text>{result}</Text>
          </FormControl>
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
              isDisabled={isDisabled}
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
      </Box>
    </Box>
  );
}

export default App;
