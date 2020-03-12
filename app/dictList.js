class Playab{
    constructor(fileName){
	this.player = new Audio(fileName)
	this.timeA=this.player.currentTime;
	this.timeB=this.player.duration;
	this.checker=-1;
	
	this.infoContainer = document.createElement("div");
	this.infoContainer.className="audioPanel";
	this.info = document.createElement("div");
	this.infoContainer.appendChild(this.info);
	this.btns = this.getButtons()
	for (var b in this.btns){
	    this.infoContainer.appendChild(this.btns[b]);
	}
	this.keyMap = this.buildKey()
    }

    changeFile(fileName){
	var that = this;
	
	that.player.onload = (e)=>{
	    that.timeA = 0;
	    that.timeB = that.player.duration;
	}
	that.player.src = fileName;
	that.player.preload="auto";
	if (navigator.userAgent.search("Chrome")>=0)
	    that.seniorUrl() 
    }

    loadFile(fileName){
	// var reader = new FileReader();
	// var that = this
	// reader.onload = (e)=> {
	//     that.player.src = reader.result;
	//     that.timeA = 0;
	//     that.timeB = this.player.duration;
	// }
	// //reader.readAsDataURL( fileObject )
	this.player.src = URL.createObjectURL( fileName)
	this.timeA=0
	this.player.onload = (e) => {that.timeB = that.player.duration}
    }

    seniorUrl(){
	var that = this
	var lastTime = this.player.currentTime
	var uReader = new XMLHttpRequest()
	uReader.open ('GET', this.player.src, true)
	uReader.responseType = 'blob'
	uReader.onload = () => {
	    //fReader.readAsDataURL(uReader.response)
	    that.player.src = URL.createObjectURL(uReader.response)
	    //that.player.src = uReader.response
	    that.player.currentTime = lastTime 
	}
	//var fReader = new FileReader()
	//fReader.onload = (e) => {
	    //that.player.src = fReader.result;}
	uReader.send()
    }

    startPlay(){
	var that = this
	function fudu(){
	    if (that.player.currentTime >= that.timeB){
		that.player.currentTime = that.timeA;
	    }
	    that.info.innerHTML = "[" + (that.timeA).toFixed(3) + " - " + (that.timeB).toFixed(3) + "] :" + that.player.currentTime.toFixed(3);
	    // NOTE: num.toFixed(k)
	}
	if (this.checker > 0){
	    clearTimeout(this.checker);
	}
	this.checker = setInterval(fudu, 0.2);
	this.player.play();
    }
    
    playNext(){
	if (this.timeB < this.player.duration - 1){
	    this.timeA = this.timeB;
	    this.player.currentTime = this.timeA;
	}
	
	else if (this.player.currentTime > this.player.duration - 3){
	    this.timeA = 0
	}

	this.timeB = this.player.duration;
    }
    
    playBack(){
	this.timeB = this.player.currentTime;
	this.player.currentTime = this.timeA;
    }

    removeB(){
	this.timeB = this.player.duration;
    }

    backToA(){
	this.player.currentTime = this.timeA;
    }

    moveLeft(scale=5){
	this.player.currentTime -= scale;
	if (this.timeA >= this.player.currentTime){
	    this.timeA = this.player.currentTime
	}
    }

    moveRight(scale=5){
	this.player.currentTime += scale;
	if (this.timeB <= this.player.currentTime){
	    this.player.currentTime = this.timeA;
	}
    }
    
    lefterA(){
	this.timeA = this.timeA-0.5;
	
    }
    lefterB(){
	this.timeB = this.timeB-0.5}
    righterA(){
	this.timeA = this.timeA+0.5}
    righterB(){
	this.timeB = this.timeB+0.5}

    startStop(){
	if (this.player.paused){
	    this.startPlay();
	}
	else{
	    this.player.pause();
	}
    }

    getButtons(){
	var that = this;
	var btns = new Array();
	var makebtn = function(bf, bft){
	    var b = document.createElement("input");
	    b.type = "button";
	    b.value = bft;
	    b.addEventListener("click", () => bf())
	    btns.push(b);
	}

	makebtn( ()=>{}, "K" );
	btns[0].addEventListener("keydown", (e)=>that.keyWork(e));
	makebtn( ()=>that.startStop(), "pause/resume" );
	makebtn( ()=>that.playBack(), "Repeat" );
	makebtn( ()=>that.playNext(), "playNext");
	makebtn( ()=>that.moveLeft(), "Forward");
	makebtn( ()=>that.moveRight(), "Backward");
	makebtn( ()=>that.lefterA(), "lefterA");
	makebtn( ()=>that.righterA(), "righterA");
	makebtn( ()=>that.lefterB(), "lefterB");
	makebtn( ()=>that.righterB(), "righterB");
	makebtn( ()=>that.seniorUrl(), "FixChrm");

	var fileBtn = document.createElement("input")
	fileBtn.type = "file";
	fileBtn.onchange = (e)=>that.loadFile( fileBtn.files[0] )
	btns.push(fileBtn)				 
	return btns;
    }

    buildKey(){
	var keyList = new Array()
	var that = this;
	keyList[68]  = ()=>that.backToA();
	keyList[70]  = ()=>that.playBack();
	keyList[71]  = ()=>that.playNext();
	keyList[65]  = ()=>that.moveLeft(3);
	keyList[83]  = ()=>that.moveRight(3);
	keyList[49]  = ()=>that.moveLeft(20);
	keyList[50]  = ()=>that.moveRight(20);
	keyList[81]  = ()=>that.lefterA();
	keyList[87]  = ()=>that.righterA();
	keyList[69]  = ()=>that.lefterB();
	keyList[82]  = ()=>that.righterB();
	keyList[84] = ()=>that.removeB();
	keyList[32]  = ()=>that.startStop();
	keyList[48] = ()=>{that.player.volume += 0.05;}
	keyList[57] = ()=>{that.player.volume -= 0.05;}
	keyList[67]= ()=>{that.infoContainer.remove()}
	keyList[88] = ()=>{that.player.playbackRate *= 1.25}
	keyList[90] = () => {that.player.playbackRate *= 0.8}
	keyList[86] = () => {that.player.playbackRate = 1}

	return keyList;
    }
    keyWork(e){
	e.stopPropagation();
	if (this.keyMap[e.keyCode]){
	    e.preventDefault();
	    this.keyMap[e.keyCode]();
	}
	
    }
}

