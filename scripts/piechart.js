function PieChart(canvas, data,props) {
    let PieChart =
    {
        canvas: canvas,
        data: data,
        props: props,
        clear: function () {
            d3.select(this.canvas).selectAll('svg').remove();
        },
        draw: function () {
this.clear();
var width = this.props.width,
    height = this.props.height,
    margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
var radius = Math.min(width, height) / 2.5 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select(this.canvas)
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
//var data = {a: this.data[0][0], b: this.data[0]};
//console.log(data);

//console.log(data[1]);
// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(["rgb(8, 64, 129)", "rgb(227, 244, 221)"]);

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
//var data_ready = pie(d3.entries(data))

var data_ready = pie(d3.entries([data[0][0].value, data[1]]))

// Now I know that group A goes from 0 degrees to x degrees and so on.
var r =  [data[0][0].value, data[1]];
// shape helper to build arcs:
var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    //.attr("stroke", "black")
    //.style("stroke-width", "2px")
    .style("opacity", 0.7);

// Now add the annotation. Use the centroid method to get the best coordinates
svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return "" + d.data.value})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 17);

                }
            }
            return PieChart;
        }
