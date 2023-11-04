const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "",
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: ""
  },
})


//user variables for to/from values
//look into switch cases for subject or content?
async function mailerInfo() {
  const info = await transporter.sendMail({
    from: "",
    to: "",
    subject: "",
    text: "",
    html: "",
  })
}