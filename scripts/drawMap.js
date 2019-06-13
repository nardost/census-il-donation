var MapVis = function(){
    var newTM = {
            drawMap: function(svg, data, map){
                var g = svg.append("g")
                var feature = g.selectAll(".myCircles")
                .data(data)
                .enter()
                .append("circle")
                  .attr("cx", function(d){ return map.latLngToLayerPoint([d.lat, d.lon]).x })
                  .attr("cy", function(d){ return map.latLngToLayerPoint([d.lat, d.lon]).y })
                  .attr("r", 3)
                  .attr("pointer-events","visible")
                  .style("fill", function(d) {if(d.Total < 1000){
                      return "IndianRed";
                  } else if(d.Total < 2000){
                      return "steelblue";
                  } else if (d.Total < 3000){
                      return "OliveDrab";
                  } else {
                      return "indigo"
                  }
                })
                  .attr("stroke", function(d) {if(d.Total < 1000){
                    return "IndianRed";
                } else if(d.Total < 2000){
                    return "steelblue";
                } else if(d.Total < 3000){
                    return "OliveDrab";
                } else {
                  return "indigo"
                }
              })
                  .attr("stroke-width", 1)
                  .attr("fill-opacity", .6)
                  .append("title")
                  .text(function(d) { return d.zipcode; });
                // Function that update circle position if something change
                function update() {
                  d3.selectAll("circle")
                    .attr("cx", function(d){ return map.latLngToLayerPoint([d.lat, d.lon]).x })
                    .attr("cy", function(d){ return map.latLngToLayerPoint([d.lat, d.lon]).y })
                }

                map.on("moveend", update);

                
                },
                dispatch: d3.dispatch("selected")
    };
    return newTM;
}

