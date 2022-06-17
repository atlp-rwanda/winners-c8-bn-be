import 'dotenv/config';

import sgMail from '@sendgrid/mail';
import generateHTML from './generateHTML';

const TECH_SUPPORT_EMAIL = process.env.TECH_SUPPORT_EMAIL;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

const sendEmail = (mailObj) => {
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
        to: mailObj.receiverEmail, // Change to your recipient
        from: TECH_SUPPORT_EMAIL, // Change to your verified sender
        subject: mailObj.subject,
        text: `${mailObj.title}
                ${mailObj.body}: ${mailObj.link}`,
        html: generateHTML(mailObj.title,mailObj.body,mailObj.link,mailObj.linkAltText,TECH_SUPPORT_EMAIL),
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

export default sendEmail;