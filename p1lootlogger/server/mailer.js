require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  //host: "",
  service: "gmail",
  port: process.env.P1LL_MAILPORT || 465,
  secure: true,
  auth: {
    user: process.env.P1LL_MAIL,
    pass: process.env.P1LL_AUTH
  },
})

//use variables for to/from values
//look into switch cases for subject or content?
const mailerInfo = {
  from: process.env.P1LL_MAIL,
  to: process.env.P1LL_TESTMAIL,
  subject: "hello, testing nodemailer",
  text: "this is an automated email using nodemailer!"
}

/* transporter.sendMail(mailerInfo, function(err, info) {
  if (err) {
    console.log(err)
  } 
  else {
    console.log(`email sent to ${process.env.P1LL_TESTMAIL}`)
  }
})*/

module.exports = transporter