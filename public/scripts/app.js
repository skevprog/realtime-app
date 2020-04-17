const socket = io();

const myForm = document.getElementById('myForm');
const messageList = document.getElementById('messages');
const input = document.getElementById('input');

const name = prompt('What is your name?');

socket.emit('new-user', name);

const appendMessage = message => {
  const messageElement = document.createElement('li');
  messageElement.innerText = message;
  messageList.append(messageElement);
};

socket.on('chat-message', ({ message, userName }) => {
  appendMessage(`${userName} says: ${message}`);
});

socket.on('user-connected', userName => {
  appendMessage(`${userName} connected!`);
});

myForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = input.value;
  socket.emit('send-chat-message', message);
  appendMessage(`You: ${message}`)
  input.value = '';
});
