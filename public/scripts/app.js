const socket = io();

const myForm = document.getElementById('myForm');
const input = document.getElementById('input');

socket.on('chat-message', message => {
  console.log('received =>', message);
});

myForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = input.value;
  socket.emit('send-chat-message', message);
  input.value = '';
});
