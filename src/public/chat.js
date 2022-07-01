// setup socket on client/ browser by using io object from linked cdn

const socket = io.connect("http://localhost:5000");

const senderName = document.querySelector('#name');
const message = document.querySelector('#message');
const output = document.querySelector('#output');
const sendBtn = document.querySelector('#send');
const feedback = document.querySelector("#feedback")

sendBtn.addEventListener('click', ()=>{

    //Emit or send chat to the server
    socket.emit('chat', {
        message:message.value,
        name:senderName.value
    })
})


//event for keypress on message
message.addEventListener('keypress', function(){

    socket.emit('typing', senderName.value)
    // alert(senderName.value)

})

// Listening or receiving to message sent by server

socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += "<p><em> "+data.name +": </em> " +data.message + "</p>"
})

socket.on('typing',function(data){
    feedback.innerHTML = "<p> " + data + " is typing..." + "</p>" 
})