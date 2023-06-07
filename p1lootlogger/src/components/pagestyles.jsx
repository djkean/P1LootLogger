import { m } from "framer-motion"

export const ButtonStyles = {
  boxShadow: "sm",
  color: "#262626",
  bg: "#FDCA40",
  ':hover': {
    bg: "#F2A202",
  }
}

export const ButtonStyles2 = {
  boxShadow: "sm",
  color: "#262626",
  bg: "#DD380F",
  ':hover': {
    bg: "#B12805",
  }
}

export const MenuStyles = {
  color: "#262626",
  bg: "#FDCA40",
  border: "solid 1px #5D5D5D",
  borderRadius: "0.3em",
  ':hover': {
    bg: "#F2A202",
    boxShadow: "sm",
  }
}

export const itemTableStyles = {
  px: "1em",
  py: "1em",
  bg: "orange.200",
  color: "green.400",
  mx: "1em",
  my: "0.5em",
  textAlign: "center",
  ':hover': {
    color: "red.200",
    bg: "purple.400"
  }
}

export const parentItemGridStyles = {
  p: "0.3em",
  column: 3,
  spacing: 1,
  minChildWidth: "256px",
  maxW: "3xl",
  margin: "auto",
}

export const itemGridStyles = {
  bg: "orange.200",
  h: "4.2em",
  px: "0.3em",
  py: "0.1em",
  borderRadius: " 0.3em",
  boxShadow: "base",
  lineHeight: "1.3em",
}

export const inputStyles = {
  border: "1px solid black"
}

export const bossInfoStyles = {
  borderWidth: "14px",
  borderRadius: "lg",
  boxShadow: "2xl",
}

export const InfoCardStack = {
  borderWidth: "1px",
  borderRadius: "lg",
  border: "1px grey.900",
  bg: "#5D5D5D",
  boxShadow: '2xl',
  padding: "4",
  w: { sm: '100%', md: '540px' },
  height: { sm: '30rem', md: '20rem' },
  direction: { base: 'column', md: 'row' }
}

export const InfoImageLayout = {
  objectFit: "cover",
  boxSize: "100%",
  border:"1px grey.900"
}

export const InfoSummaryCard = {
  flex: 1,
  flexDirection: "column",
  justifyCenter: "center",
  alignItems: "center",
  p: 1,
  pt: 2
}

export const InfoDropBadge = {
  px: 2,
  py: 1,
  fontWeight: 400,
  bg: "orange.200",
  color: "gray.700"
}

export const InfoTabStack = {
  width: "100%",
  mt: "2rem",
  padding: 1,
  justifyContent: "space-between",
  alignItems: "center"
}

export const InfoTabButton = {
  flex: 1,
  px: 1,
  py: 1,
  fontSize: "sm",
  rounded: "full",
  bg: "orange.200",
  color: "gray.700",
  boxShadow: "0px 1px 25px -5px rgb(150 150 90 / 40%), 0 10px 10px -5px rgb(60 60 30 / 40%)",
  ':hover': {
    bg: "orange.300"
  },
  ':focus': {
    bg: "orange.300"
  }
}

export const DropDownMenu = {
  bg: "orange.200",
  ':hover': {
    bg: "orange.300"
  }
}

export const LoginFlex = {
  minH: "100vh",
  justify: "center",
  bg: "#5D5D5D",
}

export const LoginStack = {
  mx: "auto",
  maxW: "lg",
  py: 12,
  px: 6,
}

export const LoginBox = {
  rounded: "lg",
  bg: "#2A2823",
  boxShadow: "lg",
  p: 8,
}

export const FormControlColors = {
  color: "#BFA55C",
  borderColor: "#5D5D5D"
}

export const InputFieldColors = {
  ':focus': {
    color: "#FDCA40",
    borderColor: "#FDCA40"
  }
}

export const FormButton = {
  color: "#2A2823",
  bg: "#FDCA40",
  ':hover': {
    bg: "#5D5D5D",
    color: "#FDCA40"
  }
}