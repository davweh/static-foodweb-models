 // functions for buttons and checkboxes
 function reloadsvg(id) {
    var bodyparent= document.body; 
    oldsvg=document.getElementById(id);
    var newsvg=document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newsvg.setAttributeNS(null,"id",id);
    newsvg.setAttributeNS(null,"class","svgframes");
    bodyparent.replaceChild(newsvg,oldsvg);

}
function reloadScriptFunction(type) {
    if(document.getElementById("checkdraw").checked){
    reloadsvg("viz1");
    reloadsvg("viz2");
    reloadsvg("viz3");
    drawgraph(graph1,"#viz1",type);
    drawgraph(graph2,"#viz2",type);
    drawgraph(graph3,"#viz3",type);}
}
function emptyWindows() {
    var emptygraph={
       "nodes":[],
       "links":[],
    };
    reloadsvg("viz1");
    reloadsvg("viz2");
    reloadsvg("viz3");      
    drawgraph(emptygraph,"#viz1","normal");
    drawgraph(emptygraph,"#viz2","normal");
    drawgraph(emptygraph,"#viz3","normal");      
}
function calcDrawTable() {
    if(document.getElementById("checkdraw").checked){
    calcFinalGraphs();
    reloadScriptFunction("normal");
    displayTables();
    } else {
    calcFinalGraphs();
    displayTables();
    }

}
function clearAll(){
    document.getElementById("inputfieldSpecies").value=0;
    document.getElementById("inputfieldLinkNum").value=0;
    calcDrawTable();
    clearExample();
}
function reorder(){
    function calcPos(graph){
        var radius=150;
        var anglecoeff=2* Math.PI /(graph.nodes.length);
        for(i=0;i<graph.nodes.length;i++) {
            graph.nodes[i].fx=radius*(Math.cos(i*anglecoeff)) +width/2;
            graph.nodes[i].fy=radius*(Math.sin(i*anglecoeff)) +height/2;
        }    
        graph.nodes[0].isFirst=true;  
        graph.nodes[1].isFirst=true;   
    }
    calcPos(graph1);
    calcPos(graph2);
    calcPos(graph3);

    reloadScriptFunction("sort");
}
function normalorder(){
    function delPos(graph){
        for(i=0;i<graph.nodes.length;i++) {
            graph.nodes[i].fx=null;
            graph.nodes[i].fy=null;
        }    
        graph.nodes[0].isFirst=false;  
        graph.nodes[1].isFirst=false;   
    }
    delPos(graph1);
    delPos(graph2);
    delPos(graph3);

    reloadScriptFunction("normal");

}