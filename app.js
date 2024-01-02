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
    console.log(`Camera Server running at http://localhost:${port}`);
});


function main() {
    console.log(`version ${version}`);
    setInterval(function () {
        const randomImage = images[Math.floor(Math.random() * images.length)]
        console.log(randomImage)
    }, delta_millis_upload)
}

//-----------------CODE FOR ACCESSING DASHBOARD PODS------------------------
const k8s = require('@kubernetes/client-node');
const axios = require('axios');

// Load Kubernetes config
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

// Create Kubernetes API client
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// Define the namespace and label selector
const namespace = 'default'; // Change this to your namespace if different
const labelSelector = 'app=my-app';  //might become problem with multiple deployment's -> solution add other key values tto deployments we don't want and filter them out in here

// Function to make requests to pods
async function makeRequestsToPods() {
    try {
        // Get pods with the specified label selector

        const { body: podList } = await k8sApi.listNamespacedPod(namespace, undefined, undefined, undefined, undefined, labelSelector);

        // Iterate through each pod and make requests
        podList.items.forEach(pod => {
            const podIP = pod.status.podIP;
            const podPort = 30001; // Change this to your target port if different
            console.log("======================================/n")
            console.log("pod: ", pod)
            console.log("======================================/n")
            const submitDataEndpoint = `http://${podIP}:${podPort}/submit-data`;

            // Example request payload (adjust as needed)
            const requestData = {
                location: 'Sample Location',
                time: 'Sample Time',
                number: 12345,
                // Add your image file here if required by your endpoint
                // image: <your_image_data_here>
            };

            // Make an HTTP POST request to the submit-data endpoint
            axios.post(submitDataEndpoint, requestData)
                .then(response => {
                    console.log(`Request to pod ${pod.metadata.name} successful:`, response.data);
                })
                .catch(error => {
                    console.error(`Request to pod ${pod.metadata.name} failed:`, error.message);
                });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function to make requests to pods
makeRequestsToPods();


main()