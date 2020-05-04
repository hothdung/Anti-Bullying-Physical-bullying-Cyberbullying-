import React, { Component } from 'react';
import * as d3 from 'd3';
import { ThemeProvider } from '@material-ui/core';


class WarningFrequency extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.warningVal,
            yAxisAttribute: "warningMax",
            xAxisAttribute: "date",
            width: window.innerWidth - 250,
            height: 250,
            methods: []
        }
        this.chartRef = React.createRef();
        this.drawLineChart = this.drawLineChart.bind(this);
    }
    drawLineChart() {
        var keys = [
            "Interventions",
            "Consultations"
        ]

        var colors = d3.scaleOrdinal(["#4CE3CE", "#16AFE8"])
        const yAccessor = d => d.warningMax
        const dateParser = d3.timeParse("%Y-%m-%d")
        const xAccessor = d => dateParser(d.date)

        let dimensions = {
            margin: {
                top: 15,
                right: 15,
                bottom: 40,
                left: 60,
            }
        }

        dimensions.boundedWidth = this.state.width - dimensions.margin.left - dimensions.margin.right

        dimensions.boundedHeight = this.state.height - dimensions.margin.top - dimensions.margin.bottom

        const wrapper = d3.select(this.refs.canvas)
            .append("svg")
            .attr("width", this.state.width)
            .attr("height", this.state.height)

        const bounds = wrapper.append("g")
            .style("transform", `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`)

        const yScale = d3.scaleLinear()
            .domain(d3.extent(this.state.data, yAccessor))
            .range([dimensions.boundedHeight, 0])

        const xScale = d3.scaleTime()
            .domain(d3.extent(this.state.data, xAccessor))
            .range([0, dimensions.boundedWidth])

        const lineGenerator = d3.line()
            .x(d => xScale(xAccessor(d)))
            .y(d => yScale(yAccessor(d)))

        const path = bounds.append("path")
            .attr("d", lineGenerator(this.state.data))
            .attr("fill", "none")
            .attr("stroke", "#6c5ce7")
            .attr("stroke-width", 2)

        // create transition option
        const transitionOption = d3.transition()
            .transition()
            .ease(d3.easeSin)
            .duration(8000);

        // getting total length of svg path
        const pathLength = path.node().getTotalLength();

        path.attr("stroke-dashoffset", pathLength)
            .attr("stroke-dasharray", pathLength);

        path.attr("stroke-dashoffset", pathLength)
            .attr("stroke-dasharray", pathLength)
            .transition(transitionOption)
            .attr("stroke-dashoffset", 0);

        const yAxisGenerator = d3.axisLeft()
            .scale(yScale)

        bounds.append("g")
            .call(yAxisGenerator)

        const xAxisGenerator = d3.axisBottom()
            .scale(xScale)

        bounds.append("g")
            .attr("transform", "translate(0, " + yScale(22) + ")")
            .append("line")
            .attr("x2", dimensions.boundedWidth)
            .style("stroke", "#000058")
            .style("stroke-dasharray", ("3, 3"))
            .style("stroke-width", "2px")

        bounds.append("g")
            .call(xAxisGenerator)
            .style("transform", `translateY(${dimensions.boundedHeight}px)`)

        bounds.append("g")
            .append("text")
            .attr("x", dimensions.margin.left + 20)
            .attr("y", 0 - (dimensions.margin.top - 20))
            .style("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-weight", "bold")
            .text("Warning frequency")


        var legend = bounds.append("g")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys)
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 20 + ")";
            });

        legend.append("rect")
            .attr("x", dimensions.boundedWidth - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", colors)

        legend.append("text")
            .attr("x", dimensions.boundedWidth - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .style("font-weight", "bold")
            .text(function (d) { return d; })

        // var date = "Tue Apr 09 2019";
        // var newDate = this.createDate(date);

        // console.log("this is the date " + newDate);

        let self = this;
        let tempData = this.state.data;
        fetch('http://147.46.215.219:8080/posts', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Server bad response!");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ methods: data });
            // create JS object
            var methodObj = {};
            var warningFreq = [];
            var i = 0, j = 0;
            var length = Object.keys(tempData).length;
            for (i = 0; i < data.length; i++) {
                var datum = data[i].date;
                var d = new Date(datum);
                datum = [
                    d.getFullYear(),
                    ('0' + (d.getMonth() + 1)).slice(-2),
                    ('0' + d.getDate()).slice(-2)
                ].join('-');

                for (j = 0; j < length; j++) {
                    if (datum === tempData[j].date) {
                        methodObj["date"] = tempData[j].date;
                        methodObj["warningFrequency"] = tempData[j].warningMax;
                        methodObj["interType"] = data[i].interventionType;
                    }
                }
            }
            console.log("This is methodsObj" + methodObj.date);
            bounds.append("g")
                .selectAll("circle")
                .data(methodObj)
                .enter().append("circle")
                .attr("class", "circle-data")
                .attr("r", 5)
                .attr("cx", function (d) {
                    return xScale(d.date);
                })
                .attr("cy", function (d) { return yScale(d.warningFrequency); })
                .attr('fill', 'red');
        }).catch(error => {
            console.log(error);
        })

    }


    componentDidMount() {
        this.drawLineChart();
    }

    render() {
        console.log("here is the array " + this.state.methods);
        return <div className="warningG" ref="canvas"></div>
    }
}

export default WarningFrequency;