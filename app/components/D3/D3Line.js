const D3Line = {};
const d3 = require('d3');


const margin =  {top: 30, right: 20, bottom: 50, left: 50};

D3Line.create = function(el, props, state) {

    let svg = d3.select(el).append('svg')
        .attr('class', 'd3')
        .attr('width', props.width )
        .attr('height', props.height);

    this.update(el, state);
};

D3Line.update = function (el, state, configuration, chart) {
    this._drawPoints(el, state);
};

D3Line.destroy = () => {

};

D3Line._scales = function (el, data, state){
    if(!data) {
        return null;
    }

    const width = el.offsetWidth - margin.left - margin.right;
    const height = el.offsetHeight - margin.top - margin.bottom;

    const x = d3.scaleTime()
        .range([0, width]);

    if(state.use_sensor_extent) {
        //Use as extent the full sensor range
        x.domain([state.selectedStartDate, state.selectedEndDate]);
    } else {
        // Use as extent the parameter data
        x.domain(d3.extent(data, function(d) {return d.date;}));
    }

    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, function(d){return d.average;})]);

    return {x: x, y: y};

};

D3Line._drawPoints = function(el, state) {
    const {data, class_name_line, class_name_dots, yAxisLabel, width, height, title, sources } = state;
    const svg = d3.select(el).selectAll('svg');
    // The next 4 lines clean up previously existing graphs
    let g = svg.selectAll('.d3-line-charts');
    let g_dots = svg.selectAll(".d3-dots");
    g.remove();
    g_dots.remove();

    // This creates a placeholder for the graph
    g = svg.append('g')
        .attr('class', 'd3-line-charts')
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    g_dots = svg.append('g')
        .attr('class', 'd3-dots')
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Set up data
    const parseTime = d3.timeParse("%d-%b-%y");

    data.forEach(function(d){
        d.average = +d.average
    });
    const scales = this._scales(el, data, state);

    // This is the function that creates the line based on the input. It is used in the next step
    const value_line = d3.line()
        .x(function(d) { return scales.x(d.date);})
        .y(function(d) { return scales.y(d.average);});

    // This creates and adds the data to the path svg element and creates the line graph
    g.append("path")
        .data([data])
        .attr("class", class_name_line)
        .attr("d", value_line);

    // Creates the horizontal axis and adds the label.
    g.append("g")
        .attr("transform", "translate(0," + (height - margin.top - margin.bottom + 3) + ")")
        .call(d3.axisBottom(scales.x))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "translate("+ ((width - margin.left - margin.right)/2) + "," +
           28 + ")")
        .attr("text-anchor", "end")
        .text("Date");

    // Creates the vertical axis and adds the label
    g.append("g")
        .call(d3.axisLeft(scales.y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-4em")
        .attr("dx", "-15em")
        .attr("text-anchor", "end")
        .text(yAxisLabel);

    // Adds the dots
    g_dots.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", class_name_dots)
        .attr("cx", function(d) {return scales.x(d.date)})
        .attr("cy", function(d) { return scales.y(d.average)})
        .attr("r", 5);

    // Add title and sources
    svg.append("text")
        .attr("x", margin.left)
        .attr("y", margin.top/2)
        .attr("text-anchor", "left")
        .style("font-size", "16px")
        .style("text-decoration", "bold")
        .text(title);

    // Adding sources in the top right
    let sourceLabel = svg.append("text")
        .attr("x", width - margin.right)
         .attr("y", margin.top/2)
         .style("text-anchor", "end")
         .text("Sources: ");


    let sourceLabelIndex = sourceLabel.selectAll(".graphs-sourceLabelIndex").data(sources, function(d) { return(d); });
    sourceLabelIndex.enter()
        .append("a")
        .attr("xlink:href", function(d) { return d; })
        .attr("target", "clowder")
        .attr("class", "graphs-sourceLabelIndex")
        .style("cursor", "pointer")
        .text(function(d, i) { if (d === "...") { return d; } else { return "[" + (i + 1) + "]"; } })
        .append("title")
        .text("Original data source");
    sourceLabelIndex.exit().remove();

};

export default D3Line;
