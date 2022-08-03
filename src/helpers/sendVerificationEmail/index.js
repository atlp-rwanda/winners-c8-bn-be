import sendEmail from "../sendEmail";

import "dotenv/config";

const sendVerificationEmail = (userEmail, token) => {
  const port = process.env.PORT;
  const link = `${process.env.SERVER_ADDRESS}/api/auth/register/verifyuser/email${token}`;
  
  const mailObj = {
    receiverEmail: userEmail,
    subject: "Barefoot Nomad Email Verification",
    title: "Welcome to the Barefoot Nomad App!",
    body: `As an extra security measure, we would like to verify your email address. <br> <strong>Please, click on the button below:</strong>`,
    link: link,
    linkAltText: "Verify My Email Address",
  };
  return sendEmail(mailObj).then((output) => {
    return output;
  });
};

export default sendVerificationEmail;
