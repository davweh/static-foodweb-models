



// function  wskstuff(p,num){
//     var truenum=0;
//     var falsenum=0;
//     for(var i=0;i<num;i++) {
//         if (Math.random()<=p) {
//             truenum++;
//         }
//         else {
//             falsenum++;
//         }
//     }
//     total=truenum+falsenum;
//     console.log(truenum/total + "<br />");
//     console.log(falsenum/total + "<br />");

// };

var width1 =600;
var height1 = 600;





var graphLayout1 = d3.forceSimulation(graph.nodes)
    .force("charge", d3.forceManyBody().strength(-3000))
    .force("center", d3.forceCenter(width1 / 2, height1 / 2))
    .force("x", d3.forceX(width1 / 2).strength(1))
    .force("y", d3.forceY(height1 / 2).strength(1))
    .force("link", d3.forceLink(graph.links).id(function(d) {return d.id; }).distance(50).strength(1))
    .on("tick", ticked1);

var adjlist1 = [];

graph.links.forEach(function(d) {
    adjlist1[d.source.index + "-" + d.target.index] = true;
    adjlist1[d.target.index + "-" + d.source.index] = true;
});

function neigh1(a, b) {
    return a == b || adjlist1[a + "-" + b];
}


var svg1 = d3.select("#viz").attr("width", width1).attr("height", height1);
var container1 = svg1.append("g");

svg1.call(
    d3.zoom()
        .scaleExtent([.1, 4])
        .on("zoom", function() { container1.attr("transform", d3.event.transform); })
);
container1.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "-0 -5 10 10")
            .attr("refX", 20)
            .attr("refY", 0)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");  

var link1 = container1.append("g").attr("class", "link")
    .selectAll(".link")
    .data(graph.links)
    .enter().append("path")
    .attr("stroke", function(d){
        return "#ddd";
    })
    .attr('marker-end','url(#arrow)');//function(d) {
      //  return d.source == d.target ? 'url(#arrow)' : 'url(#arrow)'
    //   });
   // .attr("marker-end","url(#arrow)");
   // .attr("stroke-width", "1px");


var node1 = container1.append("g").attr("class", "nodes")
    .selectAll("g")
    .data(graph.nodes)
    .enter()
    .append("circle")
    .attr("r", 8)
    .attr("fill", function(d){
        if (d.id=="n1"){ return "#ff0000";} 
        else{ return "#009900";}});



node1.call(
    d3.drag()
        .on("start", dragstarted1)
        .on("drag", dragged1)
        .on("end", dragended1)
);

 
//node.on("mouseover", focus).on("mouseout", unfocus);


function ticked1() {

    node1.call(updateNode1);
    link1.call(updateLink1);



}

function fixna1(x) {
    if (isFinite(x)) return x;
    return 0;
}

function focus1(d) {
    var index = d3.select(d3.event.target).datum().index;
    node1.style("opacity", function(o) {
        return neigh1(index, o.index) ? 1 : 0.1;
    });

    link1.style("opacity", function(o) {
        return o.source.index == index || o.target.index == index ? 1 : 0.1;
    });

}

function unfocus1() {
 
   node1.style("opacity", 1);
   link1.style("opacity", 1);
}

function updateLink1(link) {
//     link.attr("x1", function(d) { return fixna1(d.source.x); })
//         .attr("y1", function(d) { return fixna1(d.source.y); })
//         .attr("x2", function(d) { return fixna1(d.target.x); })
//         .attr("y2", function(d) { return fixna1(d.target.y); });
link.attr("d", positionLink);
 }

function positionLink(d) {
    var offset = 1;

    var midpoint_x = (d.source.x + d.target.x) / 2;
    var midpoint_y = (d.source.y + d.target.y) / 2;

    var dx = (d.target.x - d.source.x);
    var dy = (d.target.y - d.source.y);

    var normalise = Math.sqrt((dx * dx) + (dy * dy));

    var offSetX = midpoint_x + offset*(dy/normalise);
    var offSetY = midpoint_y - offset*(dx/normalise);

    return "M" + d.source.x + "," + d.source.y +
        "S" + offSetX + "," + offSetY +
        " " + d.target.x + "," + d.target.y;
}

function updateNode1(node) {
    node.attr("transform", function(d) {
        return "translate(" + fixna1(d.x) + "," + fixna1(d.y) + ")";
    });
}

function dragstarted1(d) {
    d3.event.sourceEvent.stopPropagation();
    if (!d3.event.active) graphLayout1.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged1(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended1(d) {
    if (!d3.event.active) graphLayout1.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}