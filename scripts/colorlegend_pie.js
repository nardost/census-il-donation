        function ColorLegend_pie(canvas) {
            let ColorLegendPie =
            {
                canvas: canvas,
                //data: data,
                //props: props,
                clear: function () {
                    d3.select(this.canvas).selectAll('svg').remove();
                },
                draw: function () {
this.clear();

// append the svg object to the div called 'my_dataviz'
let svg = d3.select(this.canvas);


svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "rgb(8, 64, 129)");
svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "rgb(207, 236, 202)");
svg.append("text").attr("x", 220).attr("y", 130).text("variable A").style("font-size", "15px").attr("alignment-baseline","middle");
svg.append("text").attr("x", 220).attr("y", 160).text("variable B").style("font-size", "15px").attr("alignment-baseline","middle");





                }
            }
            return ColorLegendPie;
        }
