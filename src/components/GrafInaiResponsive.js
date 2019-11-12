import React from 'react';
import * as d3 from 'd3';

const GrafInaiResponsive = (props) => {
    
    
    function drawChart(data) {
        // console.log(data);
        data.data.reverse();
  
        // Para dar formato a las cantidades de personas
        var formatComma = d3.format(",");

        // Declaramos la scala x 
        const xScale = d3.scaleLinear().domain(['1969', '1990'])
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
        // En este caso se seleccionó un div con id chart.
        const svg = d3.select("#chart")
                        .append("svg")
                        // Para ser responsive
                        .attr('viewBox', `0 0 550 200`)
                        // .attr("width", 550)
                        // .attr("height", 300)
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
            .attr("x", 270)
            .attr("y", 30 )
            .attr('text-anchor', "middle")
            .attr('fill', "#b1de00")
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
                return 25 + i * 23.4 // separación entre rectas
            })
            .attr("y", (d, i) => {
                // console.log(d);
                return 180- d.people / 1000000 // Esta linea es para invertir la tabla
            })
            .attr("width", 10)
            .transition()
            .delay(function(d, i) { return i * 50; })
            .on("start", function repeat() {
                d3.active(this)
                    .attr("height", (d, i) => {
                        return d.people / 1000000
                    })
                  .transition()
                    .on("start", repeat);
            });
            
            
            
            // Añadimos el efecto de mouse para las barras
            svg.selectAll("rect")
                .attr("fill", "#133954")
                .attr("class", "bar")
                .on('mouseover', function(d){
                    tooltip.text(`La población fue de ${formatComma(d.people)} en el año ${d.year}`);
                    return tooltip.style('visibility', 'visible').style('background', "#468902")
                })
                .on("mousemove", function(d){
                    return d.year < 1980 ? tooltip.style("top", (d3.event.pageY-30)+"px").style("left",(d3.event.pageX+10)+"px") : tooltip.style("top", (d3.event.pageY-30)+"px").style("left",(d3.event.pageX-128)+"px");
                })
                .on("mouseout", function(){
                    return tooltip.style("visibility", "hidden");
                });
            
            
        const xAxis = d3.axisBottom(xScale)
                        .tickFormat(d3.format('d'));// Para formatear la fecha. Antes (1,990)

        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("transform", "translate(0,"+ (200 - 20)+")")
            .call(xAxis);

        svg.append("g")
            .attr("transform", "translate("+ 25 +",50)")
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
                        .attr('viewBox', `0 0 550 200`)
                        // .attr("width", 550)
                        // .attr("height", 300)
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
            .attr("x", 270)
            .attr("y", 30 )
            .attr('text-anchor', "middle")
            .style('text-decoration', 'underline')
            .attr('fill', "#b1de00")
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
                return 25 + i * 17.26 // separación entre rectas
            })
            .attr("y", (d, i) => {
                // console.log(d);
                return 180- d.people / 1000000 // Esta linea es para invertir la tabla
            })
            .attr("width", 10)
            .transition()
            .delay(function(d, i) { return i * 50; })
            .on("start", function repeat() {
                d3.active(this)
                    .attr("height", (d, i) => {
                        return d.people / 1000000
                    })
                  .transition()
                    .on("start", repeat);
            });
         
        // Añadimos el efecto de mouse para las barras
        svg1.selectAll('rect')
            .attr("fill", "#133954")
            .attr("class", "bar")
            .on('mouseover', function(d){
                d3.format(",")
                tooltip1.text(`La población fue de ${formatComma(d.people)} en el año ${d.year}`);
                return tooltip1.style('visibility', 'visible').style('background', "white")
            })
            .on("mousemove", function(d){
                if(d.year < 2005) {
                    return tooltip1.style("top", (d3.event.pageY-30)+"px").style("left",(d3.event.pageX+10)+"px");

                }
                if(d.year > 2005) {
                    tooltip1.style("top", (d3.event.pageY-30)+"px").style("left",(d3.event.pageX-128)+"px")
                }
            })
            .on("mouseout", function(){
                return tooltip1.style("visibility", "hidden");
            })
                
                
            
        const xAxis1 = d3.axisBottom(xScale1)
                        .tickFormat(d3.format('d'));// Para formatear la fecha. Antes (1,990)

        const yAxis1 = d3.axisLeft(yScale1);

        svg1.append("g")
            .attr("transform", "translate(0,"+ (200 - 20)+")")
            .call(xAxis1);

        svg1.append("g")
            .attr("transform", "translate("+ 25 +",50)")
            .call(yAxis1);

    }

    drawChart(props)
        
    return ( 

        <div>


            <div className="graficos">
                <div className="articulo">
                    <h2>Artículo</h2>
                    <h4>Título</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quas. Cupiditate similique officiis iusto eos, ipsa reiciendis earum esse voluptate minus, repudiandae aliquid, at itaque neque. Esse accusamus placeat adipisci.</p>
                </div>

                <div className="articulo">
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis sed nisi aliquam perferendis officiis, commodi vero. Officia nulla quisquam nemo aperiam, ex eius ea consequuntur voluptatem inventore sit magnam tempora.
                    </p>
                </div>

                <div className="graf" >
                    <div id="chart"></div>

                </div>

                <div className="articulo">
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis sed nisi aliquam perferendis officiis, commodi vero. Officia nulla quisquam nemo aperiam, ex eius ea consequuntur voluptatem inventore sit magnam tempora.
                    </p>
                </div>

                <div className="graf">
                    <div id="chart1"></div>

                </div>

                <div className="articulo">
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis sed nisi aliquam perferendis officiis, commodi vero. Officia nulla quisquam nemo aperiam, ex eius ea consequuntur voluptatem inventore sit magnam tempora.
                    </p>
                </div>

                <div className="articulo">
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis sed nisi aliquam perferendis officiis, commodi vero. Officia nulla quisquam nemo aperiam, ex eius ea consequuntur voluptatem inventore sit magnam tempora.
                    </p>
                </div>
            </div>




        </div>
     );
}
 
export default GrafInaiResponsive;
