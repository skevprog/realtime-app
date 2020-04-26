const socket = io();

const myForm = document.getElementById('myForm');
const messagesList = document.getElementById('messages');
const input = document.getElementById('input');

const appendMessage = (message, classStyle) => {
  const messageElement = document.createElement('li');
  messageElement.innerText = message;
  messageElement.classList.add(...['message', classStyle]);
  messagesList.append(messageElement);
  messagesList.scrollTop = messagesList.scrollHeight; // push the scroll to see the last messages
};

const fadeIn = element => element.classList.add('fade-in');
const fadeOut = element => element.classList.add('fade-out');

const name = prompt('What is your name?') || 'Uknown';

const joinedMessage = document.createElement('li');
joinedMessage.id = 'online';
joinedMessage.innerText = 'You are online! start writing';
messagesList.append(joinedMessage);
joinedMessage.classList.add('message--online-status');
let onlineMessage = document.getElementById('online');

setTimeout(() => {
  fadeIn(onlineMessage);
}, 500);

socket.emit('new-user', name);

socket.on('chat-message', ({ message }) => {
  appendMessage(`${message}`, 'message--contact');
});

socket.on('user-connected', userName => {
  appendMessage(`${userName} connected!`, 'message--contact-conected');
});

myForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = input.value;
  socket.emit('send-chat-message', message);
  onlineMessage = document.getElementById('online');
  if (onlineMessage) {
    setTimeout(() => {
      fadeOut(joinedMessage);
      setTimeout(() => {
        onlineMessage.remove();
      }, 500);
    }, 500);
  }
  appendMessage(`${message}`, 'message--self');
  input.value = '';
});
