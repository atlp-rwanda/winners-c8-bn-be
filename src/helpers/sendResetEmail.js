import mail from '@sendgrid/mail';
import 'dotenv/config';



//Sending Password reset email
const sendResetEmail = async (user, redirectUrl, res, token) =>{
    mail.setApiKey(process.env.SENDGRID_API_KEY);

    const mailData = {
        from: process.env.TECH_SUPPORT_EMAIL,
        to: user.email,
        subject: 'Barefoot Nomad Password reset Link',
        html: `We heard you lost your password <b> <a href=${ redirectUrl + "/" + token}>Click here</a> </b> to procced`
      };
    
      return mail.send(mailData)
        .then(() => {
           console.log("Check your email for reset link...")
        })
        .catch((error) => {
            console.log(error)
        });
}
export default sendResetEmail;