const form = document.querySelector('#join-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    //collect data from  inputs
    const data = {
        email:email.value,
        password:password.value
    }

    const endpoint = '/api/auth/signin';

    loggingUserIn(endpoint, data);

})