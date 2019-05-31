var numSpecies=10;//document.getElementById("inputfield1").value;
var numLinks=20;//document.getElementById("inputfield2").value;
var connec=numLinks/(numSpecies*numSpecies);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

// ===================Random Network==============================
var graph={
    "nodes":[],
    "links":[],
};

for (var i=1;i<=numSpecies;i++){
    graph.nodes.push({"id":"n"+i})
}
graph.links.push({"source":"n1","target":"n1"});
var numOfLinksInGraph=0;
while (numOfLinksInGraph<numLinks){
    let randomNode1="n"+(getRandomInt(numSpecies)+1);
    let randomNode2="n"+(getRandomInt(numSpecies)+1);
    if (Math.random()<=connec) {
        graph.links.push({"source":randomNode1,"target":randomNode2});
        numOfLinksInGraph++;
    } 
    
}
console.log(graph.links);

// ===================Cascade model==============================
var prob=2*numLinks/(numSpecies*(numSpecies-1));

var graph2={
    "nodes": [],
    "links":[],
};

for (var i=1;i<=numSpecies;i++){
    graph2.nodes.push({"id":"n"+i})
}

var numOfLinksInGraph2=0;
while (numOfLinksInGraph2<numLinks){
    let firstRandNum=(getRandomInt(numSpecies)+1);
    let randomNode1="n"+firstRandNum;
    let randomNode2="n"+(getRandomInt(firstRandNum-1)+1);
    if (Math.random()<=prob) {
        graph2.links.push({"source":randomNode1,"target":randomNode2});
        numOfLinksInGraph2++;
    } 
    
}
console.log(graph2.links.length);