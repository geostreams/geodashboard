const D3Line = {};
const d3 = require('d3');

const margin = {top: 30, right: 20, bottom: 50, left: 50};

D3Line.create = function (el, props, state) {
    let svg = d3.select(el).append('svg')
        .attr('class', 'd3')
        .attr('width', props.width)
        .attr('height', props.height);

    this.update(el, state);
};

D3Line.update = function (el, state) {
    this._drawPoints(el, state);
};

D3Line.destroy = () => {

};

D3Line._scales = function (el, data, state) {
    if (!data) {
        return null;
    }

    const width = el.offsetWidth - margin.left - margin.right;
    const height = el.offsetHeight - margin.top - margin.bottom;

    const x = d3.scaleTime()
        .range([0, width]);

    x.domain([
        d3.min(data, function (d) {
            return d3.min(d.values, function (a) {
                return a.date;
            });
        }),
        d3.max(data, function (d) {
            return d3.max(d.values, function (a) {
                return a.date;
            });
        })
    ]);

    const y = d3.scaleLinear()
        .range([height, 0]);

    if (state.startAtZero) {

        y.domain([
            0,
            d3.max(data, function (d) {
                return d3.max(d.values, function (a) {
                    return a.average;
                });
            })
        ]);

    } else {

        y.domain([
            d3.min(data, function (d) {
                return d3.min(d.values, function (a) {
                    return a.average;
                });
            }),
            d3.max(data, function (d) {
                return d3.max(d.values, function (a) {
                    return a.average;
                });
            })
        ]);

    }

    return {x: x, y: y};

};

D3Line._drawPoints = function (el, state) {
    const {class_name_line, yAxisLabel, width, height} = state;
    const graphWidth = width - margin.right - margin.left;
    const graphHeight = height - margin.top - margin.bottom;
    let {data} = state;
    const svg = d3.select(el).selectAll('svg');

    // The next lines clean up previously existing graphs
    let g = svg.selectAll('.d3-line-charts');
    g.remove();
    svg.selectAll("text").remove();
    svg.selectAll(".focus").remove();

    // This creates a placeholder for the graph
    g = svg.append('g')
        .attr('class', 'd3-line-charts')
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Set up data
    const scales = this._scales(el, data, state);

    let value_line = d3.line()
        .x(function (d) {
            return scales.x(d.date);
        })
        .y(function (d) {
            return scales.y(d.average);
        });

    let dataLine = svg.selectAll(".dataLine")
        .data(data)
        .enter()
        .append("g")
        .attr('class', 'd3-line-charts')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    dataLine.append("path")
        .attr("class", class_name_line)
        .attr("d", function (d) {
            return value_line(d.values);
        })
        .style("stroke", function (d) {
            return (d.color)
        });

    // Creates the horizontal axis and adds the label.
    g.append("g")
        .attr("transform", "translate(0," + (graphHeight + 3) + ")")
        .call(d3.axisBottom(scales.x));

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

};

export default D3Line;
