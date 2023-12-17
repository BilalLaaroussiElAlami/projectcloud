const express = require('express');
const app = express();
const port = 3000;

const images = [
    'Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack',
    'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Parker', 'Quinn', 'Riley', 'Sophia', 'Thomas',
];

const delta_millis_upload = 1000 //every delta_millis_upload, an image is uploaded
const podUID = process.env.METADATA_UID;


app.get('/', (req, res) => {
    res.send('hello world from pod: podUID  V2')
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


function main() {
    console.log("version 4 dindyemakom");
    console.log("podUID: ", podUID);
    setInterval(function () {
        const randomImage = images[Math.floor(Math.random() * images.length)]
        console.log(randomImage)
    }, delta_millis_upload)

}
main()