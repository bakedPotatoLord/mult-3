
function Particle(x,y,pNum,pLife){
	this.creationTime = Date.now()
	
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