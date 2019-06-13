function BarChart(canvas, data, props, statistic) {
    let barChart = {
        canvas: canvas,
        data: data,
        props: props,
        statistic: statistic,
        clear: function() {
            d3.select(this.canvas).selectAll('svg').remove();
        },
        draw: function() {
            this.clear();
            let margin = { top: 20, right: 20, bottom: 100, left: 100 },
                width = this.props.width - margin.left - margin.right,
                height = this.props.height - margin.top - margin.bottom;
            let x = d3.scaleBand().range([0, width]).padding(0.1);
            let y = d3.scaleLinear().range([height, 0]);
            let svg = d3.select(this.canvas).append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .append('g')
                        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            //x.domain(data.map(function (d) { return prettifyLabel('B02001', d.category); }));
            x.domain(data.map(function (d) { return prettifyLabel(statistic, d.category); }));
            //x.domain(data.map(function (d) { return d.category }));
            y.domain([0, d3.max(data, function (d) { return d.value; })]);
            const color = this.props.color;
            console.log(data)
            console.log('data')
            svg.selectAll('.bar')
                .data(data)
                .enter().append('rect')
                .attr('class', 'bar')
                .attr('fill', d => color(d.value % 30))
                //.attr('x', function (d) { return x(prettifyLabel('B02001', d.category)); })
                .attr('x', function (d) { return x(prettifyLabel(statistic, d.category)); })
                .attr('width', x.bandwidth())
                .attr('y', function (d) { console.log(d.value); return y(d.value); })
                .attr('height', function (d) { return height - y(d.value); });

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(10))
            d3.selectAll('.tick text').style("text-anchor", "end").attr("dx", "-.8em").attr("dy", ".5em").style('text-shadow', '1px 1px #ffffff')
            if(!this.props.tiltedXLabel) d3.selectAll(".tick text").call(wrap, x.bandwidth())
            if(this.props.tiltedXLabel) d3.selectAll(".tick text").attr("transform", "rotate(-30)");
            svg.append('g')
                .call(d3.axisLeft(y));

            function wrap(text, width) {
                text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
                    while (word = words.pop()) {
                        line.push(word);
                        tspan.text(line.join(" "));
                        if (tspan.node().getComputedTextLength() > width) {
                            line.pop();
                            tspan.text(line.join(" "));
                            line = [word];
                            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                        }
                    }
                })
            }
        }
    }
    return barChart;
}
