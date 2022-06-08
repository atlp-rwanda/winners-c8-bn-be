import mail from '@sendgrid/mail';
import htmlEmailTemplate from './htmlEmailTemplate'
import 'dotenv/config';

const passwordResetEmail = () => {
  mail.setApiKey(process.env.SENDGRID_API_KEY);

  const mailData = {
    from: process.env.TECH_SUPPORT_EMAIL,
    to: 'ihimbazwelisa@gmail.com',
    subject: 'Barefoot Nomad Password reset Link',
    html: htmlEmailTemplate()
  };

  return mail.send(mailData)
    .then(() => 'Check your email for reset link...')
    .catch((error) => {
      throw new ApplicationError(error.message);
    });
};
export default passwordResetEmail;