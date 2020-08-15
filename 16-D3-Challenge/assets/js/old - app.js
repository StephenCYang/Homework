//Our data file
var inputFile = "assets/data/data.csv"

//dimensions for everything
var margin = {top: 10, right: 30, bottom: 110, left: 80},
    width = 1000 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
        "translate(" + margin.left + ", " + margin.top + ")")

d3.csv(inputFile).then(dataMap);

//map out the two fields we want for each state
function dataMap(state){
    state.map(function (d) {
        d.obesity = +d.obesity;
        d.poverty = +d.poverty;
        d.age = +d.age;
        d.income = +d.income;

    });


//add x axis
var x = d3.scaleLinear().
    domain([0, 0]).
    range([8, width]);

svg.append("g")
    .attr("class", "myXaxis")  
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .attr("opacity", "0")

//add y axis
var y = d3.scaleLinear()
    .domain([20, d3.max(state, d => d.obesity)])
    .range([height, 0]);

svg.append("g")
    .call(d3.axisLeft(y));

// add circles
svg.append("g")
    .selectAll("circle")
    .data(state)
    .enter()
    .append("circle")
        .attr("cx", function (d) { return x(d.poverty); } )
        .attr("cy", function (d) { return y(d.obesity); } )
        .attr("r", 12)
        .style("fill", "powderblue")
        
        

// new X axis for the animation
x.domain([8, d3.max(state, d => d.poverty)])
svg.select(".myXaxis")
  .transition()
  .duration(2000)
  .attr("opacity", "1")
  .call(d3.axisBottom(x));


svg.selectAll("circle")
    .data(state)
    .transition()
    .delay(function(d,i){return(i*3)})
    .duration(2000)
    .attr("cx", function (d) { return x(d.poverty); } )
    .attr("cy", function (d) { return y(d.obesity); } )
    
 

// Slap the state labels on the circles.
svg.selectAll()
    .data(state)
    .enter()
    .append("text")
    .attr("x", d => x(d.poverty))
    .attr("y", d => y(d.obesity))
    .style("font-size", "12px")
    .style("text-anchor", "middle")
    .style('fill', 'white')
    .text(d => (d.abbr));
}

// Create axes labels

// Y-Axis (Extra labels for the bonus, but I didn't get that working.)
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height/2)) 
    .style("text-anchor", "middle")
    .attr("dy", "3em")
    .style('stroke', 'lightgray')
    .text("Lacks Healthcare (%)");

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height/2)) 
    .style("text-anchor", "middle")
    .attr("dy", "2em")
    .style('stroke', 'lightgray')
    .text("Smokes (%)");

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height/2)) 
    .style("text-anchor", "middle")
    .attr("dy", "1em")
    .style('stroke', 'black')
    .text("Obese (%)");

// X-Axis
svg.append("text")
    .attr("y", height+50)
    .attr("x", (width/2)-30) 
    .attr("class", "axisText")
    .style("text-anchor", "middle")
    .attr("dy", "1em")
    .style('stroke', 'black')
    .text("In Poverty (%)");

svg.append("text")
    .attr("y", height+50)
    .attr("x", (width/2)-30) 
    .attr("class", "axisText")
    .style("text-anchor", "middle")
    .attr("dy", "2em")
    .style('stroke', 'lightgray')
    .text("Age (Median)");

svg.append("text")
    .attr("y", height+50)
    .attr("x", (width/2)-30) 
    .attr("class", "axisText")
    .style("text-anchor", "middle")
    .attr("dy", "3em")
    .style('stroke', 'lightgray')
    .text("Household Income (Median)");