class Starfield
{
	// define as variaveis
	
	fps ;
    canvas ;
    width ;
	height ;
    minVelocity ;
    maxVelocity ;
    qtdestars ;
	stars;
    intervalId ;
	ctx;
	star;	 
  
  
	//define o construtor e o contexto
constructor(ctx) {
		  this.fps = 30;
	
	this.width = 0;
	this.height = 0;
	this.minVelocity = 30;
	this.maxVelocity = 60;
	this.qtdestars = 150;
	this.intervalId = 0;
	
	
    this.ctx = ctx;
	//console.table(this.ctx);
	//define o tamanho da janela
	this.width = window.innerWidth;
	console.table(window.innerWidth);
	this.height = window.innerHeight;
	console.table(window.innerHeight);
	this.ctx.canvas.width = this.width;
    this.ctx.canvas.height = this.height;
	    
  }
  
 
inicializa()
{
	
	var self = this;
	 
addEventListener('resize', function resize(event){
		//redefine as medidas quando a janela é alterada
    
	self.width = window.innerWidth;
    self.height = window.innerHeight;
	self.ctx.canvas.width = self.width;
	self.ctx.canvas.height = self.height;
    self.desenha() 
}); 

}
start()
{
	this.stars = [];
	
	for(var i=0; i<this.qtdestars; i++) {
	
			var x = Math.random()*this.width;
			var y =  Math.random()*this.height;
			var size =  Math.random()*8+2;
			var vel = (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity;
			this.cor = CORES[Math.floor(Math.random()*CORES.length)];
			this.star = new Star(x,y, size,vel,cor );
		
		this.stars[i] = this.star;
		
	}
	var timeUpdate = 1000 / this.fps;
	var self = this;
	this.intervalId = setInterval(function() {
        self.update();
        self.tecla();
		self.desenha();		
    }, timeUpdate);
	
}

	

	tecla()
	{
		
		document.addEventListener('keydown', event => {
		if (event.keyCode === KEY.B) {
			
			var img = document.querySelector("#floresta");
			img.setAttribute('src', 'img/floresta.jpg');
		}
		if (event.keyCode === KEY.N) {
			
			var img = document.querySelector("#floresta");
			img.setAttribute('src', 'img/floresta1.jpg');
		}
		if (event.keyCode === KEY.M) {
			
			var img = document.querySelector("#floresta");
			img.setAttribute('src', 'img/floresta2.jpg');
		}
		if (event.keyCode === KEY.C) {
			
			cor = '#9ACD32';
		}
		if (event.keyCode === KEY.Z) {
			
			cor = '#ADFF2F';
		}
		if (event.keyCode === KEY.X) {
			
			cor = 'darkgreen';
		}
		if (event.keyCode === KEY.V) {
			
			cor = '#DAA520';
		}
		if (event.keyCode === KEY.UP) {
			
			this.fps = 5;
		}
		if (event.keyCode === KEY.DOWN) {
			
			this.fps = 50;
		}

		if (event.keyCode === KEY.RIGHT) {
			
			this.starx=2.5;
		}

		if (event.keyCode === KEY.LEFT) {
			
			this.starx=0;
		}
		
		
		});

	}

	

	desenha()
	{	
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(0, 0, this.width, this.height);
		
		this.ctx.fillStyle = cor;
		for(var i=0; i<this.stars.length;i++) {
		this.star = this.stars[i];
		this.ctx.fillRect(this.star.x, this.star.y, this.star.size, this.star.size);
		
	}
	}


  update(){
	var dt = 1 / this.fps;
	for(var i=0; i<this.stars.length; i++) {
		var star = this.stars[i];
		star.y += dt * star.velocity;
		star.x+=this.starx;
		
	
		if(star.y > this.height||star.x > this.width) {
			var x = Math.random()*this.width;
			var size =  Math.random()*8+2;
			var vel = (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity;
			let s = new Star(x, Math.random()*this.height,size, vel);
				
		 	this.stars[i] = s;
			
		}
		
	}
}


stop()
{
	clearInterval(this.intervalId);
}
	
}