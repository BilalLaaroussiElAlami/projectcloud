// Initial data for the bar chart
let data = [10, 20, 30, 40, 50];

// Set up the SVG canvas dimensions
const svgWidth = 500;
const svgHeight = 300;
const barPadding = 5;

// Create SVG element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

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

// Function to add an element to the data list
function addDataElement() {
    const newValue = Math.floor(Math.random() * 50) + 1; // Generate a random value
    data.push(newValue);
    updateChart();
}

// Call addDataElement every 1000 milliseconds
setInterval(addDataElement, 1000);
