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

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }//output: in [min,max)

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
// testgraph1NotConn={
//     "nodes": [
//       {
//         "id": "n1",
//         "group": 1
//       },
//       {
//         "id": "n2",
//         "group": 1
//       },
//       {
//         "id": "n3",
//         "group": 1
//       },
//       {
//         "id": "n4",
//         "group": 1
//       }
//     ],
//     "links": [
//       {
//         "source": "n1",
//         "target": "n2",

//       },
//       {
//         "source": "n2",
//         "target": "n3",

//       },
//       {
//         "source": "n3",
//         "target": "n3",

//       },
//       {
//         "source": "n3",
//         "target": "n2",

//       }
//     ]
//   };
// testgraph1Conn={
//     "nodes": [
//       {
//         "id": "n1",
//         "group": 1
//       },
//       {
//         "id": "n2",
//         "group": 1
//       },
//       {
//         "id": "n3",
//         "group": 1
//       },
//       {
//         "id": "n4",
//         "group": 1
//       }
//     ],
//     "links": [
//       {
//         "source": "n1",
//         "target": "n2",

//       },
//       {
//         "source": "n2",
//         "target": "n3",

//       },
//       {
//         "source": "n3",
//         "target": "n4",

//       },
//       {
//         "source": "n3",
//         "target": "n2",

//       }
//     ]
//   };
// console.log(getSourcAndTarg(testgraph1NotConn));
// console.log(contains(getSourcAndTarg(testgraph1NotConn),testgraph1NotConn.nodes[3].id));
// console.log(isConnected(testgraph1NotConn));
// console.log(isConnected(testgraph1Conn));

/**/


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
        if (Math.random()<=prob  && containsObject(graph2temp.links,{"source":randomNode2,"target":randomNode1})==false) {
            graph2temp.links.push({"source":randomNode2,"target":randomNode1});
            numOfLinksInGraph2++;
        } 
        
    }
    calcGroups(graph2temp);

    return graph2temp;
}



// ===================Niche model==============================
// function calcGraphNicheTest(numSpecies,numLinks){
//     var connec=numLinks/(numSpecies*numSpecies);
//     var betaProp=1/(2*connec)  -1;
//     var graph3temp={
//         "nodes":[],
//         "links":[],
//     };

//     for (var i=1;i<=numSpecies;i++){
//         graph3temp.nodes.push({"id":"n"+i,"group":"intermediate"})
//     }

//     var numOfLinksInGraph=0;
//     while (numOfLinksInGraph<numLinks){
//         let randomNode1="n"+(getRandomInt(numSpecies)+1);
//         let randomNode2="n"+(getRandomInt(numSpecies)+1);
//         if (Math.random()<=connec   && containsObject(graph3temp.links,{"source":randomNode1,"target":randomNode2})==false) {
//             graph3temp.links.push({"source":randomNode1,"target":randomNode2});
//             numOfLinksInGraph++;
//         } 
        
//     }
//     calcGroups(graph3temp);

//     return graph3temp;
// }

function compare(a,b){
    if(a.nichevalue>b.nichevalue) return 1;
    if(a.nichevalue<b.nichevalue) return -1;
    return 0;
}

function getIntervallWidth(nicheVal,beta){
    while(true){
    var randomVal=parseFloat(Math.random());
    if(randomVal!=0) break;
    }
    // console.log("nicheVal " + nicheVal);
    // console.log("beta " + beta);
    // console.log("randomVal " + randomVal);
    // console.log("result " + parseFloat(nicheVal*(1-Math.pow(1-randomVal,1/beta))));
    return parseFloat(nicheVal*(1-Math.pow(1-randomVal,1/beta)));
}
function isinIntervall(value,a,b){
    if(parseFloat(value)>=parseFloat(a) && parseFloat(value)<=parseFloat(b)) return true;
    else return false;
}



