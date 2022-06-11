import sendEmail from '../sendEmail'

import 'dotenv/config';

const sendVerificationEmail = (userEmail) => {
    const mailObj = {
        receiverEmail : userEmail,
        subject: 'Congrats on your new Barefoot Nomad account!',
        title: 'Congrats on your new Barefoot Nomad account!',
        body: `You can access our application by <br> <strong>Clicking on the button below:</strong>`,
        link: process.env.APP_HEROKU_LINK,
        linkAltText: "Start Exploring!"
    }
    return sendEmail(mailObj)
            .then((output) => {  
                return output;
            })
}

export default sendVerificationEmail;