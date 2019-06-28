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
  } 

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

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

                    intvallCenter=parseFloat(getRandomArbitrary(intvallR/2,1-intvallR/2));
                }
                for(var j=0;j<numSpecies;j++){
                    if(
                        isinIntervall(parseFloat(graph3temp.nodes[j].nichevalue),
                        parseFloat(intvallCenter)-parseFloat(intvallR/2),
                        parseFloat(intvallCenter)+parseFloat(intvallR/2))
                        ) {
                            graph3temp.links.push({"source":graph3temp.nodes[j].id,"target":graph3temp.nodes[i].id});
                    }
                }

            }
            graphlen=graph3temp.nodes.length;
            graphlinks=graph3temp.links.length;
            actualConn=graphlinks/(graphlen*graphlen);
            connecError=parseFloat(document.getElementById("inputconnErr").value);
            if (isinIntervall(actualConn,connec-connecError,connec+connecError)){
                break;
            } 

        }

        calcGroups(graph3temp);
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
    
    var child=tableDiv.childNodes;
    var tableelem=document.createElement("table");
     tableelem.setAttribute("class","table");
     tableelem.setAttribute("style","left:100px;");
     tableelem.id="tableId";

    var labelrow=document.createElement("tr");
    var labelrowContent=document.createElement("td");
    labelrowContent.setAttribute("colspan","2");
    labelrowContent.setAttribute("class","tableLabel");
    labelrowContent.innerHTML=name;
    labelrow.appendChild(labelrowContent);
    tableelem.appendChild(labelrow);

    var tableRow1=document.createElement("tr");
    var tablehead1=document.createElement("th");
     tablehead1.setAttribute("class","tableheader");
     tablehead1.innerHTML="Eigenschaft";
    var tablehead2=document.createElement("th");
    tablehead2.setAttribute("class","tableheader");
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
        tableCol2.setAttribute("class","tableEntries");
        if (nameArray[i]=="Connectance") {
            tableCol1.setAttribute("style","border-bottom: 2px solid black");
            tableCol2.setAttribute("style","border-bottom: 2px solid black");
        }
        tableCol1.innerHTML=nameArray[i];
        tableCol2.innerHTML=valueArray[i];
        tableRow.appendChild(tableCol1);
        tableRow.appendChild(tableCol2);
        tableelem.appendChild(tableRow);
    }

    if(typeof child[1] == 'undefined'){
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
    if(typeof child[1] !== 'undefined'){
        tableDiv.removeChild(document.getElementById("tableId"));
    }

}


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
        var node = container.selectAll(".node")
            .data(graph.nodes)
            .enter()
            .append("g").attr("class", "nodes");
        node.append("circle")
            .attr("r", 8)
            // .attr("stroke", function(d){if(d.isFirst) return "#000000";})
            // .attr("stroke-width", function(d){if(d.isFirst) return "2px";})
            .attr("fill",function(d){
            if (d.group==="top"){ return "#990000";} //red
            if (d.group==="basal"){ return "#245af6";} //blue
            if (d.group==="intermediate"){ return "#009900";}//green
            if (d.group==="notConnected"){ return "#000000";}//black
            });
         node.append("text")
             .attr("dx",12)
             .attr("dy",2)
             .text(function(d){ if(d.isFirst) return d.id.charAt(1);});
        

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
            if(type=="sort"){
                var drx=dr,
                    dry=dr;                
            } else{
                var drx=0,
                    dry=0; 
            }
            var xRotation = 0,
                largeArc = 0, 
                sweep = 0; 


            if ( x1 === x2 && y1 === y2 ) {

            xRotation = -45;

            largeArc = 1;

            sweep = 0;

            drx = 12;
            dry = 12;
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



function calcMultipleTimes(){
    var tempprop1,tempprop2,tempprop3;
    var times=document.getElementById("calcStatInput").value;
    var randomVals=[new Array(times),new Array(times),new Array(times),
        new Array(times),new Array(times),new Array(times)];
    var cascadeVals=[new Array(times),new Array(times),new Array(times),
        new Array(times),new Array(times),new Array(times)];
    var nisheVals=[new Array(times),new Array(times),new Array(times),
        new Array(times),new Array(times),new Array(times)];
    var randomMeanSTD=new Array(6);
    var cascadeMeanSTD=new Array(6);
    var nisheMeanSTD=new Array(6);

    function getAllProp(graph){
        var graphlen=graph.nodes.length;
        var graphlinks=graph.links.length;
        var tibProp=calcSpecTypeInPercent(graph);
        return [graphlen,
            graphlinks,
            round(graphlinks/(graphlen*graphlen),2),
            tibProp[0],tibProp[1],tibProp[2]];
    }

    function getMean(list){
        var retsum=0;
        for (var i=0;i<list.length;i++){
            retsum+=list[i];
        }
        return retsum/(list.length);
    }

    function getMeanStdDev(list){
        var mean=getMean(list);
        var retsum=0;
        for (var i=0;i<list.length;i++){
            retsum+=Math.pow((list[i]-mean),2);
        }
        return [round(mean,2),round(Math.sqrt(retsum/(list.length-1)),4)];
    }


    for(var i=0;i<times;i++){
        calcFinalGraphs();
        tempprop1=getAllProp(graph1);
        tempprop2=getAllProp(graph2);
        tempprop3=getAllProp(graph3);
        for (var j=0;j<6;j++){
            randomVals[j][i]=tempprop1[j];
            cascadeVals[j][i]=tempprop2[j];
            nisheVals[j][i]=tempprop3[j];
        }
       
    }

    for(var n=0;n<6;n++){
        randomMeanSTD[n]=getMeanStdDev(randomVals[n]);
        cascadeMeanSTD[n]=getMeanStdDev(cascadeVals[n]);
        nisheMeanSTD[n]=getMeanStdDev(nisheVals[n]);
    }


    var randomnameArray=["randomspec","randomlink","randomconnec","randomtopPercentage",
    "randomintermPercentage","randombasalPercentage"];
    var cascadenameArray=["cascadespec","cascadelink","cascadeconnec","cascadetopPercentage",
    "cascadeintermPercentage","cascadebasalPercentage"];
    var nichenameArray=["nichespec","nichelink","nicheconnec","nichetopPercentage",
    "nicheintermPercentage","nichebasalPercentage"];
    for(var i=0;i<6;i++){
        document.getElementById(randomnameArray[i]).innerHTML=randomMeanSTD[i][0] +"|"+ randomMeanSTD[i][1];
        document.getElementById(cascadenameArray[i]).innerHTML=cascadeMeanSTD[i][0] +"|"+ cascadeMeanSTD[i][1];
        document.getElementById(nichenameArray[i]).innerHTML=nisheMeanSTD[i][0] +"|"+ nisheMeanSTD[i][1];
    }
}