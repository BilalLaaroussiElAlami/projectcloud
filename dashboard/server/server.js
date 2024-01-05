const express = require('express');
const path = require('path');
const multer = require('multer'); // For handling file uploads
const bodyParser = require('body-parser');
const fs = require('fs');
const WebSocket = require('ws');
const app = express();
const port = process.env.PORT || 3030 //  Math.floor(Math.random() * (3040 - 3031 + 1)) + 3031;


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Set up a route to handle requests for the main HTML file
app.get('/', (req, res) => {
    console.log("im in here")
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
const version = 5
// Start the server
app.listen(port, () => {
    console.log(`Dashboard server version ${version} LIVE,  running at http://localhost:${port}`);
});
/*
const ws = new WebSocket('ws://localhost:8080');

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
    const imagePath = path.join(__dirname, 'uploads', imageName);

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
*/