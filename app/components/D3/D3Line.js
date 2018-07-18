import {boxQuartiles, iqr}  from "./D3BoxAndWhiskers";
import {getTimeSeriesZeroStart, getTimeSeriesSensorExtent} from "../../utils/getConfig";

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

    if(getTimeSeriesSensorExtent()) {
        //Use as extent the full sensor range
        x.domain([state.selectedStartDate, state.selectedEndDate]);
    } else {
        // Use as extent the parameter data
        x.domain(d3.extent(data, function(d) {return d.date;}));
    }

    const y = d3.scaleLinear()
        .range([height, 0]);
    if(getTimeSeriesZeroStart()) {
        y.domain([0, d3.max(data, function(d){return d.average;})]);
    } else {
        y.domain([d3.min(data, function(d){return d.average;}),
             d3.max(data, function(d){return d.average;})]);
    }

    return {x: x, y: y};

};

D3Line._drawPoints = function(el, state) {
    const {data, class_name_line, class_name_dots, yAxisLabel, width, height, title, sources,
    boxClass, rectClass, lineClass, medianClass, outlierClass, displayLines} = state;
    const graphWidth = width - margin.right - margin.left;
    const graphHeight = height - margin.top - margin.bottom;
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
    let averages = [];
    data.forEach(function(d){
        d.average = +d.average;
        averages.push(d.average);
    });

    const scales = this._scales(el, data, state);

    let domain = null;
    averages = averages.sort(d3.ascending);
    const min = getTimeSeriesZeroStart() ? 0 : averages[0];
    const max = averages[averages.length-1];
    const quartileData = averages.quartiles = boxQuartiles(averages);
    const box = g.selectAll("rect.box")
        .data([quartileData]);

    let boxClasses = "box " + boxClass + " " + rectClass;
    box.enter().append("rect")
        .attr("class", boxClasses)
        .attr("x", 0)
        .attr("y", function(d) {return scales.y(d[2]);})
        .attr("width", graphWidth)
        .attr("height", function(d) {return scales.y(d[0]) - scales.y(d[2])});

    // Draw Median Line
    const medianLine = g.selectAll("line.median")
        .data([quartileData[1]]);

    const medianClasses = "median " + medianClass+ " " + lineClass;
    medianLine.enter().append("line")
        .attr("class", medianClasses)
        .attr("x1", 0)
        .attr("y1", scales.y)
        .attr("x2", graphWidth)
        .attr("y2", scales.y);

    const whiskers = iqr(1.5);

    // Compute whiskers. Must return exactly 2 elements, or null.
    const whiskerIndices = whiskers && whiskers.call(this, averages);

    const whiskerData = whiskerIndices && whiskerIndices.map(function(i) {return averages[i]});

    // Add Whiskers
    const whisker = g.selectAll("line.whisker")
        .data(whiskerData || []);

    const whiskerClasses = "whisker " + lineClass;
    whisker.enter().insert("line")
        .attr("class", whiskerClasses)
        .attr("x1", 0)
        .attr("y1", scales.y)
        .attr("x2", graphWidth)
        .attr("y2", scales.y)
        .style("opacity", 1);

    if(displayLines) {
        // This is the function that creates the line based on the input. It is used in the next step
        const value_line = d3.line()
            .x(function(d) { return scales.x(d.date);})
            .y(function(d) { return scales.y(d.average);});

        // This creates and adds the data to the path svg element and creates the line graph
        g.append("path")
            .data([data])
            .attr("class", class_name_line)
            .attr("d", value_line);
    }

    // Creates the horizontal axis and adds the label.
    g.append("g")
        .attr("transform", "translate(0," + (graphHeight + 3) + ")")
        .call(d3.axisBottom(scales.x))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "translate("+ ((graphWidth)/2) + "," +
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
        .attr("class", function(d) {
            if(d.average > whiskerData[1] || d.average < whiskerData[0]) {return outlierClass; }
            else {return class_name_dots; }
        })
        .attr("cx", function(d) {return scales.x(d.date)})
        .attr("cy", function(d) { return scales.y(d.average)})
        .attr("r", 4);

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
