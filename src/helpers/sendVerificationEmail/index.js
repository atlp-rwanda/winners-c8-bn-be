import 'dotenv/config';

import sgMail from '@sendgrid/mail';
import generateHTML from './generateHTML';

const TECH_SUPPORT_EMAIL = process.env.TECH_SUPPORT___EMAIL_VERIFICATION;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY___EMAIL_VERIFICATION;
const LOCAL_DOMAIN_NAME = process.env.LOCAL_DOMAIN_NAME___EMAIL_VERIFICATION; // || 'localhost'

const sendVerificationEmail = (userEmail) => {
    sgMail.setApiKey(SENDGRID_API_KEY);
    const verificationLink = LOCAL_DOMAIN_NAME;
    const msg = {
        to: userEmail, // Change to your recipient
        from: TECH_SUPPORT_EMAIL, // Change to your verified sender
        subject: 'Congrats on your new Barefoot Normad account!',
        text: `Congrats on your new Barefoot Normad account!
                You can access our application by clicking Here: ${verificationLink}`,
        html: generateHTML(TECH_SUPPORT_EMAIL,verificationLink),
    }
    let output = {};
    return sgMail
    .send(msg)
    .then(() => {
        return output = {"response":"Email sent"};
    })
    .catch((error) => {
        return output = {"error": error};
    });
}

export default sendVerificationEmail;