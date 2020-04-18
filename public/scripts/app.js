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

const fade = (element, fadeType) => {
  if (fadeType === 'fadeIn') {
    element.classList.add('fade-in');
  }
  if (fadeType === 'fadeOut') {
    element.classList.remove('fade-in');
    element.classList.add('fade-out');
  }
};

const name = prompt('What is your name?');

const joinedMessage = document.createElement('li');
joinedMessage.id = 'online';
joinedMessage.innerText = 'You are online! start writing';
messagesList.append(joinedMessage);
joinedMessage.classList.add('message--online-status');
let onlineMessage = document.getElementById('online');

setTimeout(() => {
  fade(onlineMessage, 'fadeIn');
}, 500);

socket.emit('new-user', name);

socket.on('chat-message', ({ message, userName }) => {
  appendMessage(`${userName} says: ${message}`, 'message--contact');
});

socket.on('user-connected', userName => {
  appendMessage(`${userName} connected!`);
});

myForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = input.value;
  socket.emit('send-chat-message', message);
  onlineMessage = document.getElementById('online');
  if (onlineMessage) {
    setTimeout(() => {
      fade(joinedMessage, 'fadeOut');
      setTimeout(() => {
        onlineMessage.remove();
      }, 500);
    }, 500);
  }
  appendMessage(`You: ${message}`, 'message--self');
  input.value = '';
});
