
//---------------------------------BAR CHART HISTORY---------------------------------------
// Initial data for the bar chart
let data = [20, 20, 20];

// Set up the SVG canvas dimensions
const svgWidth = 400;
const svgHeight = 400;
const barPadding = 5;
const nBars = 7;
const history_time = nBars * 30;

// Create SVG element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .attr("transform", 'translate(5,0)');


// Function to update the bar chart
function updateChart() {
    // Update bars
    const bars = svg.selectAll('rect')
        .data(data);

    bars.enter()
        .append('rect')
        .merge(bars)
        .attr('x', (d, i) => i * (svgWidth / data.length))
        .attr('y', d => svgHeight - d * 5)
        .attr('width', svgWidth / data.length - barPadding)
        .attr('height', d => d * 5)
        .attr('fill', 'teal');

    bars.exit().remove();
}

var x = 14
// Function to add an element to the data list
function addDataElement() {
    x = x + 1;
    if (data.length >= nBars) {
        data.shift();
    }
    data.push(x);
    updateChart();
}
// Call addDataElement every 1000 milliseconds
setInterval(addDataElement, 1000);



//------------------BAR TOTAL------------------------------------------------

// Get the div where you want to append the SVG
const svg2 = d3.select("#number_people_chart")
    .append("svg")
    .attr("width", 250) // Width of the SVG
    .attr("height", 300) // Height of the SVG
    .attr("transform", 'translate(0,145)');

// Set the initial value
let nPeople = 150;

// Create the scale for the vertical axis
const yScale = d3.scaleLinear()
    .domain([0, 300]) // Define the domain of your data (0 to 100 in this case)
    .range([250, 50]); // Define the range of the axis (from bottom to top)

// Create the vertical axis
const yAxis = d3.axisLeft(yScale);

// Append the vertical axis to the SVG
svg2.append("g")
    .attr("transform", "translate(50,0)") // Position the axis
    .call(yAxis);

// Create the bar
const barr = svg2.append("rect")
    .attr("x", 55) // X position of the bar
    .attr("y", yScale(nPeople)) // Start position of the bar based on data
    .attr("width", 50) // Width of the bar
    .attr("height", yScale(0) - yScale(nPeople)) // Height of the bar
    .attr("fill", "steelblue"); // Bar color

// Function to update the bar height based on new data
function updateBar(newData) {
    barr.transition()
        .duration(500) // Transition duration
        .attr("y", yScale(newData)) // New Y position based on the new data
        .attr("height", yScale(0) - yScale(newData)); // New height based on the new data
}

// Example: Call updateBar with a new value after some time
setInterval(() => {
    nPeople += -10 + Math.floor(Math.random() * 20)
    updateBar(nPeople);
}, 1000); // Update after 2 seconds (2000 milliseconds)


//-----------------------IMAGES--------------------------

function updateLocation(location, image, people) {
    document.getElementById(location + "Number").innerHTML = people
    document.getElementById(location).src = image
}

setTimeout(() => {
    updateLocation("antwerp", "exampleImage.jpg", 100)
}, 1000)
