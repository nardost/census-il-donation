function DrawLegend(canvas, props, title) {
    let legend = {
        canvas: canvas,
        props: props,
        title: title,
        clear: function() {
            d3.select(this.canvas).selectAll('svg').remove();
        },
        draw: function() {
            this.clear();
            let margin = { top: 20, right: 20, bottom: 80, left: 10 },
                width = this.props.width - margin.left - margin.right,
                height = this.props.height - margin.top - margin.bottom;
            let svg = d3.select(this.canvas).append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .append('g')
                        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                        .style("font-size","10.5px");
            const color = this.props.color;
        
            svg.selectAll(".legend");
            svg.append("g")
                .attr("class", "legendLinear");
                
            var legendLinear = d3.legendColor()
            .shapeWidth(30)
            .cells(10)
            .orient('horizontal')
            .scale(color)
            .title(title)
            .titleWidth(width);
              
            svg.select(".legendLinear")
            .call(legendLinear);
            
        }
    }
    return legend;
}









