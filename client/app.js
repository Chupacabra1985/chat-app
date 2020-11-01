const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById( "add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");

let userName = "";

const buttonLogin = document.getElementById("joinBtn")
const buttonSend = document.getElementById("sendBtn");

buttonLogin.addEventListener('click', ev => login(ev));

buttonSend.addEventListener('click', ev => sendMessage(ev));

function login(event) {
    event.preventDefault();
    const user = userNameInput.value;

    if (user.length === 0) {
        alert('No user name!')
    } else {
        userName = user;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
}

function sendMessage(event) {
    event.preventDefault();

    const messageInput = messageContentInput.value;

    if (messageInput.length === 0) {
        alert('No message!')
    } else {
        addMessage(userName, messageInput);
        messageContentInput.value = "";
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