// ===================a few functions==============================
function containsObject(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i].source == obj.source && a[i].target == obj.target) {
            return true;
        }
    }
    return false;
}
function contains(a,obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == obj) {
            return true;
        }
    }
    return false;

}


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  } //output: number between 0 and max-1

function getPropsAsList(graph) {
    var sourceRetList=[];
    var targetRetList=[];
    for (var i=0;i<graph.links.length;i++){
        sourceRetList.push(graph.links[i].source);
        targetRetList.push(graph.links[i].target);
    }
    return [sourceRetList,targetRetList];
}


function calcGroups(graph){
    for (var j=0;j<graph.nodes.length;j++){
            propList=getPropsAsList(graph);
            sourceList=propList[0];
            targetList=propList[1];
            if(contains(sourceList,graph.nodes[j].id)==false) {
                graph.nodes[j].group="top";
            }

            if(contains(targetList,graph.nodes[j].id)==false) {
                graph.nodes[j].group="basal";
            }

            if(document.getElementById('checkConnected').checked==false)
            {
                if(contains(sourceList,graph.nodes[j].id)==false && contains(targetList,graph.nodes[j].id)==false){
                    graph.nodes[j].group="notConnected";
                }
            }
    }
  
    
}



function isConnected(graph){
    function getSourcAndTarg(graph){
        retlistSourcTarg=[];
        for(i=0;i<graph.links.length;i++){
            retlistSourcTarg.push([graph.links[i].source,graph.links[i].target]);
        }
        return retlistSourcTarg;
    }
    function containsListofList(a,obj) {
        for (var i = 0; i < a.length; i++) {
            if ((a[i][0] == obj ||a[i][1] == obj) && a[i][0]!=a[i][1] ) {
                return true;
            }
        }
        return false;
    
    }
    var sourcTargList=getSourcAndTarg(graph);
    for (j=0;j<graph.nodes.length;j++){
        if(containsListofList(sourcTargList,graph.nodes[j].id)==false){
            return false;
        }
    }
    return true;
}
testgraph1NotConn={
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
        "target": "n3",

      },
      {
        "source": "n3",
        "target": "n2",

      }
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
// console.log(getSourcAndTarg(testgraph1NotConn));
// console.log(contains(getSourcAndTarg(testgraph1NotConn),testgraph1NotConn.nodes[3].id));
// console.log(isConnected(testgraph1NotConn));
// console.log(isConnected(testgraph1Conn));


// ===================Random Network==============================
function calcGraphRandom(numSpecies,numLinks){
    var connec=numLinks/(numSpecies*numSpecies);


    var graph1temp={
        "nodes":[],
        "links":[],
    };

    for (var i=1;i<=numSpecies;i++){
        graph1temp.nodes.push({"id":"n"+i,"group":"intermediate"})
    }

    var numOfLinksInGraph=0;
    while (numOfLinksInGraph<numLinks){
        let randomNode1="n"+(getRandomInt(numSpecies)+1);
        let randomNode2="n"+(getRandomInt(numSpecies)+1);
        if (Math.random()<=connec  && containsObject(graph1temp.links,{"source":randomNode1,"target":randomNode2})==false) {
            graph1temp.links.push({"source":randomNode1,"target":randomNode2});
            numOfLinksInGraph++;
        } 
        
    }

    calcGroups(graph1temp);

    return graph1temp;
}


// ===================Cascade model==============================
function calcGraphCascade(numSpecies,numLinks){
    var prob=2*numLinks/(numSpecies*(numSpecies-1));

    var graph2temp={
        "nodes": [],
        "links":[],
    };

    for (var i=1;i<=numSpecies;i++){
        graph2temp.nodes.push({"id":"n"+i,"group":"intermediate"})
    }

    var numOfLinksInGraph2=0;
    while (numOfLinksInGraph2<numLinks){
        let firstRandNum=(getRandomInt(numSpecies)+1);
        if (firstRandNum==1) {continue;}
        let randomNode1="n"+firstRandNum;
        let randomNode2="n"+(getRandomInt(firstRandNum-1)+1);
        if (Math.random()<=prob  && containsObject(graph2temp.links,{"source":randomNode1,"target":randomNode2})==false) {
            graph2temp.links.push({"source":randomNode1,"target":randomNode2});
            numOfLinksInGraph2++;
        } 
        
    }
    calcGroups(graph2temp);

    return graph2temp;
}

// ===================Niche model(not done yet)==============================
function calcGraphNiche(numSpecies,numLinks){
    var connec=numLinks/(numSpecies*numSpecies);
    var graph3temp={
        "nodes":[],
        "links":[],
    };

    for (var i=1;i<=numSpecies;i++){
        graph3temp.nodes.push({"id":"n"+i,"group":"intermediate"})
    }

    var numOfLinksInGraph=0;
    while (numOfLinksInGraph<numLinks){
        let randomNode1="n"+(getRandomInt(numSpecies)+1);
        let randomNode2="n"+(getRandomInt(numSpecies)+1);
        if (Math.random()<=connec   && containsObject(graph3temp.links,{"source":randomNode1,"target":randomNode2})==false) {
            graph3temp.links.push({"source":randomNode1,"target":randomNode2});
            numOfLinksInGraph++;
        } 
        
    }
    calcGroups(graph3temp);

    return graph3temp;
}

var graph1,graph2,graph3;
function calcFinalGraphs() {
    if (document.getElementById('checkConnected').checked) {

        while (true) {
            graph1=calcGraphRandom(
                document.getElementById("inputfieldSpecies").value,
                document.getElementById("inputfieldLinkNum").value);
            if(isConnected(graph1)) {
                break;
            }
        }
        while (true) {
            graph2=calcGraphRandom(
                document.getElementById("inputfieldSpecies").value,
                document.getElementById("inputfieldLinkNum").value);
            if(isConnected(graph2)) {
                break;
            }
        }
        while (true) {
            graph3=calcGraphRandom(
                document.getElementById("inputfieldSpecies").value,
                document.getElementById("inputfieldLinkNum").value);
            if(isConnected(graph3)) {
                break;
            }
        }
    
    } else {
        graph1=calcGraphRandom(
            document.getElementById("inputfieldSpecies").value,
            document.getElementById("inputfieldLinkNum").value);
        graph2=calcGraphCascade(
            document.getElementById("inputfieldSpecies").value,
            document.getElementById("inputfieldLinkNum").value);
        graph3=calcGraphNiche(
            document.getElementById("inputfieldSpecies").value,
            document.getElementById("inputfieldLinkNum").value);
    }
}
calcFinalGraphs();