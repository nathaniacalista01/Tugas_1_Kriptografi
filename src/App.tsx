import { useState } from "react";
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

function App() {
  // const [count, setCount] = useState(0)

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
          <Select placeholder="Select your input type" size={"lg"}>
            <option value="text">Text</option>
            <option value="file">File</option>
          </Select>
        </FormControl>

        <FormControl id="input-text">
          <FormLabel>Input text:</FormLabel>
          <Input placeholder="(plain)" />
        </FormControl>
        <FormControl>
          <FormLabel>Algorithm :</FormLabel>
          <Select placeholder="Select your encryption algorithm">
            <option value="vignere"> Vignere Cipher Standard</option>
            <option value="varian-vignere">
              Varian Vignere Cipher Standard
            </option>
            <option value="extended-vignere">Extended Vignere</option>
            <option value="playfair-cipher">Playfair Cipher</option>
            <option value="affine-cipher">Affine Cipher</option>
            <option value="hill-cipher">Hill Cipher</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Key :</FormLabel>
          <Input type="text" placeholder="Enter your key" />
        </FormControl>
        <ButtonGroup variant="outline" spacing="6" mt={12}>
          <Button colorScheme="blue">Ecnrypt</Button>
          <Button>Decrypt</Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default App;
