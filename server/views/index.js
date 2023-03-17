

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
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE0YzhiMTQ2NjdhMTQ0OGFkNjZkZGUiLCJpYXQiOjE2NzkwODM3MTMsImV4cCI6MTY3OTEyNjkxM30.vpL0ROzI_xeRw74wtiJFM7m_GRguykqKmXFlhtrA3Qk',
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
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE0YzhiMTQ2NjdhMTQ0OGFkNjZkZGUiLCJpYXQiOjE2NzkwODM3MTMsImV4cCI6MTY3OTEyNjkxM30.vpL0ROzI_xeRw74wtiJFM7m_GRguykqKmXFlhtrA3Qk',
      message: txt_mensagem.value
    }
  }
  wsocket.send(JSON.stringify(message));
});

// socket.on('msg', (msg) => {
//     txt_area.innerHTML += msg + '</br>';
// });

