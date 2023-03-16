

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
      user: '64120d640113e0d532a55451',
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
      user: '64139190ce15404b81b3ca2d',
      message: txt_mensagem.value
    }
  }
  wsocket.send(JSON.stringify(message));
});

// socket.on('msg', (msg) => {
//     txt_area.innerHTML += msg + '</br>';
// });

