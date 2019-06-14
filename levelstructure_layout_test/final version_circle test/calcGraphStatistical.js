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

//console.log(getMeanStdDev([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]));
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
        // console.log(randomMeanSTD[n]);
        // console.log(cascadeMeanSTD[n]);
        // console.log(nisheMeanSTD[n]);
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