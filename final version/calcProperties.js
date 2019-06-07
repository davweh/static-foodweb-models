
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
    if(len===0) {
        return [0,0,0];
    }
    else{
        return [round(topPerc/(len-notConnec),2),round(intPerc/(len-notConnec),2),round(basPerc/(len-notConnec),2)];
    }
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


function examplebuttonFkt(name,s,l,t,i,b){
    document.getElementById("inputfieldSpecies").value=s;
    document.getElementById("inputfieldLinkNum").value=l;
    calcDrawTable();
    var tableDiv=document.getElementById("exampleTableEnvironment");
    
    var labelelem=document.createElement("label");
     labelelem.setAttribute("style","font-size:20px; position:relative; left:10px;");
     labelelem.id="tablelableId";
             
    labelelem.innerHTML=name;
    var child=tableDiv.childNodes;
    var tableelem=document.createElement("table");
     tableelem.setAttribute("class","exampleTable");
     tableelem.id="tableId";
    var tableRow1=document.createElement("tr");
    var tablehead1=document.createElement("th");
     tablehead1.setAttribute("class","tableEntries");
     tablehead1.setAttribute("style","border-bottom: 2px solid black; ");
     tablehead1.innerHTML="Eigenschaft";
    var tablehead2=document.createElement("th");
    tablehead2.setAttribute("class","tableEntries");
    tablehead2.setAttribute("style","border-bottom: 2px solid black; ");
    tablehead2.innerHTML="Wert";
    tableRow1.appendChild(tablehead1);
    tableRow1.appendChild(tablehead2);
    tableelem.appendChild(tableRow1);
    var nameArray=["Spezies","Links","Connectance","Top","Interm","Basal"];
    var valueArray=[s,l,round(l/(s*s),2),t,i,b];

    for(var i=0;i<=5;i++){
        var tableRow=document.createElement("tr");
        var tableCol1=document.createElement("td");
        var tableCol2=document.createElement("td");
        tableCol1.setAttribute("class","tableEntries");
        tableCol1.innerHTML=nameArray[i];
        tableCol2.innerHTML=valueArray[i];
        tableRow.appendChild(tableCol1);
        tableRow.appendChild(tableCol2);
        tableelem.appendChild(tableRow);
    }



    if(typeof child[1] == 'undefined'){
        tableDiv.appendChild(labelelem);
    }
    else {
        tableDiv.removeChild(document.getElementById("tablelableId"));
        tableDiv.appendChild(labelelem);
    }
    if(typeof child[2] == 'undefined'){
        tableDiv.appendChild(tableelem);
    }
    else {
        tableDiv.removeChild(document.getElementById("tableId"));
        tableDiv.appendChild(tableelem);
    }

}

function clearExample(){
    var tableDiv=document.getElementById("exampleTableEnvironment");
    var child=tableDiv.childNodes;
    if(typeof child[2] !== 'undefined'){
        tableDiv.removeChild(document.getElementById("tableId"));
    }
    if(typeof child[1] !== 'undefined'){
    tableDiv.removeChild(document.getElementById("tablelableId"));
    }
}