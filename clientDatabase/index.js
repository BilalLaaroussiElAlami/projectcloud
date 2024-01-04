const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = function (event) {
    console.log("opened connection")
    sendMessage();
};

ws.onmessage = function (event) {
    console.log(`Client received: ${event.data}`)
    sendMessage();
};

function sendMessage() {
    const message = "ping"
    ws.send(message);
}
