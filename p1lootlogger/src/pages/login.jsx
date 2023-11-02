import { Box, Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack } from "../components/pagestyles"
import { React, useState } from "react";
import { loginVerification } from "../components/loginVerification";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function LoginPage() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    email: "",
    password: "",
  })
  
  const [loginError, setLoginError] = useState({})

  const handleFields = (event) => {
    setLoginDetails(_ => ({..._, [event.target.name]: event.target.value}))
  }

  const navigate = useNavigate()
  const submitFields = (event) => {
    event.preventDefault();
    setLoginError(loginVerification(loginDetails))
    axios.post("http://localhost:8080/login", loginDetails)
    .then(res => {
      localStorage.setItem("P1LL_TOKEN", res.data.loginToken)
      console.log("SUCCESS (AXIOS)")
    })
    .then(navigate("/itemtable"))
    .catch(err => console.log("ERROR (AXIOS)", err))
  }
 
  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6} align={"center"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} py={3}>Log In</Heading>
          <Text fontSize={"lg"}>Don't have an account? Create one {" "}
            <Link to="/createaccount" color="#FDCA40">here</Link>
          </Text>
        </Stack>
        <Box sx={LoginBox} as="form" id="login--form" onSubmit={submitFields}>
          <Stack spacing={3}>
            <FormControl id="email" sx={FormControlColors}>
              <FormLabel color={"#FDCA40"}>Email:</FormLabel>
              <Input type="email" sx={InputFieldColors}
              id="ver--email" name="email" onChange={handleFields}/>
              {loginError.email && <Text>{loginError.email}</Text>}
            </FormControl>
            <FormControl id="password" sx={FormControlColors}>
              <FormLabel color={"#FDCA40"}>Password:</FormLabel>
              <Input type="password" sx={InputFieldColors}
              id="ver--password" name="password" onChange={handleFields}/>
              {loginError.password && <Text>{loginError.password}</Text>}
              <Center>
                <Input type="submit" sx={FormButton} value="Sign In"/>
              </Center>
              <Link to="/forgotpassword">
                <Text color={"#BFA55C"} align={"center"}>Forgot Password? Click here</Text>
              </Link>
            </FormControl>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  ) 
}