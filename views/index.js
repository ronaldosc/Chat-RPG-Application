

//const socket = io.connect('/');

const btn = document.querySelector('#btnEnvia');
const txt_mensagem = document.querySelector('#texto_mensagem');
const txt_area = document.querySelector('#historico_mensagens');

// Create a WebSocket connection
const host = window.location.hostname;
const wsocket = new WebSocket(`ws://${host}:5001`);

// Handle WebSocket events
wsocket.addEventListener('open', (event) => {
  console.log('WebSocket connection established');
});

wsocket.addEventListener('message', (event) => {
  console.log(`Received WebSocket message: ${event.data}`);
  txt_area.innerHTML += event.data + '</br>';
});

wsocket.addEventListener('close', (event) => {
  console.log('WebSocket connection closed');
});

btn.addEventListener('click', () => {
  wsocket.send(txt_mensagem.value);
});

// socket.on('msg', (msg) => {
//     txt_area.innerHTML += msg + '</br>';
// });

