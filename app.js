const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

const images = [
    'Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack',
    'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Parker', 'Quinn', 'Riley', 'Sophia', 'Thomas',
];


const delta_millis_upload = 1000 //every delta_millis_upload, an image is uploaded
const podHostname = process.env.HOSTNAME;


const version = fs.readFileSync('version.txt', 'utf8');


app.get('/', (req, res) => {
    res.send(`version ${version}, pod host name: ${podHostname}`)
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


function main() {
    console.log(`version ${version}`);
    setInterval(function () {
        const randomImage = images[Math.floor(Math.random() * images.length)]
        console.log(randomImage)
    }, delta_millis_upload)

}
main()