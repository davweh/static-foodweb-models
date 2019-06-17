
var width =350;
var height = 350;


function drawgraph(graph,svgid,type){
    var graphLayout = d3.forceSimulation(graph.nodes)
        .force("charge", d3.forceManyBody().strength(-3000))
        .force("center", d3.forceCenter(width / 2, height/ 2))
        .force("x", d3.forceX(width / 2).strength(1))
        .force("y", d3.forceY(height / 2).strength(1))
        .force("path", d3.forceLink(graph.links).id(function(d) {return d.id; }).distance(50).strength(1))
        .on("tick", ticked);

    var adjlist = [];

    graph.links.forEach(function(d) {
        //adjlist[d.source.index + "-" + d.target.index] = true;
        adjlist[d.target.index + "-" + d.source.index] = true;
    });

    function neigh(a, b) {
        return a == b || adjlist[a + "-" + b];
    }


    var svg = d3.select(svgid).attr("width", width).attr("height", height);
    var container = svg.append("g");

    svg.call(
        d3.zoom()
            .scaleExtent([.1, 4])
            .on("zoom", function() { container.attr("transform", d3.event.transform); })
    );
    container.append("defs").append("marker")
                .attr("id", "arrow")
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 20)
                .attr("refY", 0)
                .attr("markerWidth", 8)
                .attr("markerHeight", 8)
                .attr("orient", "auto")
                .append("path")
                .attr("fill","#585858")
                .attr("d", "M0,-5L10,0L0,5");  
    container.append("defs").append("marker")
                .attr("id", "curvedArrow")
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 12)
                .attr("refY", -1)
                .attr("markerWidth", 8)
                .attr("markerHeight", 8)
                .attr("orient", "-20")
                .append("path")
                .attr("fill","#585858")
                .attr("d", "M0,-5L10,0L0,5");  

    var link = container.append("g")
        .selectAll("path")
        .data(graph.links)
        .enter().append("path")
        .attr("class", "path")
        .attr("stroke","#888888")
        .attr('marker-end',function(d) {
        return d.source == d.target ? 'url(#curvedArrow)' : 'url(#arrow)'
        }
    );


    if(type=="sort"){
        var node = container.append("g").attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("r", 8)
        .attr("stroke", function(d){if(d.isFirst) return "#000000";})
        .attr("stroke-width", function(d){if(d.isFirst) return "2px";})
        .attr("fill",function(d){
         if (d.group==="top"){ return "#990000";} //red
         if (d.group==="basal"){ return "#245af6";} //blue
         if (d.group==="intermediate"){ return "#009900";}//green
         if (d.group==="notConnected"){ return "#000000";}//black
         });
    } else{
    var node = container.append("g").attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("r", 8)
        .attr("fill",function(d){
         if (d.group==="top"){ return "#990000";} //red
         if (d.group==="basal"){ return "#245af6";} //blue
         if (d.group==="intermediate"){ return "#009900";}//green
         if (d.group==="notConnected"){ return "#000000";}//black
         });
    }



    node.call(
        d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
    );

    if (document.getElementById('check').checked) 
    {node.on("mouseover", focus).on("mouseout", unfocus);}


    function ticked() {
        node.call(updateNode);
        link.call(updateLink);
    }

    function fixna(x) {
        if (isFinite(x)) return x;
        return 0;
    }

    function focus(d) {
        var index = d3.select(d3.event.target).datum().index;
        node.style("opacity", function(o) {
            return neigh(index, o.index) ? 1 : 0.1;
        });

        link.style("opacity", function(o) {
            return /*o.source.index == index ||*/ o.target.index == index ? 1 : 0.1;
        });

    }

    function unfocus() {
    node.style("opacity", 1);
    link.style("opacity", 1);
    }

    function updateLink(link) {
        link.attr("d", function(d) {
            var x1 = fixna(d.source.x),
                y1 = fixna(d.source.y),
                x2 = fixna(d.target.x),
                y2 = fixna(d.target.y),
                dx = x2 - x1,
                dy = y2 - y1,
                dr = Math.sqrt(dx * dx + dy * dy);

                // Defaults for normal edge.
            if(type=="sort"){
                var drx=dr,
                    dry=dr;                
            } else{
                var drx=0,
                    dry=0; 
            }
            var xRotation = 0, // degrees
                largeArc = 0, // 1 or 0
                sweep = 0; // 1 or 0

            // Self edge.
            if ( x1 === x2 && y1 === y2 ) {
            // Fiddle with this angle to get loop oriented.
            xRotation = -45;

            // Needs to be 1.
            largeArc = 1;

            // Change sweep to change orientation of loop. 
            sweep = 0;

            // Make drx and dry different to get an ellipse
            // instead of a circle.
            drx = 12;
            dry = 12;
            x2 = x2 - 3;
            y2 = y2 + 5;
            } 
        // different style of links    
        // if(type=="sort"){
        //     return "M" + 
        //         d.source.x + "," + 
        //         d.source.y + "A" + 
        //         dr + "," + dr + " 0 0,1 " + 
        //         d.target.x + "," + 
        //         d.target.y;
        // } else{
        // return "M" + x1 + "," + y1 +
        // "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep +
        // " " + x2 + "," + y2 ;
        // }
        return "M" + x1 + "," + y1 +
        "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep +
        " " + x2 + "," + y2 ;
        });

        link.attr("fill","transparent");
    
    }

    function updateNode(node) {
        node.attr("transform", function(d) {
            return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
        });
    }

    function dragstarted(d) {
        d3.event.sourceEvent.stopPropagation();
        if (!d3.event.active) graphLayout.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) graphLayout.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}
drawgraph(graph1,"#viz1","normal");
drawgraph(graph2,"#viz2","normal");
drawgraph(graph3,"#viz3","normal");