function calcGraphNiche(numSpecies,numLinks){
    var connec=parseFloat(numLinks/(numSpecies*numSpecies));
    var betaProp=parseFloat(1/(2*connec) -1);
    var currNicheVal,intvallR,intvallCenter,graphlen,graphlinks,connecError,actualConn,graph3temp;
    if(numSpecies!=0){
        while(true){
            graph3temp={
                "nodes":[],
                "links":[],
            };
            for (var i=1;i<=numSpecies;i++){
                graph3temp.nodes.push({"nichevalue":Math.random()})
            }
            graph3temp.nodes=graph3temp.nodes.sort(compare);


            for (var i=1;i<=numSpecies;i++){
                graph3temp.nodes[i-1].group="intermediate";
                graph3temp.nodes[i-1].id="n"+i;

            }

            for(var i=0;i<numSpecies;i++) {
                currNicheVal=parseFloat(graph3temp.nodes[i].nichevalue);
                intvallR=parseFloat(getIntervallWidth(currNicheVal,betaProp));
                if (currNicheVal<= 1-intvallR/2){
                    intvallCenter=parseFloat(getRandomArbitrary(intvallR/2,currNicheVal));
                }
                else if(currNicheVal> 1- intvallR/2) {
                    // console.log("hallo");
                    intvallCenter=parseFloat(getRandomArbitrary(intvallR/2,1-intvallR/2));
                }
                for(var j=0;j<numSpecies;j++){
                    if(
                        isinIntervall(parseFloat(graph3temp.nodes[j].nichevalue),
                        parseFloat(intvallCenter)-parseFloat(intvallR/2),
                        parseFloat(intvallCenter)+parseFloat(intvallR/2))
                        ) {
                            // console.log("ni "+graph3temp.nodes[j].nichevalue);
                            // console.log("Ci "+intvallCenter);
                            // console.log("ri "+intvallR);
                            // console.log(intvallCenter-intvallR/2);
                            // console.log(intvallCenter+intvallR/2);
                            // console.log("");
                            graph3temp.links.push({"source":graph3temp.nodes[j].id,"target":graph3temp.nodes[i].id});
                    }
                }

            }
            graphlen=graph3temp.nodes.length;
            graphlinks=graph3temp.links.length;
            actualConn=graphlinks/(graphlen*graphlen);
            connecError=parseFloat(document.getElementById("inputconnErr").value);
            // console.log(connec);
            // console.log(connecError);
            // console.log(actualConn);
            // console.log(connec-connecError);
            // console.log(connec+connecError);
            // console.log(actualConn>=(connec-connecError));
            // console.log(actualConn<=(connec+connecError));
            // console.log(isinIntervall(actualConn,connec-connecError,connec+connecError));
            // console.log();
            if (isinIntervall(actualConn,connec-connecError,connec+connecError)){
                break;
            } 

        }

        calcGroups(graph3temp);
        console.log(graph3temp.nodes);
        return graph3temp;
    } else{return {"nodes":[],"links":[]};}
}



var graph1,graph2,graph3;
function calcFinalGraphs() {
    if (document.getElementById('checkConnected').checked) {

        while (true) {
            graph1=calcGraphRandom(
                parseInt(document.getElementById("inputfieldSpecies").value,10),
                parseInt(document.getElementById("inputfieldLinkNum").value,10));
            if(isConnected(graph1)) {
                break;
            }
        }
        while (true) {
            graph2=calcGraphCascade(
                parseInt(document.getElementById("inputfieldSpecies").value,10),
                parseInt(document.getElementById("inputfieldLinkNum").value,10));
            if(isConnected(graph2)) {
                break;
            }
        }
        while (true) {
            graph3=calcGraphNiche(
                parseInt(document.getElementById("inputfieldSpecies").value,10),
                parseInt(document.getElementById("inputfieldLinkNum").value,10));
            if(isConnected(graph3)) {
                break;
            }
        }
    
    } else {
        graph1=calcGraphRandom(
            parseInt(document.getElementById("inputfieldSpecies").value,10),
            parseInt(document.getElementById("inputfieldLinkNum").value,10));
        graph2=calcGraphCascade(
            parseInt(document.getElementById("inputfieldSpecies").value,10),
            parseInt(document.getElementById("inputfieldLinkNum").value,10));
        graph3=calcGraphNiche(
            parseInt(document.getElementById("inputfieldSpecies").value,10),
            parseInt(document.getElementById("inputfieldLinkNum").value,10));
    }
}
calcFinalGraphs();