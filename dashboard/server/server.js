const express = require('express');
const path = require('path');

const app = express();
//const port = process.env.PORT || 3000;
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Set up a route to handle requests for the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
