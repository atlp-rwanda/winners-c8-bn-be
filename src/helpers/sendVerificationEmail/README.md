# The `sendVerificationEmail()` helper function

The `sendVerificationEmail()` function was defined so as to be used to send verification emails to users after a successful registration.
The code belows shows an example of how it can be used:

## CODE (example of how to use the `sendVerificationEmail()` function):

```javascript
import sendVerificationEmail from '../sendVerificationEmail'

sendVerificationEmail('geekyrw@gmail.com') // here, you can use any email address you want to send to.
        .then((output) => {  
            console.log(output); // has to display {"response":"Email sent"} for a successful email delivery.
        })
```

## OUTPUT (screenshot from the inbox):


