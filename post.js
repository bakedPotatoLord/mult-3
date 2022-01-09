

function encodeData(dataArray){ return encodeURIComponent(JSON.stringify(dataArray) )}

function decodeData(dataArray){ return JSON.parse(decodeURIComponent(dataArray)) }


function postData(msg){
	var http = new XMLHttpRequest();
		var url = '/';
		var params = 'message='+JSON.stringify(msg)

		http.open('POST', url, true);

		//Send the proper header information along with the request
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				enemies = JSON.parse( http.responseText).enemies;
				player.health = JSON.parse( http.responseText).health
				if(JSON.parse( http.responseText).revived){
					game.active = true
					game.screen = 'game'
				}
				

			}
		}
	http.send(params);

}

function postHit(msg){
	var http = new XMLHttpRequest();
		var url = '/hit';
		var params = 'message='+JSON.stringify(msg)

		http.open('POST', url, true);

		//Send the proper header information along with the request
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				//enemies = JSON.parse( http.responseText);
			}
		}
	http.send(params);

}
