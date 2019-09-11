import React from 'react';
import '../css/custom.scss';
import * as d3 from 'd3';

class GraficoInai extends React.Component {

    render() { 

        function drawChart(data) {
            console.log(data);
            data.data.reverse();
            // Declaramos la scala x para el eje x
            const xScale = d3.scaleLinear().domain([1969, d3.max(data.data, d => d.year)])
                                            .range([25, 1000]);
            
            // Declaramos la scala y para el eje y
            const yScale = d3.scaleLinear()
                                .domain([d3.max(data.data, d => {
                return d.people / 1000000 
            }), 0])
                                .range([0, 150 - 20]);

            // Reiniciamos por si existe un lienzo previo vacío
            d3.select("body").selectAll("svg").remove();

            // Se crea el lienzo svg para trabajar. 
            // En este caso se seleccionó a body directamente.
            const svg = d3.select("#chart")
                            .append("svg")
                            .attr("width", 1100)
                            .attr("height", 300)
                            .attr('position', 'relative');
            
            let tooltip = d3.select('#chart')
                            .append('div')
                            .attr('class', 'tooltip')
                            .style('z-index', '10000')
                            .style('position', 'absolute')
                            .style('visibility', 'hidden')

            svg.selectAll("rect")
                .data(data.data.map(x=> x))
                .enter()
                .append("rect")
                .attr("x", (d, i) => {
                    return 25 + i * 19.7 // separación entre rectas
                })
                .attr("y", (d, i) => {
                    return 280- d.people / 1000000 // Esta linea es para invertir la tabla
                })
                .attr("width", 10)
                .attr("height", (d, i) => {
                    return d.people / 1000000
                } )
                .attr("fill", "navy")
                .attr("class", "bar")
                .on('mouseover', function(d){
                    tooltip.text(`La población fue de ${d.people} en el año ${d.year}`);
                    return tooltip.style('visibility', 'visible').style('background', "white")
                })
                .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-30)+"px").style("left",(d3.event.pageX+10)+"px");})
                .on("mouseout", function(){
                    return tooltip.style("visibility", "hidden");
                });
                
            const xAxis = d3.axisBottom(xScale);

            const yAxis = d3.axisLeft(yScale);

            svg.append("g")
                .attr("transform", "translate(0,"+ (300 - 20)+")")
                .call(xAxis);

            svg.append("g")
                .attr("transform", "translate("+ 25 +",150)")
                .call(yAxis);

        }

        
            drawChart(this.props)

        
        console.log(this.props)
        return ( 
            <div id="chart" />
         );
    }
}
 
export default GraficoInai;