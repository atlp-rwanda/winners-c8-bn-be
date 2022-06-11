# The `sendEmail()` helper function

The `sendEmail()` function was defined so as to be used to send emails.
The code belows shows an example of how it can be used:

## CODE (example of how to use the `sendEmail()` function):

```javascript
import sendEmail from '../sendEmail'

import 'dotenv/config';

const mailObj = {
    receiverEmail : 'geekyrw@gmail.com', // you can put any email you want to send to
    subject: 'ATLP8 Winnners: Testing this helper function',
    title: 'We are testing this helper function',
    body: `In case you want to know more, <br> <strong>Click on the button below:</strong>`,
    link: process.env.APP_HEROKU_LINK,
    linkAltText: "Visit our heroku App!"
}
sendEmail(mailObj)
        .then((output) => {  
            console.log(output); // has to display {"response":"Email sent"} for a successful email delivery.
        })
```

## OUTPUT (screenshot from the inbox):

