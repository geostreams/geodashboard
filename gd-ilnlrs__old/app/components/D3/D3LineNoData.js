import {removeItalicsFromParams} from "../../utils/configUtils";

const D3LineNoData = {};
const d3 = require("d3");

const margin = {top: 30, right: 20, bottom: 50, left: 50};

D3LineNoData.create = function (el, props, state) {
    let svg = d3.select(el).append("svg")
        .attr("class", "d3")
        .attr("width", props.width)
        .attr("height", props.height);

    this.update(el, state);
};

D3LineNoData.update = function (el, state) {
    this._drawPoints(el, state);
};

D3LineNoData.destroy = () => {

};

D3LineNoData._scales = function (el, data) {
    if (!data) {
        return null;
    }

    const width = el.offsetWidth - margin.left - margin.right;
    const height = el.offsetHeight - margin.top - margin.bottom;

    const x = d3.scaleLinear()
        .range([0, width])
        .domain([
            d3.min(data, function(d){return d.date;}),
            d3.max(data, function(d){return d.date;})
        ]);

    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([
            d3.min(data, function(d){return d.average;}),
            d3.max(data, function(d){return d.average;})
        ]);

    return {x: x, y: y};

};

D3LineNoData._drawPoints = function (el, state) {
    const {width, height} = state;
    const graphWidth = width - margin.right - margin.left;
    const graphHeight = height - margin.top - margin.bottom;
    let {data, title, yAxisLabel} = state;
    const svg = d3.select(el).selectAll("svg");
    // The next 4 lines clean up previously existing graphs
    let g = svg.selectAll(".d3-line-charts");
    g.remove();
    svg.selectAll("text").remove();

    // This creates a placeholder for the graph
    g = svg.append("g")
        .attr("class", "d3-line-charts")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Set up data
    let averages = [];

    function sortByDateAscending(a, b) {
        return a.date - b.date;
    }

    data.forEach(function (d) {
        d.average = +d.average;
        averages.push(d.average);
    });
    data = data.sort(sortByDateAscending);
    const scales = this._scales(el, data, state);

    // This creates and adds the graph
    g.append("text")
        .attr("text-anchor", "start")
        .attr('font-size', '1em')
        .attr('x', 150)
        .attr('y', 165)
        .text("No Data Available");

    // Creates the horizontal axis and adds the label.
    g.append("g")
        .attr("transform", "translate(0," + (graphHeight + 3) + ")")
        .call(d3.axisBottom(scales.x))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "translate(" + ((graphWidth) / 2) + "," +
            28 + ")")
        .attr("text-anchor", "end");

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
        .text(removeItalicsFromParams(yAxisLabel));

    title = removeItalicsFromParams(title);
    let parsed_title = title;
    if (title.length > 35) {
        parsed_title = title.substring(0, 35) + "..."
    }

    // Add title and sources
    svg.append("text")
        .attr("x", margin.left)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "left")
        .style("font-size", "16px")
        .style("text-decoration", "bold")
        .text(parsed_title)
        .append("svg:title").text(title);

};

export default D3LineNoData;