import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack, LoginFeedback } from "../components/pagestyles"
import { regVerification } from "../components/regVerification";
import axios from "axios";

export function CreateAccountPage() {
  const [regDetails, setRegDetails] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [regError, setRegError] = useState({})
  const [createdAccRes, setCreateAccRes] = useState({})

  const handleFields = (event) => {
    setRegDetails(_ => ({ ..._, [event.target.name]: event.target.value }))
  }

  const navigate = useNavigate();
  const submitFields = async (event) => {
    event.preventDefault();
    setRegError(regVerification(regDetails))
    let error = regVerification(regDetails)
    setRegError(error)
    console.log(error.username, error.email, error.password)
    if (error.username === "" && error.email === "" && error.password === "") {
      console.log("Form submitted")
      await axios.post("http://localhost:8080/createaccount", regDetails)
      .then((res => {
        setCreateAccRes(res.data)
        console.log(res.data.message, res.data.code)
        navigate("/login")
      }))
      .catch((err => { 
        setCreateAccRes(err.response.data)
        console.log(err, `Backend returned with error ${err.response.status}`)
      }))
    }
  }

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} py={3}>Create Account</Heading>
          <Text fontSize={"lg"}>Already have an account? Log in {" "}
            <Link to="/createaccount" color="#FDCA40">here</Link>
          </Text>
         {createdAccRes.message && <Stack align={"center"} sx={LoginFeedback}>
            <Text color={createdAccRes.code}>{createdAccRes.message}</Text>
          </Stack>}
        </Stack>
        <Box sx={LoginBox} as="form" id="reg--form" onSubmit={submitFields}>
          <Stack spacing={3}>
            <FormControl id="username" sx={FormControlColors}>
              <FormLabel color={"#FDCA40"}>Username:</FormLabel>
              <Input type="username" sx={InputFieldColors}
              id="reg--username" name="username" onChange={handleFields}/>
                {regError.username && <Text>{regError.username}</Text>}
            </FormControl>
            <FormControl id="email" sx={FormControlColors}>
              <FormLabel color={"#FDCA40"}>Email:</FormLabel>
              <Input type="email" sx={InputFieldColors}
              id="reg--email--1" name="email" onChange={handleFields}/>
                {regError.email && <Text>{regError.email}</Text>}
            </FormControl>
            <FormControl id="password" sx={FormControlColors}>
              <FormLabel color={"#FDCA40"}>Password:</FormLabel>
              <Input type="password" sx={InputFieldColors}
              id="reg--password--1" name="password" onChange={handleFields}/>
                {regError.password && <Text>{regError.password}</Text>}
              <Center>
                <Input type="submit" sx={FormButton} value="Create Account"/>
              </Center>
              <Text color={"#BFA55C"} align={"center"}></Text>
            </FormControl>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
