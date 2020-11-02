const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById( "add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");

let userName = "";

const buttonLogin = document.getElementById("joinBtn");
const buttonSend = document.getElementById("sendBtn");

const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('join', ({ author, content }) => addMessage(author, content));
socket.on('removeUser', ({ author, content }) => addMessage(author, content));

buttonLogin.addEventListener('click', ev => login(ev));

buttonSend.addEventListener('click', ev => sendMessage(ev));

function login(event) {
    event.preventDefault();
    const user = userNameInput.value;

    if (user.length === 0) {
        alert('No user name!');
    } else {
        userName = user;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
        socket.emit('join', {author: userName, content: userName + ' has joined the conversation!'});
    }
}

function sendMessage(event) {
    event.preventDefault();

    let messageContent = messageContentInput.value;

    if(!messageContent.length) {
        alert('You have to type something!');
    }
    else {
        addMessage(userName, messageContent);
        socket.emit('message', { author: userName, content: messageContent });
        messageContentInput.value = '';
    }
}

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
    messagesList.appendChild(message);
}