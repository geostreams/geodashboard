import {boxQuartiles, iqr} from "./D3BoxAndWhiskers";
import {removeItalicsFromParams} from "../../utils/configUtils";

const D3Line = {};
const d3 = require("d3");

const margin = {top: 30, right: 20, bottom: 50, left: 50};

D3Line.create = function (el, props, state) {
    let svg = d3.select(el).append("svg")
        .attr("class", "d3")
        .attr("width", props.width)
        .attr("height", props.height);

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

    if (state.use_sensor_extent) {
        //Use as extent the full sensor range
        x.domain([state.selectedStartDate, state.selectedEndDate]);
    } else {
        // Use as extent the parameter data
        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));
    }

    let y_extent = d3.extent(data, function (d) {
        return d.average;
    });
    let y_range = y_extent[1] - y_extent[0];

    const y = d3.scaleLinear()
        .range([height, 0]);
    if (state.startAtZero) {
        y.domain([0 - (y_extent[1] * 0.02), d3.max(data, function (d) {
            return d.average;
        }) + (y_extent[1] * 0.02)]);
    } else {
        y.domain([d3.min(data, function (d) {
            return d.average;
        }) - (y_range * 0.02),
            d3.max(data, function (d) {
                return d.average;
            }) + (y_range * 0.02)]);
    }

    return {x: x, y: y};

};

