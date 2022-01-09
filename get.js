function getID(){
				
	var xmlhttp = new XMLHttpRequest();
		var url = "/getid";

		xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					
					player.id = JSON.parse( this.responseText).id
					//console.log(JSON.parse(this.responseText) )
				};
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
}