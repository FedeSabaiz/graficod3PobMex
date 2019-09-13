import React from 'react';
import * as d3 from 'd3';

const GrafInaiResponsive = (props) => {

    
    function drawChart(data) {
        // console.log(data);
        // data.data.reverse();
        // Declaramos la scala x 
        const xScale = d3.scaleLinear().domain([1969, 1990])
                                        .range([25, 500]);
        
        // Declaramos la scala y 
        const yScale = d3.scaleLinear()
                            .domain([d3.max(data.data, d => {
                                return d.people / 1000000 
                            }), 0])
                            .range([0, 150 - 20]);

        // Reiniciamos por si existe un lienzo previo vacío
        // d3.select("body").selectAll("svg").remove();

        // Se crea el lienzo svg para trabajar. 
        // En este caso se seleccionó a body directamente.
        const svg = d3.select("#chart")
                        .append("svg")
                        .attr("width", 550)
                        .attr("height", 300)
                        .attr('position', 'relative');
        
        // Agregamos el tooltip deseado
        let tooltip = d3.select('#chart')
                        .append('div')
                        .attr('class', 'tooltip')
                        .style('z-index', '10000')
                        .style('position', 'absolute')
                        .style('visibility', 'hidden');

        // Agregamos título al gráfico
        svg.append("text")
            .attr("x", 300)
            .attr("y", 30 )
            .attr('text-anchor', "middle")
            .style('text-decoration', 'underline')
            .text("Población en México de los años 1969-1990");

        // Agregamos las rectas
        svg.selectAll("rect")
            .data(data.data.filter(x=> {
                if(x.year <= 1990) {                    
                    return x
                }
            }))
            .enter()
            .append("rect")
            .attr("x", (d, i) => {
                return 25 + i * 22.3 // separación entre rectas
            })
            .attr("y", (d, i) => {
                console.log(d);
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


        // Segundo chart para el resto del gráfico
        const xScale1 = d3.scaleLinear().domain([1991, 2018])
                                        .range([25, 500]);
        
        // Declaramos la scala y 
        const yScale1 = d3.scaleLinear()
                            .domain([d3.max(data.data, d => {
                                return d.people / 1000000 
                            }), 0])
                            .range([0, 150 - 20]);
        
        const svg1 = d3.select("#chart1")
                        .append("svg")
                        .attr("width", 550)
                        .attr("height", 300)
                        .attr('position', 'relative');
        
        // Agregamos el tooltip deseado
        let tooltip1 = d3.select('#chart1')
                        .append('div')
                        .attr('class', 'tooltip')
                        .style('z-index', '10000')
                        .style('position', 'absolute')
                        .style('visibility', 'hidden');

        // Agregamos título al gráfico
        svg1.append("text")
            .attr("x", 300)
            .attr("y", 30 )
            .attr('text-anchor', "middle")
            .style('text-decoration', 'underline')
            .text("Población en México de los años 1991-2018");

        // Agregamos las rectas
        svg1.selectAll("rect")
            .data(data.data.filter(x=> {
                if(x.year > 1990) {                    
                    return x
                }
            }))
            .enter()
            .append("rect")
            .attr("x", (d, i) => {
                return 25 + i * 17.2 // separación entre rectas
            })
            .attr("y", (d, i) => {
                console.log(d);
                return 280- d.people / 1000000 // Esta linea es para invertir la tabla
            })
            .attr("width", 10)
            .attr("height", (d, i) => {
                return d.people / 1000000
            } )
            .attr("fill", "navy")
            .attr("class", "bar")
            .on('mouseover', function(d){
                tooltip1.text(`La población fue de ${d.people} en el año ${d.year}`);
                return tooltip1.style('visibility', 'visible').style('background', "white")
            })
            .on("mousemove", function(){return tooltip1.style("top", (d3.event.pageY-30)+"px").style("left",(d3.event.pageX+10)+"px");})
            .on("mouseout", function(){
                return tooltip1.style("visibility", "hidden");
            });
            
        const xAxis1 = d3.axisBottom(xScale1);

        const yAxis1 = d3.axisLeft(yScale1);

        svg1.append("g")
            .attr("transform", "translate(0,"+ (300 - 20)+")")
            .call(xAxis1);

        svg1.append("g")
            .attr("transform", "translate("+ 25 +",150)")
            .call(yAxis1);

    }

    drawChart(props)
        
    return ( 
        <div>
            <div id="chart"></div>
            <div id="chart1"></div>
        </div>
     );
}
 
export default GrafInaiResponsive;
