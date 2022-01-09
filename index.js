const express = require('express');
const fs = require('fs')

const app = express();

players = []


var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.get("/", function(req, res) {
		res.set('Content-Type', 'text/html')
  	res.sendFile(__dirname+'/index.html');
		console.log('requested',req.originalUrl)
	
});

app.get("/script.js", function(req, res) {
		res.set('Content-Type', 'text/javascript')
  	res.sendFile(__dirname+'/script.js');
		console.log('requested',req.originalUrl)
});

app.get("/get.js", function(req, res) {
		res.set('Content-Type', 'text/javascript')
  	res.sendFile(__dirname+'/get.js');
		console.log('requested',req.originalUrl)
});

app.get("/post.js", function(req, res) {
		res.set('Content-Type', 'text/javascript')
  	res.sendFile(__dirname+'/post.js');
		console.log('requested',req.originalUrl)
});

app.get("/style.css", function(req, res) {
		res.set('Content-Type', 'text/css')
  	res.sendFile(__dirname+'/style.css');
		console.log('requested',req.originalUrl)
});

app.get("/getid", function(req, res) {
		res.set('Content-Type', 'text/plain')
  	res.send(JSON.stringify({id:players.length}) );

		players.push({'x':300,'y':200,'r':0,'id':players.length, 'health':100,'active':true,'bullets':[]})

		console.log('id request')
	
});

app.get("/img/cursor.png", function(req, res) {
		res.set('Content-Type', 'image/png')
  	res.sendFile(__dirname+'/img/cursor.png');
});

app.get("/img/gun.png", function(req, res) {
		res.set('Content-Type', 'image/png')
  	res.sendFile(__dirname+'/img/gun.png');
});

app.get("/img/title.png", function(req, res) {
		res.set('Content-Type', 'image/png')
  	res.sendFile(__dirname+'/img/title.png');
});

app.get("/img/death.png", function(req, res) {
		res.set('Content-Type', 'image/png')
  	res.sendFile(__dirname+'/img/death.png');
});


app.get("/img/*", function(req, res) {
		res.set('Content-Type', 'image/png')
  	res.sendFile(__dirname+req.originalUrl);
});


var msg
var temp
app.post("/", function(req, res) {
	msg = JSON.parse(req.body.message )


	//add to array if not in yet
	idArray=[]

	for(i in players){
		if(players[i].id == msg.id){
			players[i].x = msg.x
			players[i].y = msg.y
			players[i].r = msg.r
			players[i].active = msg.active
			players[i].name = msg.name
			players[i].bullets= msg.bullets
			temp = players[i].health

			if(msg.revive){
				temp = 100
			}
		players[i].health = temp
		}

	}

	//return array w
	res.set('Content-Type', 'text/plain')
	res.send(JSON.stringify( {'enemies':players,'health':temp,'revived':msg.revive})  )
});

var msg2
app.post("/hit", function(req, res) {

	try{
	msg2 = JSON.parse(req.body.message )
	}catch(error){
		res.set('Content-Type', 'text/plain')
		res.send( 'improper formatting')
	}

	//decreace player's health
	if(players[msg2.player].health >0){
		players[msg2.player].health -= 10
		console.log('player '+ msg2.player + ' hit')
	}else{
		players[msg2.player].active = false;
		console.log('player '+ msg2.player + ' eliminated')
	}



	res.set('Content-Type', 'text/plain')
	res.send( 'response recorded')
});

function log(){
	console.clear()
	console.table(players)
	
}

setInterval(log,1000)

app.listen(3000, () => {
  console.log('server started');
});
