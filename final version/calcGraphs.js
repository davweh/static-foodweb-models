function calcGraphs(numSpecies,numLinks){
var connec=numLinks/(numSpecies*numSpecies);


function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

// ===================Random Network==============================
var graph1temp={
    "nodes":[],
    "links":[],
};

for (var i=1;i<=numSpecies;i++){
    graph1temp.nodes.push({"id":"n"+i})
}
var numOfLinksInGraph=0;
while (numOfLinksInGraph<numLinks){
    let randomNode1="n"+(getRandomInt(numSpecies)+1);
    let randomNode2="n"+(getRandomInt(numSpecies)+1);
    if (Math.random()<=connec  && contains(graph1temp.links,{"source":randomNode1,"target":randomNode2})==false) {
        graph1temp.links.push({"source":randomNode1,"target":randomNode2});
        numOfLinksInGraph++;
    } 
    
}
console.log(graph1temp.links.length);

// ===================Cascade model==============================
var prob=2*numLinks/(numSpecies*(numSpecies-1));

var graph2temp={
    "nodes": [],
    "links":[],
};

for (var i=1;i<=numSpecies;i++){
    graph2temp.nodes.push({"id":"n"+i})
}

var numOfLinksInGraph2=0;
while (numOfLinksInGraph2<numLinks){
    let firstRandNum=(getRandomInt(numSpecies)+1);
    let randomNode1="n"+firstRandNum;
    let randomNode2="n"+(getRandomInt(firstRandNum-1)+1);
    if (Math.random()<=prob  && contains(graph2temp.links,{"source":randomNode1,"target":randomNode2})==false) {
        graph2temp.links.push({"source":randomNode1,"target":randomNode2});
        numOfLinksInGraph2++;
    } 
    
}
console.log(graph2temp.links);
// ===================Niche model(not done yet)==============================
var graph3temp={
    "nodes":[],
    "links":[],
};

for (var i=1;i<=numSpecies;i++){
    graph3temp.nodes.push({"id":"n"+i})
}

var numOfLinksInGraph=0;
while (numOfLinksInGraph<numLinks){
    let randomNode1="n"+(getRandomInt(numSpecies)+1);
    let randomNode2="n"+(getRandomInt(numSpecies)+1);
    if (Math.random()<=connec   && contains(graph3temp.links,{"source":randomNode1,"target":randomNode2})==false) {
        graph3temp.links.push({"source":randomNode1,"target":randomNode2});
        numOfLinksInGraph++;
    } 
    
}
console.log(graph3temp.links.length);
return [graph1temp,graph2temp,graph3temp];
}

//var numSpeciesInp=document.getElementById("inputfieldSpecies").value;
//var numLinksInp=document.getElementById("inputfieldLinkNum").value;
var graphs=calcGraphs(
    document.getElementById("inputfieldSpecies").value,
    document.getElementById("inputfieldLinkNum").value);
var graph1=graphs[0];
var graph2=graphs[1];
var graph3=graphs[2];
