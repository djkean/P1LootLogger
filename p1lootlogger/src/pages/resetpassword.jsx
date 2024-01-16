import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Box, Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack, LoginFeedback } from "../components/pagestyles";
import axios from "axios";

export function ResetPasswordPage() {
  const [resetPasswordRes, setResetPasswordRes] = useState({})
  const [newPassword, setNewPassword] = useState({
    password: "",
    retypedPassword: "",
  })

  const location = useLocation();
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const tokenFromQueryString = params.get("token")
  const emailFromQueryString = params.get("email")

  console.log(tokenFromQueryString, emailFromQueryString)

  const compareStringsToDb = async () => {
    if (typeof tokenFromQueryString === "undefined" || typeof emailFromQueryString == "undefined") {
      return
    }
    /*try {
      const resetPasswordResponse = await fetch()
    } */
  }

  const handleFields = (event) => {
    setNewPassword(_ => ({ ..._, [event.target.name]: event.target.value }))
  }

  const submitPassword = async (event) => {
    event.preventDefault()
  
  }

}