D3Line._drawPoints = function (el, state) {
    const {width, height, sources, displayLines, startAtZero, binType, tooltipClass, overlayClass} = state;
    const graphWidth = width - margin.right - margin.left;
    const graphHeight = height - margin.top - margin.bottom;
    let {data, title, yAxisLabel} = state;
    title = removeItalicsFromParams(title);
    const svg = d3.select(el).selectAll("svg");

    const class_name_line = "fill: none; stroke: #56B4E9; stroke-width: 2px;";
    const class_name_dots = "fill: #0072B2; stroke: #0072B2;";
    const boxClass = "font: 10px sans-serif;";
    const lineClass = "fill: #fff; stroke: #000; stroke-width: 1px;";
    const rectClass = "fill: #DCEEF5;";
    const medianClass = "stroke-dasharray: 3, 3;";
    const outlierClass = "fill: #D55E00; stroke: #D55E00;";
    const hoverClass = "stroke: #009E73; stroke-width: 2px; stroke-dasharray: 3, 3;";

    if (state.width <= 0) {
        return;
    }
    svg.attr("width", state.width);

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
    const parseTime = d3.timeParse("%d-%b-%y");
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

    let domain = null;
    averages = averages.sort(d3.ascending);
    const min = startAtZero ? 0 : averages[0];
    const max = averages[averages.length - 1];
    const quartileData = averages.quartiles = boxQuartiles(averages);
    const box = g.selectAll("rect.box")
        .data([quartileData]);

    let boxClasses = "box ";
    box.enter().append("rect")
        .attr("class", boxClasses)
        .attr("style", boxClass)
        .attr("style", rectClass)
        .attr("x", 0)
        .attr("y", function (d) {
            return scales.y(d[2]);
        })
        .attr("width", graphWidth)
        .attr("height", function (d) {
            return scales.y(d[0]) - scales.y(d[2])
        });

    // Draw Median Line
    const medianLine = g.selectAll("line.median")
        .data([quartileData[1]]);

    const medianClasses = "median ";
    medianLine.enter().append("line")
        .attr("class", medianClasses)
        .attr("style", medianClass)
        .attr("style", lineClass)
        .attr("x1", 0)
        .attr("y1", scales.y)
        .attr("x2", graphWidth)
        .attr("y2", scales.y);

    const whiskers = iqr(1.5);

    // Compute whiskers. Must return exactly 2 elements, or null.
    const whiskerIndices = whiskers && whiskers.call(this, averages);

    const whiskerData = whiskerIndices && whiskerIndices.map(function (i) {
        return averages[i]
    });

    // Add Whiskers
    const whisker = g.selectAll("line.whisker")
        .data(whiskerData || []);

    const whiskerClasses = "whisker ";
    whisker.enter().insert("line")
        .attr("class", whiskerClasses)
        .attr("style", lineClass)
        .attr("x1", 0)
        .attr("y1", scales.y)
        .attr("x2", graphWidth)
        .attr("y2", scales.y)
        .style("opacity", 1);

    if (displayLines) {
        // This is the function that creates the line based on the input. It is used in the next step
        const value_line = d3.line()
            .x(function (d) {
                return scales.x(d.date);
            })
            .y(function (d) {
                return scales.y(d.average);
            });

        // This creates and adds the data to the path svg element and creates the line graph
        g.append("path")
            .data([data])
            .attr("style", class_name_line)
            .attr("d", value_line);
    }

    // Creates the horizontal axis and adds the label.
    g.append("g")
        .attr("transform", "translate(0," + (graphHeight + 3) + ")")
        .call(d3.axisBottom(scales.x))
        .append("text")
        .attr("fill", "#000000")
        .attr("transform", "translate(" + ((graphWidth) / 2) + "," + 28 + ")")
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

    // Adds the dots
    g_dots.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("style", function (d) {
            if (d.average > whiskerData[1] || d.average < whiskerData[0]) {
                return outlierClass;
            }
            else {
                return class_name_dots;
            }
        })
        .attr("cx", function (d) {
            return scales.x(d.date)
        })
        .attr("cy", function (d) {
            return scales.y(d.average)
        })
        .attr("r", 2);

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

    // Adding sources in the top right if they exist
    if (sources.length > 0) {
        let sourceLabel = svg.append("text")
            .attr("x", width - margin.right)
            .attr("y", margin.top / 2)
            .style("text-anchor", "end")
            .text("Sources: ");

        let sourceLabelIndex = sourceLabel.selectAll(".graphs-sourceLabelIndex").data(sources, function (d) {
            return (d);
        });
        sourceLabelIndex.enter()
            .append("a")
            .attr("xlink:href", function (d) {
                return d;
            })
            .attr("target", "clowder")
            .attr("class", "graphs-sourceLabelIndex")
            .style("cursor", "pointer")
            .text(function (d, i) {
                if (d === "...") {
                    return d;
                } else {
                    return "[" + (i + 1) + "]";
                }
            })
            .append("title")
            .text("Original data source");
        sourceLabelIndex.exit().remove();
    }

    const rect = svg.append("rect");

    let focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    const yHoverClass = "y-hover-line";
    focus.append("line")
        .attr("class", yHoverClass)
        .attr("style", hoverClass)
        .attr("y1", 0)
        .attr("y2", graphHeight);

    focus.append("circle")
        .attr("r", 6)
        .style("fill", "#009E73");

    const overlay_text = focus.append("text")
        .attr("x", 10)
        .attr("dy", ".31em")
        .style("fill", "white");

    const overlay = svg.append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", overlayClass)
        .attr("style", "fill: none;")
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
        d3.select(this).attr("r", 6);
        focus.style("display", null);

        const x0 = scales.x.invert(d3.mouse(this)[0]);
        let i = bisectDate(data, x0, 1);
        let d;
        if (i >= data.length) {
            d = data[i - 1];
        } else {
            const d0 = data[i - 1];
            const d1 = data[i];
            d = x0.getTime() - d0.date.getTime() > d1.date.getTime() - x0.getTime() ? d1 : d0;
        }
        let translate_x = margin.left + scales.x(d.date);
        let translate_y = margin.top + scales.y(d.average);
        focus.attr("transform", "translate(" + translate_x + "," + translate_y + ")");

        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        let date_text = "Date: " + d.date.getFullYear();
        if (binType === 'month') {
            date_text = "Date: " + months[d.date.getMonth()] + " " + d.date.getFullYear();
        }
        if (binType === 'day') {
            date_text = "Date: " + d.date.toLocaleDateString();
        }

        overlay_text.selectAll("tspan").remove();
        overlay_text.append("tspan")
            .attr("x", 8)
            .attr("dx", "0.2em")
            .attr("dy", "0.6em")
            .text(date_text);
        overlay_text.append("tspan")
            .attr("x", 8)
            .attr("dx", "0.2em")
            .attr("dy", "1.2em")
            .text("Average: " + d.average.toFixed(2) + " " + removeItalicsFromParams(yAxisLabel));

        focus.select(".y-hover-line").attr("y2", graphHeight - scales.y(d.average));

        const bbox = overlay_text.node().getBBox();
        if (state.use_sensor_extent === true) {
            let midDateSensor = new Date((state.selectedStartDate.getTime() + state.selectedEndDate.getTime()) / 2);
            if (x0 >= midDateSensor) {
                translate_x -= (bbox.width + 20);
                translate_y += 4;
                overlay_text.attr("transform", "translate(" + -(bbox.width + 20) + "," + 4 + ")");
            } else {
                overlay_text.attr("transform", "translate(0,0)");
            }
        } else {
            let midDateParams = new Date((data[0].date.getTime() + data[data.length - 1].date.getTime()) / 2);
            if (x0 >= midDateParams) {
                translate_x -= (bbox.width + 20);
                translate_y += 4;
                overlay_text.attr("transform", "translate(" + -(bbox.width + 20) + "," + 4 + ")");
            } else {
                overlay_text.attr("transform", "translate(0,0)");
            }
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
        d3.select(this).attr("r", 2);
        focus.style("display", "none");
        rect.style("fill-opacity", 0);
    }

};

export default D3Line;
