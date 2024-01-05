/*
// Initial data for the bar chart
let data = [10, 20, 30, 40, 50];

// Set up the SVG canvas dimensions and margins
const svgWidth = 500;
const svgHeight = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;
const barPadding = 5;

// Create SVG element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

// Create a group for the chart area
const chart = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

// Create x and y scales
const xScale = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0, chartWidth])
    .padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([chartHeight, 0]);

// Create x and y axes
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

// Append x axis
chart.append('g')
    .attr('transform', `translate(0, ${chartHeight})`)
    .call(xAxis);

// Append y axis
chart.append('g')
    .call(yAxis);

// Function to update the bar chart
function updateChart() {
    // Update scales
    xScale.domain(d3.range(data.length));
    yScale.domain([0, d3.max(data)]);

    // Update axes
    chart.select('.x-axis')
        .transition()
        .duration(500)
        .call(xAxis);

    chart.select('.y-axis')
        .transition()
        .duration(500)
        .call(yAxis);

    // Update bars
    const bars = chart.selectAll('rect')
        .data(data);

    bars.enter()
        .append('rect')
        .merge(bars)
        .attr('x', (d, i) => xScale(i))
        .attr('y', d => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => chartHeight - yScale(d))
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
*/