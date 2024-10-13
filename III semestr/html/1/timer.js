function odliczanie()
	{
		var today = new Date();
		var hour = today.getHours();
		var minute = today.getMinutes();
		var second = today.getSeconds();
		
		if (hour<10) hour = "0"+hour;
		if (minute<10) minute = "0"+minute;
		if (second<10) second = "0"+second;
		
		document.getElementById("zegar").innerHTML = hour+":"+minute+":"+second;
		 
	}
setInterval(odliczanie,1000);
odliczanie();