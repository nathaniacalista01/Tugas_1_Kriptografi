import { useState } from 'react'
import './App.css'
import { Box } from '@chakra-ui/react'

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
      Welcome to Cipher
    </Box>
  )
}

export default App
