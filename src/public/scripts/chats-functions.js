
// formatting time in arrogant way
const generateTimeForChat = timestamp =>{
    return moment(timestamp).fromNow();
}

// generate DOM for new chat
const generateDom = data =>{
    const divEl  = document.createElement('div');
    const pEl = document.createElement('p');
    const pan = document.createElement('span');
    
    // setup div
    divEl.classList.add('chat-display');
    pan.textContent = generateTimeForChat(data.createdAt);
    pan.classList.add('sp');

    pEl.textContent = `Me: ${data.message}`;
    pan.appendChild(pEl)
    divEl.appendChild(pan)

    return divEl;
}

// DOM for display all chats
const appDom = (data, meAsSender) =>{

    const divEl  = document.createElement('div');
    const pEl = document.createElement('p');
    const pan = document.createElement('span');
    
    // setup div
    divEl.classList.add('chat-display');
    pan.textContent = data.createdAt;
    pan.classList.add('sp');

    if(data.sender === meAsSender){
        data.sender = 'Me';
    }
    pEl.textContent = `${data.sender}: ${data.message}`;
    pan.appendChild(pEl)
    divEl.appendChild(pan)

    return divEl;
}

// to log user in
const loggingUserIn = (url, credentials)=>{
    fetch(url, {
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(credentials)
    })
    .then((result)=>result.json())
    .then((response)=>{
        if(response.status === 200){
            // save token in localstorage
            const token = JSON.stringify(response.data);
            localStorage.setItem('token', token);

            location.replace("/chat.html");

            //reset form
            form.reset()
        }else{

            alert(`${response.error}` +` "${response.message}"`);
        }
    })
}
