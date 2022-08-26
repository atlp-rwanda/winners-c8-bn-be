// setup socket on client/ browser by using io object from linked cdn

const socket = io({
  auth: {
    token: localStorage.getItem("token"),
  },
});

//collecting data from form
const senderName = document.querySelector("#name");
const message = document.querySelector("#message");
const output = document.querySelector("#output");
const sendBtn = document.querySelector("#send");
const feedback = document.querySelector("#feedback");
const user = document.querySelector("#user");

sendBtn.addEventListener("click", () => {
  //Emit or send chat to the server
  socket.emit("chat", {
    message: message.value,
    sender: senderName.value,
    createdAt: new Date(),
  });

  //reset form
  message.value = "";
});

//event for keypress on message
message.addEventListener("keypress", function () {
  socket.emit("typing", senderName.value);
});

// showing user's names
socket.on("onLoad", ({ firstName, lastName }) => {
  senderName.value = firstName + " " + lastName;
});

// Listening or receiving a message sent by server
socket.on("chat", function (data) {
  feedback.innerHTML = "";
  const filChat = generateDom(data);
  output.appendChild(filChat);
});

socket.on("onlyMe", function (data) {
  feedback.innerHTML = "";
  const filChat = generateDom(data);
  output.appendChild(filChat);
});

socket.on("typing", function (data) {
  feedback.innerHTML = "<p> " + data + " is typing..." + "</p>";
});

socket.on("message", ({ Chats, sender }) => {
  for (let index = 0; index < Chats.length; index++) {
    const filChat = appDom(Chats[index], sender);
    output.appendChild(filChat);
  }
});

socket.on("connect_error", (err) => {
  alert(`${err.message}`);
  window.localStorage.clear();
  location.replace("/login.html");
});
socket.on("notification", (data) => {
  alert(JSON.stringify(data));
});

socket.on("online", (count) => {
  const plural = count > 1 ? "s" : "";
  user.innerText = `online user${plural}: ${count}`;
});

// delete user token from localstorage
// socket.on("disconnect", () => {
//   localStorage.removeItem("token");
// });
