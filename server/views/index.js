

//const socket = io.connect('/');

const btn = document.querySelector('#btnEnvia');
const btnGet = document.querySelector('#btnGetFeeds');
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

btnGet.addEventListener('click', () => {
  const message = {
    action: 'join-feedRoom',
    data: {
      chatRoom: 'feedRoom',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDEyMGQ2NDAxMTNlMGQ1MzJhNTU0NTEiLCJpYXQiOjE2NzkxNDg1MTksImV4cCI6MTY3OTE5MTcxOX0.zk9Nys9jdY8vePeHqmBgyMr2b9VSgG-LX5v3xyoKQMU',
      message: txt_mensagem.value
    }
  }
  wsocket.send(JSON.stringify(message));
});

btn.addEventListener('click', () => {
  const message = {
    action: 'join-feedRoom',
    data: {
      chatRoom: 'feedRoom',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDExMTAxZGYzODJkOWViMTcxODVmNzEiLCJpYXQiOjE2NzkxNjA3NDgsImV4cCI6MTY3OTIwMzk0OH0.I8fdIb65CuChf5jgWwKB8sNhcPzD2gxQypzkaw1HXho',
      message: txt_mensagem.value
    }
  }
  wsocket.send(JSON.stringify(message));
});

// socket.on('msg', (msg) => {
//     txt_area.innerHTML += msg + '</br>';
// });

