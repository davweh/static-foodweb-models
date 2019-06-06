
function round(num,dig){
    return Math.round(num* Math.pow(10,dig)) /Math.pow(10,dig);
}

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
    return [round(topPerc/(len-notConnec),2),round(intPerc/(len-notConnec),2),round(basPerc/(len-notConnec),2)];
}



function displayInTable(graph,name){
    var perc=calcSpecTypeInPercent(graph);
    var graphlen=graph.nodes.length;
    var graphlinks=graph.links.length;

    document.getElementById(name+"spec").innerHTML=graphlen;
    document.getElementById(name+"link").innerHTML=graphlinks;
    if (name==="random"){
        var conn=graphlinks/(graphlen*graphlen);
        document.getElementById(name+"connec").innerHTML=round(conn,2);
    } else{
        var conn=graphlinks/(graphlen*(graphlen-0));
        document.getElementById(name+"connec").innerHTML=round(conn,2);
    }

    document.getElementById(name+"topPercentage").innerHTML=perc[0];
    document.getElementById(name+"intermPercentage").innerHTML=perc[1];
    document.getElementById(name+"basalPercentage").innerHTML=perc[2];

}
function displayTables(){
displayInTable(graph1,"random");
displayInTable(graph2,"cascade");
displayInTable(graph3,"niche");
}
displayTables();
