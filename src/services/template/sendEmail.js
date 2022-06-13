/*eslint-disable */
import dotenv from 'dotenv';
dotenv.config();

export default (token, firstName)=>{
    const url = `${process.env.VERIFY_URL}/${token}`;
    const message = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <style>
        *{
            font-family: 'Open sans', sans-serif;
            padding:0;
            margin:0;
            overflow-x: hidden;
            
        }
        .content{
            /* display: flex;
            flex-direction: column; */
            background: url('https://www.travmonkey.com/wp-content/uploads/2011/12/kayak-thailand.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            padding-bottom: 5rem;
            width: 100%;
            height: 100%;
    
        }
        .row1{
            background: linear-gradient(180deg, rgb(70, 70, 70), rgb(27, 27, 27));
            transform: skew(0deg, 3deg);
            width: 100%;
            padding: 1.5rem;
            margin-top: 4rem;
        }
        .row1 p{
            font-size: 3rem;
            color: #fff;
            font-weight: 300;
            margin-top: 1rem;
    
        }
        .row1 p span{
            font-weight: 700;
        }
        .parent{
            background: #000;
        }
        a{
            color: #fff;
            background: linear-gradient(180deg, rgb(71, 71, 71), rgb(27, 27, 27));
            border: none;
            padding: .7rem;
            font-weight: 700;
            border-radius: .5rem;
            margin-top: 1rem;
        }
        img{
            width: 70%;
            margin: 0 3rem 0 3rem;
            height: 400px;
            align-self: center;
        }
        .row2{
            width: 50%;
            background-color: #fff;
            opacity: 80%;
            margin-left: 5%;
            border-radius: .5rem;
            padding: .5rem;
            margin-top: 3rem;
    
        }
    </style>
    <body>
        <div class="content">
          <div class="parent">
            <div class="row1">
                <p class="">Barefoot <span>Nomad</span></p>
            </div>
          </div>
          <div class="row2">
          <p>Hello ${firstName}</p><br>
            <h1>Welcome to Barefoot Nomad</h1>
            <p>Thanks so much for joining us! You are now on your way to be a good traveller<br><br>
                We provide better hotels and rooms such that you won't miss anything except the one you don't want<br><br>
                Feel free to contact us anytime you need it
                Please click the below button to confirm your email</p>
    
    
    
    
              <a href="${url}">
                Verify Email
            </a><br><br>
            <p><i>We are happy to have you on board! Please reply to this email if you have any comments, questions or feedback.<br><br>
    
                Cheerfully yours,<br>
                
                Barefoot Nomad Team</p></i>
          </div>
          
          
        </div>
        
    </body>
    </html>`;
    return message;

}