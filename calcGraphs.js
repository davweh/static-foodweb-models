var numSpecies



function  wskstuff(p,num){
    var truenum=0;
    var falsenum=0;
    for(var i=0;i<num;i++) {
        if (Math.random()<=p) {
            truenum++;
        }
        else {
            falsenum++;
        }
    }
    total=truenum+falsenum;
    document.write(truenum/total + "<br />");
    document.write(falsenum/total + "<br />");

};