



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

var width2 =600;
var height2 = 600;





var graphLayout2 = d3.forceSimulation(graph2.nodes)
    .force("charge", d3.forceManyBody().strength(-3000))
    .force("center", d3.forceCenter(width2 / 2, height2 / 2))
    .force("x", d3.forceX(width2 / 2).strength(1))
    .force("y", d3.forceY(height2 / 2).strength(1))
    .force("link", d3.forceLink(graph2.links).id(function(d) {return d.id; }).distance(50).strength(1))
    .on("tick", ticked2);

var adjlist2 = [];

graph2.links.forEach(function(d) {
    adjlist2[d.source.index + "-" + d.target.index] = true;
    adjlist2[d.target.index + "-" + d.source.index] = true;
});

function neigh2(a, b) {
    return a == b || adjlist2[a + "-" + b];
}


var svg2 = d3.select("#win2").attr("width", width2).attr("height", height2);
var container2 = svg2.append("g");

svg2.call(
    d3.zoom()
        .scaleExtent([.1, 4])
        .on("zoom", function() { container2.attr("transform", d3.event.transform); })
);
container2.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "-0 -5 10 10")
            .attr("refX", 20)
            .attr("refY", 0)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");  

var link2 = container2.append("g").attr("class", "links")
    .selectAll("line")
    .data(graph2.links)
    .enter().append("line")
    .attr("stroke", "#aaa")
    .attr("marker-end","url(#arrow)");
   // .attr("stroke-width", "1px");


var node2 = container2.append("g").attr("class", "nodes")
    .selectAll("g")
    .data(graph2.nodes)
    .enter()
    .append("circle")
    .attr("r", 8)
    .attr("fill", "#009900")



node2.call(
    d3.drag()
        .on("start", dragstarted2)
        .on("drag", dragged2)
        .on("end", dragended2)
);

 
//node.on("mouseover", focus).on("mouseout", unfocus);


function ticked2() {

    node2.call(updateNode2);
    link2.call(updateLink2);



}

function fixna2(x) {
    if (isFinite(x)) return x;
    return 0;
}

function focus2(d) {
    var index = d3.select(d3.event.target).datum().index;
    node2.style("opacity", function(o) {
        return neigh2(index, o.index) ? 1 : 0.1;
    });

    link2.style("opacity", function(o) {
        return o.source.index == index || o.target.index == index ? 1 : 0.1;
    });

}

function unfocus2() {
 
   node2.style("opacity", 1);
   link2.style("opacity", 1);
}

function updateLink2(link) {
    link.attr("x1", function(d) { return fixna2(d.source.x); })
        .attr("y1", function(d) { return fixna2(d.source.y); })
        .attr("x2", function(d) { return fixna2(d.target.x); })
        .attr("y2", function(d) { return fixna2(d.target.y); });
}

function updateNode2(node) {
    node.attr("transform", function(d) {
        return "translate(" + fixna2(d.x) + "," + fixna2(d.y) + ")";
    });
}

function dragstarted2(d) {
    d3.event.sourceEvent.stopPropagation();
    if (!d3.event.active) graphLayout2.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged2(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended2(d) {
    if (!d3.event.active) graphLayout2.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}