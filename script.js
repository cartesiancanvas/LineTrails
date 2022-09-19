const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = []
let hue = 0;

window.addEventListener('resize',function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

});


const mouse={
	x:undefined,
	y:undefined,
}

canvas.addEventListener('click',function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	init(100);
});

canvas.addEventListener('mousemove',function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	init(2);
})
class Particle{
	constructor(){
		this.x = mouse.x; 
		this.y = mouse.y; 
		this.size = Math.random() * 15 + 1;
		this.angle = Math.random() * Math.PI*2
		this.vx = 0.15*16*Math.pow(Math.sin(this.angle), 3);
		this.vy = -0.15*(13*Math.cos(this.angle)-5*Math.cos(2*this.angle)-2*Math.cos(3*this.angle)-Math.cos(4*this.angle));
		this.color = 'hsl(' + hue + ', 100% , 50%)';
	}
	update(){
		this.x += this.vx;
		this.y += this.vy;
		if(this.size > 0.2){
			this.size-=0.1;
		}
	}
	draw(){
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
	}
}

function init(count){
	for(let i=0 ; i<count ; i++){
		particles.push(new Particle());
	}
}

function handleParticles() {
	for(var i =0 ; i <particles.length ; i++){
		particles[i].update();
		particles[i].draw();
		for(var j = i; j<particles.length; j++){
			let dx = particles[i].x - particles[j].x;
			let dy = particles[i].y - particles[j].y;
			let dist = Math.sqrt( dx * dx + dy * dy);
			if(dist<100){
				ctx.beginPath();
				ctx.strokeStyle = particles[i].color;
				ctx.lineWidth = this.size/32;
				ctx.moveTo(particles[i].x,particles[i].y);
				ctx.lineTo(particles[j].x,particles[j].y);
				ctx.closePath();
				ctx.stroke();
			}
		}
		if(particles[i].size <=0.3){
			particles.splice(i,1);
			i--;
		}
	}
}

function animate() {
	//ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = 'rgba(0,0,0,0.1)';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	handleParticles();
	hue--;
	requestAnimationFrame(animate);
}
animate();

