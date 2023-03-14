import { Box, Container, Heading, Text, Center, Input, Button, FormControl, FormLabel} from "@chakra-ui/react";
import { ButtonStyles, inputStyles } from "../components/pagestyles"
import { Link } from "react-router-dom"

export function LoginPage() {

  return (
  <div> 
    <Container as="section" maxW="100hv" maxH="100hv" bg="#5D5D5D" pb="2em">
      <Center>
        <Heading my="1em" p="0.75em">Log In</Heading>
      </Center>
      <Center>
        <Text my="1em">Need an account? You can create one </Text>
        <Text color="#FDCA40"><Link to="/createaccount"> here.</Link></Text>
      </Center>
      <Center>
        <Box as="form" id="login--form">
          <FormControl>
            <FormLabel>Username:</FormLabel>
            <Input sx={inputStyles} type="text" id="ver--username"/>
            <FormLabel>Password:</FormLabel>
            <Input sx={inputStyles} type="password" id="ver--password" placeholder="password"/>
            <Button sx={ButtonStyles} my="1em">Log In</Button>
          </FormControl>
        </Box>
      </Center>
    </Container>
  </div> 
  )
}