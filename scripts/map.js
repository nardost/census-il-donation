export function Map(canvas, data, properties) {
    let map = {
        canvas: canvas,
        data: data,
        properties: properties,
        dispatch: d3.dispatch('selected'),
        clear: function() {
            const svg = d3.select(canvas);
            svg.selectAll('*').transition().remove();
        },
        draw: function() {
            const { width, height, color, statistic } = this.properties;
            let centered;
            const svg = d3.select(canvas).append('svg')
                            .attr('width', width)
                            .attr('height', height);
            const div = d3.select("#div-t-l")
                            .style('position', 'relative')
                            .style('fill', 'gray')
                            .style('z-index', 1000)
                            .style("height", "100px")   
                            .style('width', width)   
                            .style("opacity", 0);
            const pathGenerator = d3.geoPath();
            const g = svg.append('g');
            const tracts = data.features;
            let zoom = d3.zoom().scaleExtent([1, 10]).on("zoom", zoomed);
            g.attr('class', 'tracts')
                .selectAll('path').data(tracts).enter()
                    .append('path')
                    .attr('d', pathGenerator)
                    .attr('fill', d => color(coroplethParam(d)))
                    .on('mouseover', doMouseover)
                    .on('mouseout', doMouseout)
                    .on('click', d => traktClicked(this, d))
                    .call(zoom);

            function coroplethParam(d) {
                if(statistic == "B02001") {
                    return (+d.properties.density)
                }
                if(statistic == "B1601") {
                    return (+d.properties.data.bachelors_degree_or_higher / +d.properties.data.B1601_estimated_total) * 100
                }
                if(statistic == "S1602") return (+d.properties.data.limited_english_speaking / d.properties.data.total_households) * 100
                if(statistic == "S2201") return (+d.properties.data.receiving_foodstamp / +d.properties.data.total_households) * 100
                if(statistic == "S2301") return (+d.properties.data.unemployment_rate)
            }

            function zoomed() {
                g.selectAll('path')
                .style("stroke-width", 1.5 / d3.event.transform.k + "px")
                .attr("transform", d3.event.transform);
            }
            function stopped() {
                if (d3.event.defaultPrevented) d3.event.stopPropagation();
            }
            function doMouseover(d, i) {
                d3.select(this).classed('selected', true);

                div.transition()    
                    .duration(200)    
                    .style("opacity", .9);  

                div.html(
                        "<strong>" + description(statistic) + "</strong><br/>" +
                        county(d.id.slice(2, 5)) + " - Tract " + d.id + "<br/>" +
                        "<strong>POPULATION: " + d.properties.data.total_population + "</strong><br/>")
                //div.style("left", (0) + "px").style("top", (0) + "px");
            }
            function doMouseout(d, i) {
                d3.select(this).classed('selected', false);
                div.transition().style('opacity', .9);
            }
            function traktClicked(object, d) {
                let bounds = pathGenerator.bounds(d),
                    dx = bounds[1][0] - bounds[0][0],
                    dy = bounds[1][1] - bounds[0][1],
                    x = (bounds[0][0] + bounds[1][0]) / 2,
                    y = (bounds[0][1] + bounds[1][1]) / 2,
                    scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
                    translate = [width / 2 - scale * x, height / 2 - scale * y];
                
                svg.transition()
                    .duration(750)
                    .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) );

                object.dispatch.call('selected', this, d);
            }
            function zoomOnClick(d) {
                let x, y, k;

                if (d && centered !== d) {
                    let centroid = pathGenerator.centroid(d);
                    x = centroid[0];
                    y = centroid[1];
                    k = 20;
                    centered = d;
                } else {
                    x = width / 2;
                    y = height / 2;
                    k = 1;
                    centered = null;
                }

                g.selectAll('path')
                    .classed('active', centered && (d => d === centered));

                g.transition()
                    .duration(800)
                    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ') scale(' + k + ') translate(' + -x + ',' + -y + ')')
                    .style('stroke-width', 1.5 / k);
            }
        }
    }
    return map;
}