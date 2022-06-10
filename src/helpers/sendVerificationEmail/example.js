import sendVerificationEmail from '../sendVerificationEmail'

sendVerificationEmail('geekyrw@gmail.com')
        .then((output) => {  
            console.log(output);
        })