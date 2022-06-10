import sendVerificationEmail from '../sendVerificationEmail'

// (async ()=>{
//     let output = await sendVerificationEmail('mbonimpa_218000124@stud.ur.ac.rw');
//     console.log(output);
// })();

sendVerificationEmail('geekyrw@gmail.com')
        .then((output) => {  
            console.log(output);
        })