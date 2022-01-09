let c = document.getElementById('c')
var ctx = c.getContext('2d')
ctx.imageSmoothingEnabled = false;

let demo = document.getElementById('demo')
let demo2 = document.getElementById('demo2')
let nameInp = document.getElementById('nameInp')
let form = document.getElementById('form')
let title = document.getElementById('title')
let deathImg = document.getElementById('deathImg')

const cw = 600;
const ch = 400;

c.width = cw;
c.height = ch;

var temp

game = {
	'keyDown':false,
	'active':true,
	'screen':'title',
	'explosions':[],
}

mouse = {
	'cursor':document.getElementById('cursor'),
	'x':0,
	'y':0,
}

keys = {
	'up':false,
  'down':false,
  'left':false,
	'right':false,
}

player = {

	'x':300,
	'y':200,
	'xv':0,
	'yv':0,
	'rotation':0,
	'friction':0.999,
	'speed':4,
	'id':'unset',
	'health':100,
	'nickname':'anon',
}

pewpew ={
	'image':document.getElementById('pewpew'),
	'speed':2,
	'b':[],
}



enemies = [[]]

function slope(x1,y1,x2,y2){
	temp = Math.atan( (y1-y2)/(x1-x2) )
	if(mouse.x<player.x){
		temp+=Math.PI
	}
	return temp 
}

function nameSubmit(){
	game.screen = 'game';
	player.nickname = nameInp.value
	window.setInterval(update,50)

	getID()
}

function loop(){
	if(game.screen == 'game'){

		keyHandler()
		updateB()
		displayLoop()
	}else if(game.screen == 'title'){
		titlePage()
	}else if(game.screen == 'death'){
		deathScreen()
	}
}



function Explosion(x,y,pNum,pLife,pColor){
	this.creationTime = Date.now()
	this.particles =[]
	this.color = pColor

	for(var k=0;k<pNum;k++){
		this.push([x,y,Math.PI * 2()])
	}

	this.update = function(){

	}
	
	
}

function renderParticles(){
	for(i of game.explosions){
		ctx.fillstyle=i.color
		for( i0 of i.particles){
			ctx.fillRect(i0[0],i0[1])
		}
	}
}

function updateParticles(){
	for(i of game.explosions){
		ctx.fillstyle=i.color
		for( i0 of i.particles){
			ctx.fillRect(i0[0],i0[1])
		}
	}
}


function cursor(){
	ctx.drawImage(mouse.cursor,mouse.x-10,mouse.y-10)
}

function background(){
	ctx.clearRect(0,0,cw,ch)
	ctx.fillStyle = 'grey'
	ctx.fillRect(0,0,cw,ch)
}

function titlePage(){
	ctx.clearRect(0,0,cw,ch)
	ctx.fillStyle = 'grey'
	ctx.fillRect(0,0,cw,ch)
	ctx.drawImage(title,((mouse.x-(cw/2))/10),((mouse.y-(ch/2))/10),cw,ch)

	cursor()
}

function deathScreen(){
	ctx.clearRect(0,0,cw,ch)
	ctx.fillStyle = 'grey'
	ctx.fillRect(0,0,cw,ch)
	ctx.drawImage(deathImg,((mouse.x-(cw/2))/10),((mouse.y-(ch/2))/10),cw,ch)

	cursor()
}

function line(x1,y1,x2,y2){
	ctx.beginPath()
	ctx.moveTo(x1,y1)
	ctx.lineTo(x2,y2)
	ctx.stroke()
}

function stats(){
	ctx.fillStyle = 'black'
	ctx.font = "30px Arial";
	ctx.textAlign = 'left'
	ctx.fillText('health: '+player.health,0,30 )
}

