const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const axios = require('axios');

function getRandomImage() {
    try {
        const files = fs.readdirSync("images_test");
        const randomIndex = Math.floor(Math.random() * files.length);
        const randomImg = files[randomIndex];
        const randomimgPath = `images_test/${randomImg}`;
        // console.log("random path", randomimgPath)
        const data = fs.readFileSync(randomimgPath);
        return data;
    } catch (err) {
        console.error('Error:', err);
        return null;
    }
}

function takePicture() { return getRandomImage() }

//TODO: do actual call to head-count service
function getHeadCount(picture) {
    const count = 5 + Math.floor(Math.random() * 95)
    return count
}

/*
fs.readFile("images_test/1066405,1b8000ef60354f.jpg", (readErr, data) => {
    if (readErr) {
        console.error('Error reading the random image file:', readErr);
        return;
    }
    console.log("hier,", data)
})*/

/*
console.log("the result", takePicture())
console.log("the result", getRandomImage())
console.log("the result", getRandomImage())
*/


const delta_millis_upload = 1000 //every delta_millis_upload, an image is uploaded
const podHostname = process.env.HOSTNAME;


const version = fs.readFileSync('version.txt', 'utf8');

/*
app.get('/', (req, res) => {
    res.send(`version ${version}, pod host name: ${podHostname}`)
});
 
app.listen(port, () => {
    console.log(`Camera Server running at http://localhost:${port}`);
});
 
*/

function main() {
    console.log(`CAMERA LIVE: version ${version}`);
    setTimeout(function () {
        console.log("ping")
        const image = takePicture()
        const headCount = getHeadCount(image)
        const location = "antwerp"   //TODO how to manage location accross pods
        /*console.log("image", image)
        console.log("headcount", headCount)
        console.log("location", location)*/

        console.log('http://database-service')
        axios.get('http://database-service/')
            .then(response => {
                // Handle the response data
                console.log(response.data);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Request Error:', error);
            });

        console.log('http://database-service/')
        axios.get('http://database-service/')
            .then(response => {
                // Handle the response data
                console.log(response.data);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Request Error:', error);
            });
        console.log('http://database-service/3035')
        axios.get('http://database-service/3035')
            .then(response => {
                // Handle the response data
                console.log(response.data);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Request Error:', error);
            });
        console.log('http://database-service/3035/')
        axios.get('http://database-service/3035/')
            .then(response => {
                // Handle the response data
                console.log(response.data);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Request Error:', error);
            });

    }, delta_millis_upload)
}
main();

