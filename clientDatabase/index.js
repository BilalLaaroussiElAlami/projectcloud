const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8080');
const fs = require('fs');
const path = require('path');

ws.onopen = function (event) {
    console.log("opened connection")
    sendMessage();
};

ws.onmessage = function (event) {
    console.log(`Client received: ${event.data}`)

    const receivedData = JSON.parse(event.data);
    const base64Image = receivedData.image;
    const location = receivedData.location
    console.log(`location ${location}`)
    // Remove the metadata prefix ("data:image/png;base64,")
    console.log(`base64Image ${base64Image}`)
    //const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    //console.log(`base64Data ${base64Data}`)
    const buffer = Buffer.from(base64Image, 'base64');

    const imageName = `${Date.now()}-image.png`;
    const imagePath = path.join(__dirname, 'uploadsClient', imageName);

    fs.writeFile(imagePath, buffer, (err) => {
        if (err) {
            console.error('Error saving image:', err);
        } else {
            console.log('Image saved successfully:', imageName);
        }
    });
    //sendMessage();
};

function sendMessage() {
    const message = "ping"
    ws.send(message);
}
