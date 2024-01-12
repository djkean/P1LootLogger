import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack, LoginFeedback } from "../components/pagestyles";
import axios from "axios";

export function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState({
    password: "",
    retypedPassword: "",
  })

  const [resetPasswordRes, setResetPasswordRes] = useState({})

  const handleFields = (event) => {
    setNewPassword(_ => ({ ..._, [event.target.name]: event.target.value }))
  }

  const submitPassword = async (event) => {
    event.preventDefault()
  
  }

}