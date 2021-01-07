var effortBtn = document.getElementsByTagName('button')[0];
var startBtn = document.getElementsByTagName('button')[1];
var nextBtn = document.getElementsByTagName('button')[2];
var foundBtn = document.getElementsByTagName('button')[3];
var refreshBtn = document.getElementsByTagName('button')[4];
var progressbar = document.getElementById('progressbar');
var treasures = document.getElementById('treasures');
var hunt = document.getElementById('hunt');
var textDirections = document.getElementById('textDirections');
var textTreasure = document.getElementById('textTreasure');
var credit = document.getElementById('credits');
var found = document.getElementById('found');


givendirections = 0;

effortBtn.onclick = function(){
    treasures.style.display = "none";
    effort.style.display = "flex";
}
startBtn.onclick = function(){
    effort.style.display = "none";
    treasureNmbr = Math.floor(Math.random()*2)+1;

    treasureDescr = document.getElementById('treasure-'+treasureNmbr).value;
    if (treasureDescr == ''){
        treasureDescr = 'Niets';
    }
    
    creditDescr = document.getElementById('ontvanger').value;

    directionstogive = document.getElementById('effort-'+treasureNmbr).value;
    if (directionstogive == '' || directionstogive == 0){
        directionstogive = 5;
    }

    console.log(treasureDescr);
    console.log(directionstogive);
    setdirections();
    hunt.style.display = "flex";
}
nextBtn.onclick = function(){
    setdirections();
    if (givendirections == directionstogive){
        nextBtn.style.display = "none";
        foundBtn.style.display = "block";
    }  
}
refreshBtn.onclick = function(){
    setdirections(true);
}

foundBtn.onclick = function(){
    hunt.style.display = "none";
    credit.innerHTML = "dit is voor " + creditDescr;
    textTreasure.innerHTML = treasureDescr;
    document.getElementsByTagName('body')[0].classList.add('found');
    found.style.display = "flex";
    confetti.start(5000);
}


function setdirections (refresh = false){

    compass = ['rechtdoor', 'linksaf', 'rechtsaf', 'terug'];
    count = ['eerste', 'tweede', 'derde', 'vierde', 'vijfde', 'zesde'];
    object = ['zijstraat', 'lantaarnpaal', 'huizenblok', 'auto', 'hekje', 'gebouw', 'fiets', 'voorbijganger']
    color = ['gele', 'groene', 'rode', 'zwarte', 'witte', 'blauwe'];
    
    directions = 'Ga ' + compass[Math.floor(Math.random()*4)] + ' na ';
    objects = object[Math.floor(Math.random()*8)];

    switch (objects) {
        case 'huizenblok': objects = 'het '+ count[Math.floor(Math.random()*6)] + ' huizenblok'; break;
        case 'hekje': objects = 'het '+ count[Math.floor(Math.random()*6)] + ' hekje'; break;
        case 'gebouw': objects = 'het '+ count[Math.floor(Math.random()*6)] + ' gebouw'; break;
        case 'auto': objects = 'de ' + count[Math.floor(Math.random()*6)] +' '+ color[Math.floor(Math.random()*6)] + ' auto'; break;
        default: objects = 'de '+ count[Math.floor(Math.random()*6)] +' '+ objects;
    }
    textDirections.innerHTML = directions + objects;
    if (refresh === false) {
        givendirections++;
        progressbar.style.width = givendirections/directionstogive*100 + '%';
    }
}