function drawPlayer(){
	ctx.fillStyle = 'blue';
	ctx.beginPath();
	ctx.ellipse(player.x, player.y,20, 20, 0, 0, Math.PI * 2);
	ctx.fill();

	ctx.save()
	ctx.translate(player.x,player.y)
	ctx.rotate(player.rotation)
	ctx.beginPath();
	ctx.ellipse(30, -10,7, 7, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(20, 10,7, 7, 0, 0, Math.PI * 2);
	ctx.drawImage(pewpew.image,10,-7,80,14)
	ctx.fill();
	ctx.restore()

	ctx.fillStyle='white'
	ctx.textAlign = 'center'
	ctx.font = '14px georgia'
	ctx.fillText(player.nickname +' ('+player.id+')',player.x,player.y)

	ctx.fillStyle = 'hsl('+player.health+',100%,50%)'
	ctx.fillRect(player.x-20,player.y-30,player.health/2.5,10)
	ctx.strokeStyle = 'black'
	ctx.strokeRect(player.x-20,player.y-30,40,10)
}


function drawEnemies(){

	for( i in enemies){
		if(enemies[i].id != player.id && enemies[i].active){
			ctx.fillStyle = 'red';
			ctx.beginPath();
			ctx.ellipse(enemies[i].x, enemies[i].y,20, 20, 0, 0, Math.PI * 2);
			ctx.fill();
			
			ctx.save()
			ctx.translate(enemies[i].x,enemies[i].y)
			ctx.rotate(enemies[i].r)
			ctx.beginPath();
			ctx.ellipse(30, -10,7, 7, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.beginPath();
			ctx.ellipse(20, 10,7, 7, 0, 0, Math.PI * 2);
			ctx.drawImage(pewpew.image,10,-7,80,14)
			ctx.fill();
			ctx.restore()
				
			ctx.fillStyle='white'
			ctx.textAlign = 'center'
			ctx.font = '14px georgia'
			ctx.fillText(enemies[i].name +' ('+enemies[i].id+')',enemies[i].x,enemies[i].y)

			ctx.fillStyle = 'hsl('+enemies[i].health+',100%,50%)'
			ctx.fillRect(enemies[i].x-20,enemies[i].y-30,enemies[i].health/2.5,10)
			ctx.strokeStyle = 'black'
			ctx.strokeRect(enemies[i].x-20,enemies[i].y-30,40,10)
			
			//draw enemy bullets
			for(j in enemies[i].bullets ){
				ctx.fillStyle = 'black'
				ctx.fillRect(enemies[i].bullets[j].x,enemies[i].bullets[j][i].y,2,2)
			}

		}
	};
};

function spawnB(){
	pewpew.b.push({'x': player.x+(Math.cos(player.rotation) * 80),'y':player.y+(Math.sin(player.rotation) * 80),'r': player.rotation})
}

function updateB(){
	for(i in pewpew.b){
		pewpew.b[i].x += Math.cos(pewpew.b[i].r) * 10
		pewpew.b[i].y += Math.sin(pewpew.b[i].r) * 10

		//check player colision
		for(i0 in enemies){
			
			if(20 >= Math.sqrt( (pewpew.b[i].x - enemies[i0].x)**2 + (pewpew.b[i].y - enemies[i0].y)**2 )&& enemies[i0].active){
				console.log('hit')
				postHit( {'player':enemies[i0].id} )
				
				pewpew.b.splice(pewpew.b[i],1)
				//create a new particle storm
				game.explosions.push(new Explosion(pewpew.b[i].x,pewpew.b[i].y,50,1,'red') )

			}

		}
		
		//check wall colision
		try{
			if(pewpew.b[i].x <= 0 || pewpew.b[i].x >= cw ||pewpew.b[i].y <= 0 || pewpew.b[i].y >= ch){
				pewpew.b.splice(pewpew.b[i],1)
			}
		}catch(error){

		}
	}
}


function drawB(){
	for(i in pewpew.b ){
		ctx.fillStyle = 'black'
		ctx.fillRect(pewpew.b[i].x,pewpew.b[i].y,2,2)
	}
}


window.onload = function(){
	nameSubmit()
	window.setInterval(loop,22)
}

function keyHandler(){

	if(keys.up){
		player.yv -= 1
	}else if(keys.down){
    player.yv += 1
	}

	if(keys.left){
		player.xv -= 1
	}else if(keys.right){
		player.xv += 1
	}


	//apply drag
	player.yv *= 0.88;
	player.xv *= 0.88;

	
	//update player position

	player.x += player.xv
	player.y += player.yv


	//set player rotation
	player.rotation = slope(player.x,player.y,mouse.x,mouse.y)

	if(player.x <= 20){
		player.x = 20
	}else if(player.x >= 580){
		player.x  = 580
	}
	if(player.y <= 20){
		player.y = 20
	}else if(player.y >= 380){
		player.y  = 380
	}

	if(player.health <= 0){
		console.log('you died')
		game.active=false;
		game.screen = 'death'
	}
	
}

function displayLoop(){
	
	background()
	stats()
	
	drawPlayer()
	drawEnemies()
	drawB()
	renderParticles()
	updateParticles()
	
	cursor()
}

function update(){
	demo.innerHTML = 'You are player ' +player.id
	 if(player.id != 'unset'){
	 	postData(
			 {'name':player.nickname,'x':Math.round(player.x),'y':Math.round(player.y),'r':(player.rotation),'id':player.id,'active':game.active,'bullets':pewpew.b,}
		)

	 }
}


window.addEventListener('keydown',function(e){

	if(e.key == 'w' ||e.key == 'W'){
		keys.up = true;
	}else if(e.key == 's'||e.key == 'S'){
    keys.down = true;
	}
	if(e.key == 'a'||e.key == 'A'){
		keys.left = true;
	}else if(e.key == 'd'||e.key == 'D'){
		keys.right = true
	}

})

window.addEventListener('keyup',function(e){

	if(e.key == 'w'||e.key == 'W'){
		keys.up = false
	}else if(e.key == 's'||e.key == 'S'){
    keys.down = false
	}

	if(e.key == 'a'||e.key == 'A'){
		keys.left = false
	}else if(e.key == 'd'||e.key == 'D'){
		keys.right = false
	}

})

c.addEventListener('mousemove',function(e){

	mouse.x = e.offsetX
	mouse.y = e.offsetY

})

c.onclick =  function(e){
	e.preventDefault()
	if(game.screen == 'game'){
  spawnB()
	}else if(game.screen == 'title'){
		if(mouse.x >=188 +((mouse.x-(cw/2))/10) && mouse.x <= 426 +((mouse.x-(cw/2))/10) && mouse.y >=260 +((mouse.y-(ch/2))/10) && mouse.y <=335+((mouse.y-(ch/2))/10)){
			nameSubmit()
		}
	}else if(game.screen =='death'){

		if(mouse.x >=188 +((mouse.x-(cw/2))/10) && mouse.x <= 426 +((mouse.x-(cw/2))/10) && mouse.y >=260 +((mouse.y-(ch/2))/10) && mouse.y <=335+((mouse.y-(ch/2))/10)){
			console.log('you clicked revive')


			postData(
			 {'name':player.nickname,'x':Math.round(player.x),'y':Math.round(player.y),'r':Math.round(player.rotation),'id':player.id,'active':true,'bullets':pewpew.b,'revive':true,}
		)
		}
		
	}

}

window.addEventListener("beforeunload", function(e){
  e.preventDefault()
	e.returnValue = "potato";

	game.active = false
	update()
});






