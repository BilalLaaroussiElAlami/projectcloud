const express = require('express');
const path = require('path');
const multer = require('multer'); // For handling file uploads
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3035;

/*
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Set up a route to handle requests for the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
*/

// Start the server
app.listen(port, () => {
    console.log(`Database server LIVE,  running at http://localhost:${port}`);
});

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to handle the submission
app.post('/submit-data', upload.single('image'), (req, res) => {
    // Get the submitted data
    const location = req.body.location;
    const time = req.body.time;
    const number = req.body.number;
    const image = req.file; // This will contain the uploaded image

    // Do something with the submitted data (e.g., save to a database, process, etc.)
    // For demonstration purposes, let's log the received data
    console.log('Received Data:');
    console.log('Location:', location);
    console.log('Time:', time);
    console.log('Number:', number);
    if (image) {
        const imageName = Date.now() + '-' + image.originalname;
        const imagePath = path.join(__dirname, 'uploads', imageName);
        fs.writeFileSync(imagePath, image.buffer);
        console.log('Image:', image); // Image details will be available here
    }

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            const data = {
                image: image.toString('base64'), // Convert the buffer to base64 for transmission
                location: location,
                time: time,
                number: number,
            };
            client.send(JSON.stringify(data));
        }
    })

    // Respond with a success message
    res.status(200).json({ message: 'Data received successfully' });
});


const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log("a client connected")
    ws.on('message', function incoming(message) {
        // Broadcast received message to all clients
        console.log(`Server received: ${message}`)
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                // setTimeout(() => { client.send(`pong`); }, 1000);
            }
        });
    });
});
