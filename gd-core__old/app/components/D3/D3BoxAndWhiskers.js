const D3BoxAndWhisker = {};
const d3 = require('d3');

const margin = {top: 30, right: 20, bottom: 60, left: 10};

D3BoxAndWhisker.create = function (el, props, state) {
    let svg = d3.select(el).append('svg')
        .attr('class', 'd3')
        .attr('class', state.boxClass)
        .attr('width', props.width)
        .attr('height', props.height);

    this.update(el, state);
};

D3BoxAndWhisker.update = function (el, state) {
    this._drawPoints(el, state);
};

D3BoxAndWhisker.destroy = () => {
};

// Source: https://bl.ocks.org/mbostock/4061502
D3BoxAndWhisker._drawPoints = function (el, state) {

    let {
        data, height, lineClass, rectClass, circleClass, centerClass, outlierClass,
        medianClass, boxClass, startAtZero
    } = state;

    height = height - margin.top - margin.bottom + 1;

    // Method A
    data = data.sort(d3.ascending);
    let svg = d3.select(el).selectAll('svg');
    svg.selectAll("*").remove();
    let g = svg.append("g").attr("transform", "translate(50,36)");
    let n = data.length;
    const min = startAtZero ? 0 : data[0];
    const max = data[n - 1];
    const whiskers = iqr(1.5);
    let domain = null;
    let tickFormat = null;
    let boxWidth = 50;
    // Compute quartiles. Must return exactly 3 elements.
    const quartileData = data.quartiles = boxQuartiles(data);

    // Compute whiskers. Must return exactly 2 elements, or null.
    const whiskerIndices = whiskers && whiskers.call(this, data);

    const whiskerData = whiskerIndices && whiskerIndices.map(function (i) {
        return data[i]
    });

    // Compute outliers. If no whiskers are specified, all data are "outliers".
    // We compute the outliers as indices
    const outlierIndices = whiskerIndices ? d3.range(0, whiskerIndices[0]).concat(d3.range(whiskerIndices[1] + 1, n))
        : d3.range(n);

    const xScale = d3.scaleLinear()
        .domain(domain && domain.call(this, data) || [min, max])
        .range([height, 0]);

    // stash the new scale
    this.__chart__ = xScale;

    // Update center line: the vertical line spanning the whiskers.
    const center = g.selectAll("line.center")
        .data(whiskerData ? [whiskerData] : []);

    const centerClasses = lineClass + " center " + centerClass;
    center.enter().insert("line", "rect")
        .attr("class", centerClasses)
        .style("opacity", 1)
        .attr("x1", boxWidth / 2)
        .attr("y1", function (d) {
            return xScale(d[0]);
        })
        .attr("x2", boxWidth / 2)
        .attr("y2", function (d) {
            return xScale(d[1]);
        });

    // Interquartile box
    const box = g.selectAll("rect.box")
        .data([quartileData]);

    let boxClasses = "box " + boxClass + " " + rectClass;
    box.enter().append("rect")
        .attr("class", boxClasses)
        .attr("x", 0) // Adjust
        .attr("y", function (d) {
            return xScale(d[2]);
        })
        .attr("width", boxWidth)
        .attr("height", function (d) {
            return xScale(d[0]) - xScale(d[2]);
        });

    // Draw Median Line
    const medianLine = g.selectAll("line.median")
        .data([quartileData[1]]);

    const medianClasses = "median " + medianClass + " " + lineClass;
    medianLine.enter().append("line")
        .attr("class", medianClasses)
        .attr("x1", 0)
        .attr("y1", xScale)
        .attr("x2", boxWidth)
        .attr("y2", xScale);

    // Add Whiskers
    const whisker = g.selectAll("line.whisker")
        .data(whiskerData || []);

    const whiskerClasses = "whisker " + lineClass + " " + circleClass;
    whisker.enter().insert("line", "circle , text")
        .attr("class", whiskerClasses)
        .attr("x1", 0)
        .attr("y1", xScale)
        .attr("x2", boxWidth)
        .attr("y2", xScale)
        .style("opacity", 1);

    // Add outliers
    const outlier = g.selectAll("circle.outlier")
        .data(outlierIndices, Number);

    const outlierClasses = "circle " + outlierClass;
    outlier.enter().insert("circle", "text")
        .attr("class", outlierClasses)
        .attr("r", 2)
        .attr("cx", boxWidth / 2)
        .attr("cy", function (i) {
            return xScale(data[i]);
        })
        .style("opacity", 1);

    // Compute the tick format.
    const format = tickFormat || xScale.tickFormat(8);

    // Update box ticks.
    let boxTick = g.selectAll("text.box")
        .data(quartileData);

    boxTick.enter().append("text")
        .attr("class", boxClass)
        .attr("dy", ".3em")
        .attr("dx", function (d, i) {
            return i & 1 ? 6 : -6
        })
        .attr("x", function (d, i) {
            return i & 1 ? boxWidth : 0
        })
        .attr("y", xScale)
        .attr("text-anchor", function (d, i) {
            return i & 1 ? "start" : "end";
        })
        .text(format);

    // Add Whisker ticks. These are handled separately from the box
    // ticks because they may or may not exist

    const whiskerTick = g.selectAll("text.whisker")
        .data(whiskerData || []);

    whiskerTick.enter().append("text")
        .attr("class", "whisker")
        .attr("dy", ".3em")
        .attr("dx", 6)
        .attr("x", boxWidth)
        .attr("y", xScale)
        .text(format)
        .style("opacity", 1);

};

export default D3BoxAndWhisker;

export function boxQuartiles(d) {
    return [
        d3.quantile(d, .25),
        d3.quantile(d, .5),
        d3.quantile(d, .75)
    ];
}

export function iqr(k) {
    return function (d, i) {
        const q1 = d.quartiles[0],
            q3 = d.quartiles[2],
            iqr = (q3 - q1) * k;
        i = -1;
        let j = d.length;
        while (d[++i] < q1 - iqr) ;
        while (d[--j] > q3 + iqr) ;
        return [i, j];
    };
}
