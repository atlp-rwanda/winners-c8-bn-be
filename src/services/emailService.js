/*eslint-disable*/
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Util from '../helpers/utils';
dotenv.config();

const util = new Util();
export  default (message, subject, userEmail) => {
        try{const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.PARENT_EMAIL,
                    pass: process.env.PARENT_PASSWORD
                }
            });
            transporter.sendMail({
                from: process.env.PARENT_EMAIL,
                to: `${userEmail}`,
                subject: `${subject}`,
                html: `${message}`
            });
           
    }catch(error){
        const _error = `Failed sending the email to ${userEmail}, Please try again ...`;
        util.setError(500, _error);
        return util.send(res);
    }
}
