import {removeItalicsFromParams} from "../../utils/configUtils";

const D3StackedBar = {};

const d3 = require("d3");

const margin =  {top: 30, right: 200, bottom: 50, left: 70};

D3StackedBar.create = function(el, props, state) {
    if (props.width <= 0 || props.height <= 0) {
        return;
    }
    let svg = d3.select(el).append("svg")
        .attr("class", "d3")
        .attr("width", props.width)
        .attr("height", props.height);

    this.update(el, state);
};

D3StackedBar.update = function(el, state, configuration, chart) {
    this._drawBars(el, state);
};

D3StackedBar.destroy = () => {

};

D3StackedBar._scales = function(el, data, state) {
    if(!data) {
        return null;
    }
    if (el.offsetWidth <= 0) {
        return;
    }
    if (el.offsetHeight <= 0) {
        return;
    }
    const width = el.offsetWidth - margin.left - margin.right;
    const height = el.offsetHeight - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width])
        .padding(0.1)
        .align(0.1);


    const y = d3.scaleLinear().rangeRound([height, 0]);

    const z = d3.scaleOrdinal().range(state.scaleColors).domain(state.scaleNames);

    return {x: x, y: y, z: z};
};

D3StackedBar._drawBars = function(el, state) {
    const {width, height, scaleNames, tooltipClass, season} = state;
    if (state.width <= 0) {
        return;
    }
    if (state.height <= 0) {
        return;
    }
    let {data, title, yAxisLabel} = state;
    const svg = d3.select(el).selectAll("svg");
    const graphWidth = width - margin.right - margin.left;
    const graphHeight = height - margin.top - margin.bottom;
    svg.selectAll("d3-stacked-bar-charts").remove();
    svg.selectAll("text").remove();
    svg.selectAll("g").remove();
    svg.selectAll("div").remove();

    let g = svg.selectAll(".d3-stacked-bar-charts");

    let stack = d3.stack();
    g = svg.append("g")
        .attr("class", "d3-stacked-bar-charts")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const scales = this._scales(el, data, state);
    if (scales === undefined) {
        return;
    }
    function sortByDateAscending(a, b) {
        return a.date - b.date;
    }
    data = data.sort(sortByDateAscending);
    data.forEach(function(d) {
        d.total = 0;
        for (let key in d.data) {
            if(d.data.hasOwnProperty(key)) {
                d.total += d.data[key];
                d[key] = d.data[key];
            }
        }
        d.year = d.date.getFullYear();
    });

    scales.x.domain(data.map(function(d) {return d.year;}));
    scales.y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();

    const stacked_bars = g.selectAll(".d3-stacked-bar-charts")
        .data(stack.keys(scaleNames)(data))
        .enter().append("g")
        .attr("class", "d3-stacked-bar-charts")
        .attr("fill", function(d) {return scales.z(d.key); })
        .selectAll("rect")
        .data(function(d) {return d;})
        .enter().append("rect")
        .attr("x", function(d) { return scales.x(d.data.year); })
        .attr("y", function(d) {return scales.y(d[1]); })
        .attr("height", function(d) { return  scales.y(d[0]) - scales.y(d[1])})
        .attr("width", scales.x.bandwidth());

    // Create the horizontal axis and add the label.
    g.append("g")
        .attr("transform", "translate(0," + (graphHeight + 3) + ")")
        .call(d3.axisBottom(scales.x))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "translate("+ ((graphWidth)/2) + "," +
            28 + ")")
        .attr("text-anchor", "end");

    // Creates the vertical axis and adds the label
    g.append("g")
        .call(d3.axisLeft(scales.y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-6em")
        .attr("dx", "-15em")
        .attr("text-anchor", "end")
        .text(removeItalicsFromParams(yAxisLabel));

    // Adding Legend
    const legend = svg.selectAll(".legend")
        .data(scaleNames.slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(25, "  + (10 + i * 20) + ")";
        });

    legend.append("rect")
        .attr("x", width - 230)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", scales.z);

    legend.append("text")
        .attr("x", width - 217)
        .attr("y", 6)
        .attr("dy", ".35em")
        .text(function (d) { return d; });

    title = removeItalicsFromParams(title);
    let parsed_title = title;
    if (title.length > 35) {
        parsed_title = title.substring(0, 35) + "..."
    }
    svg.append("text")
        .attr("x", margin.left)
        .attr("y", margin.top/2)
        .attr("text-anchor", "left")
        .style("font-size", "16px")
        .style("text-decoration", "bold")
        .text(parsed_title)
        .append("svg:title").text(title);


    stacked_bars
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
        })
        .on("mouseover", function(d) {
            const xPosition = d3.event.pageX;
            const yPosition = d3.event.pageY;
            const selected_year = d.data.year;
            const parsed_season = season.charAt(0).toUpperCase() + season.slice(1);
            let text = "<b> Date</b>: " + parsed_season + " " + selected_year + "<br/>";
            for (let key in d.data.data) {
                if(d.data.hasOwnProperty(key)) {
                    text += "<b>" + key + "</b>: " + d.data.data[key].toFixed(2) + " (" +
                        removeItalicsFromParams(yAxisLabel) + ") Avg. <br/>";
                }
            }
            tooltip.html(text)
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .style("opacity", 0.9);

        });

    const tooltip = d3.select(el).append("div")
        .attr("class", tooltipClass)
        .style("opacity", 0);

};

export default D3StackedBar;