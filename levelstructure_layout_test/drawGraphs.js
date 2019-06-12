
testgraph1NotConn={
    "nodes": [
      {
        "id": "n1",
        "group": 1
      },
      {
        "id": "n2",
        "group": 2
      },
      {
        "id": "n3",
        "group": 3
      },
      {
        "id": "n4",
        "group": 1
      },
      {
        "id": "n5",
        "group": 2
      },
      {
        "id": "n6",
        "group": 3
      }
    ],
    "links": [
      {
        "source": "n1",
        "target": "n2",

      },
      {
        "source": "n2",
        "target": "n3",

      },
      {
        "source": "n3",
        "target": "n3",

      },
      {
        "source": "n3",
        "target": "n4",

      },      {
        "source": "n5",
        "target": "n6",

      },
      {
        "source": "n6",
        "target": "n1",

      },
      {
        "source": "n4",
        "target": "n5",

      },
      {
        "source": "n2",
        "target": "n6",

      },
    ]
  };
testgraph1Conn={
    "nodes": [
      {
        "id": "n1",
        "group": 1
      },
      {
        "id": "n2",
        "group": 1
      },
      {
        "id": "n3",
        "group": 1
      },
      {
        "id": "n4",
        "group": 1
      }
    ],
    "links": [
      {
        "source": "n1",
        "target": "n2",

      },
      {
        "source": "n2",
        "target": "n3",

      },
      {
        "source": "n3",
        "target": "n4",

      },
      {
        "source": "n3",
        "target": "n2",

      }
    ]
  };

var width =350;
var height = 350;


function drawgraph(graph,svgid){
    var graphLayout = d3.forceSimulation(graph.nodes)
        .force("charge", d3.forceManyBody().strength(-3000))
        .force("center", d3.forceCenter(width / 2, height/ 2))
        .force("x", function(d){
            if(d.group==1){return d3.forceX(width / 3).strength(10);}
            if(d.group==2){return d3.forceX(width / 2).strength(10);}
            if(d.group==3){return d3.forceX(2*width / 3).strength(10);}})
        .force("y", d3.forceY(height / 2).strength(1))
        .force("path", d3.forceLink(graph.links).id(function(d) {return d.id; }).distance(50).strength(1))
        .on("tick", ticked);


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



    var node = container.append("g").attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("r", 8)
        .attr("fill","#009900");



    function ticked() {
        node.call(updateNode);
        link.call(updateLink);
    }

    function fixna(x) {
        if (isFinite(x)) return x;
        return 0;
    }

    function updateLink(link) {
        link.attr("d", function(d) {
            var x1 = fixna(d.source.x),
                y1 = fixna(d.source.y),
                x2 = fixna(d.target.x),
                y2 = fixna(d.target.y),
                dx = x2 - x1,
                dy = y2 - y1,
                dr = Math.sqrt(dx * dx + dy * dy),

                // Defaults for normal edge.
                drx = 0,
                dry = 0,
                xRotation = 0, // degrees
                largeArc = 0, // 1 or 0
                sweep = 0; // 1 or 0

                // Self edge.
                if ( x1 === x2 && y1 === y2 ) {
                // Fiddle with this angle to get loop oriented.
                xRotation = -45;

                // Needs to be 1.
                largeArc = 1;

                // Change sweep to change orientation of loop. 
                //sweep = 0;

                // Make drx and dry different to get an ellipse
                // instead of a circle.
                drx = 12;
                dry = 12;
                
                // For whatever reason the arc collapses to a point if the beginning
                // and ending points of the arc are the same, so kludge it.
                x2 = x2 - 3;
                y2 = y2 + 5;
                } 

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

}
drawgraph(testgraph1NotConn,"#viz1");
drawgraph(testgraph1Conn,"#viz2");

