import {removeItalicsFromParams} from "../../utils/configUtils";

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
    const {class_name_line, width, height, hoverClass, overlayClass, tooltipClass} = state;
    const graphWidth = width - margin.right - margin.left;
    const graphHeight = height - margin.top - margin.bottom;
    let {data, title, pointData, yAxisLabel} = state;
    const svg = d3.select(el).selectAll("svg");
    // The next 4 lines clean up previously existing graphs
    let g = svg.selectAll(".d3-line-charts");
    let g_dots = svg.selectAll(".d3-dots");
    g.remove();
    g_dots.remove();
    svg.selectAll("text").remove();
    d3.selectAll(tooltipClass).remove();
    svg.selectAll(".focus").remove();
    svg.selectAll("rect").remove();

    // This creates a placeholder for the graph
    g = svg.append("g")
        .attr("class", "d3-line-charts")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    g_dots = svg.append("g")
        .attr("class", "d3-dots")
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
        .text(removeItalicsFromParams(yAxisLabel));

    // Adds the dots
    g_dots.selectAll(".dot")
        .data(pointData)
        .enter().append("circle")
        .attr('fill', function (d) {
            return d.color;
        })
        .attr("cx", function (d) {
            return scales.x(d.date);
        })
        .attr("cy", function (d) {
            return scales.y(d.average);
        })
        .attr("r", 2);
    title = removeItalicsFromParams(title);
    let parsed_title = title;
    if (title.length > 35) {
        parsed_title = title.substring(0, 35) + "..."
    }
    // Add title
    svg.append("text")
        .attr("x", margin.left)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "left")
        .style("font-size", "16px")
        .style("text-decoration", "bold")
        .text(parsed_title)
        .append("svg:title").text(title);

    const rect = svg.append("rect");

    let focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    const yHoverClass = hoverClass + " y-hover-line";
    focus.append("line")
        .attr("class", yHoverClass)
        .style("stroke", "gray")
        .attr("y1", 0)
        .attr("y2", graphHeight);

    focus.append("circle")
        .attr("r", 6)
        .style("fill", "gray");

    const overlay_text = focus.append("text")
        .attr("x", 10)
        .attr("dy", ".31em")
        .style("fill", "white");

    const overlay = svg.append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", overlayClass)
        .attr("width", graphWidth)
        .attr("height", graphHeight)
        .on("mouseover", function () {
            focus.style("display", null);
        })
        .on("mousemove", mouse_move)
        .on("mouseout", mouse_out);

    const bisectDate = d3.bisector(function (d) {
        return d.date;
    }).left;

    function mouse_move() {

        const x0 = scales.x.invert(d3.mouse(this)[0]);
        let i = bisectDate(pointData, x0, 1);
        let d;
        if (i >= pointData.length) {
            d = pointData[i - 1];
        } else {
            const d0 = pointData[i - 1];
            const d1 = pointData[i];
            d = x0.getTime() - d0.date.getTime() > d1.date.getTime() - x0.getTime() ? d1 : d0;
        }
        let translate_x = margin.left + scales.x(d.date);
        let translate_y = margin.top + scales.y(d.average);
        focus.attr("transform", "translate(" + translate_x + "," + translate_y + ")");

        overlay_text.selectAll("tspan").remove();
        overlay_text.append("tspan")
            .attr("x", 8)
            .attr("dx", "0.2em")
            .attr("dy", "0.6em")
            .text("Date: " + d.date.getFullYear());
        overlay_text.append("tspan")
            .attr("x", 8)
            .attr("dx", "0.2em")
            .attr("dy", "1.2em")
            .text("Average: " + d.average.toFixed(2) + " " + removeItalicsFromParams(yAxisLabel));

        focus.select(".y-hover-line").attr("y2", graphHeight - scales.y(d.average));
        const bbox = overlay_text.node().getBBox();
        if (i > pointData.length * 0.65) {
            translate_x -= (bbox.width + 20);
            translate_y += 4;
            overlay_text.attr("transform", "translate(" + -(bbox.width + 20) + "," + 4 + ")");
        } else {
            overlay_text.attr("transform", "translate(0,0)");
        }
        rect.attr("transform", "translate(" + (translate_x) + "," + translate_y + ")");
        rect.style("display", null);
        rect.attr("x", 4)
            .attr("y", bbox.y - 4)
            .attr("width", bbox.width + 10)
            .attr("height", bbox.height + 10)
            .style("fill", "#1B4557")
            .style("fill-opacity", 0.9);
    }

    function mouse_out() {
        focus.style("display", "none");
        rect.style("fill-opacity", 0);
    }

};

export default D3Line;
