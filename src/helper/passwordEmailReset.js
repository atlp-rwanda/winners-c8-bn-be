import sgMail from '@sendgrid/mail';
import 'dotenv/config';

const passwordResetEmail = (userInfo) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const mailOptions = {
    from: `Barefoot Nomad<${process.env.GMAIL_EMAIL}>`,
    to: 'gavutezo@forexnews.bg',
    subject: 'Hello there',
    html: 'make me sing halleluia'
  };

  return sgMail.send(mailOptions)
    .then(() => 'Email has been sent...')
    .catch((error) => {
      throw new ApplicationError(error.message);
    });
};

export default passwordResetEmail;
