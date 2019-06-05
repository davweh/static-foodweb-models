
function calcSpecTypeInPercent(graph) {
    var topPerc=0,intPerc=0,basPerc=0,notConnec=0;
    var len=graph.nodes.length;
    for (var i=0;i<len;i++){
        if (graph.nodes[i].group==="top") {
            topPerc++;
        } else if (graph.nodes[i].group==="intermediate") {
            intPerc++;
        } else if (graph.nodes[i].group==="basal"){
            basPerc++;
        } else if (graph.nodes[i].group==="notConnected"){
            notConnec++;
        }
    }
    return [topPerc/(len-notconnec),intPerc/(len-notconnec),basPerc/(len-notconnec)];
}

function displayInTable(){

}