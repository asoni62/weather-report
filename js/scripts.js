
const defaultAppId = "1012785a91822556dbf92cf4e4e48e02"; //Default App Id
const defaultLocation = "Pune"; // Default City Name

/*
Function: defaultWeatherReport
Purpose: Responsible to update weather report for default location
Parameter:
*/
function defaultWeatherReport(){
	document.getElementById("cityname").value = defaultLocation;
	getWeatherReport(defaultLocation.toLowerCase());
}

/*
Function: searchWeatherReport
Purpose: Responsible to update weather report based on user enter location
Parameter:
*/
function searchWeatherReport() {
    var searchValue = document.getElementById("cityname").value;
	searchValue = searchValue.toLowerCase();
	//get weather report data and render UI based on location
	getWeatherReport(searchValue);
	
	var tbody = document.getElementById("tbody");
	let rowCount = tbody.rows.length;
	while(rowCount > 0){
		rowCount--;
		tbody.deleteRow(rowCount);
	}
}

/*
Function: getWeatherReport
Purpose: Responsible to get weather report data and render UI based on location
Parameter: location value
*/
function getWeatherReport(searchValue){
	var loader = document.getElementById('loader');
	loader.style.display='flex';
	var searchText = document.getElementById("searchText");
	if(searchValue != ""){
		$.ajax({
			url:"http://api.openweathermap.org/data/2.5/forecast?q="+searchValue+"&apikey="+defaultAppId,
			dataType:'json',
			type: 'get',
			success:function(resultSet){
				  //** If yout API returns something, you're going to proccess the data here.
				  updateWeatherReport(resultSet,searchValue);
				  loader.style.display='none';
			},
			error:function(){
				loader.style.display='none';
				searchText.innerHTML = "Search for: "+searchValue.charAt(0).toUpperCase() + searchValue.slice(1)+", No result found";
			}
		});
	}else{
		searchText.innerHTML = "City not found, please enter..";
		loader.style.display='none';
	}	
}

/*
Function: getDay
Purpose: Responsible to get day text
Parameter: day value
*/
function getDay(dayIndex){
	const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
	return days[dayIndex];
}

/*
Function: getMonth
Purpose: Responsible to get month text
Parameter: month value
*/
function getMonth(monthIndex){
	const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",	"JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
	return monthNames[monthIndex];
}

/*
Function: updateWeatherReport
Purpose: Responsible to get weather report data and render UI based on response
Parameter: api response data and location value
*/
function updateWeatherReport(resultSet,searchValue){
	let date = new Date();
	var searchText = document.getElementById("searchText");
	if(resultSet && resultSet.list.length > 0){
		let maxDaysReport = 5;
		let description = "-";
		let wind = "-";
		let temp = "-";
		let toCelsius = 273.15;
		let humidity = "-";
		if(resultSet.city && resultSet.city.name && resultSet.city.country){
			if(!(resultSet.city.name.toLowerCase() == searchValue)){
				searchText.innerHTML = "Search for: "+searchValue.charAt(0).toUpperCase() + searchValue.slice(1)+", No result found";
				return false;
			}
			//set city name and country code
			searchText.innerHTML = "Search for: "+resultSet.city.name+", "+resultSet.city.country;
		}
				
		var tbody = document.getElementById("tbody");
		for(let tbodyIndex = 0; tbodyIndex < maxDaysReport; tbodyIndex++){
			let minTemp = "";
			let maxTemp = "";
			let weather = "";
			for(let listIndex=0; listIndex<resultSet.list.length; listIndex++){
				let data = resultSet.list;
				let dateTxt = data[listIndex].dt_txt;
				dateTxt = new Date(dateTxt);
				let main = data[listIndex].main;
				if(dateTxt.getDate() == date.getDate()){
					//get current minimum temperature
					if(minTemp == ""){
						minTemp = main.temp_min;
					}else if(minTemp > main.temp_min){
						minTemp = main.temp_min;
					}
					//get current maximum temperature
					if(maxTemp == ""){
						maxTemp = main.temp_min;
					}else if(maxTemp < main.temp_min){
						maxTemp = main.temp_min;
					}
					
				}
				if((dateTxt.getTime() >= date.getTime()) && weather == ""){
					weather = data[listIndex].weather;
					if(weather && weather.length>0){
						for(let weatherIndex=0; weatherIndex<weather.length; weatherIndex++){
							//get weather description
							description = weather[weatherIndex].description;
							if(description && description != ""){
								description = description.toUpperCase();
								break;
							}
						}
					}
					
					//get wind speed
					wind = data[listIndex].wind;
					if(wind && wind.speed){
						wind = wind.speed;
					}
					
					let main = data[listIndex].main;
					//get current temperature
					if(main && main.temp){
						temp = main.temp;
						temp = Math.round(temp - toCelsius);
					}
					
					//get current humidity
					if(main && main.humidity){
						humidity = main.humidity;
					}
				}
			}	
			let row = tbody.insertRow(tbodyIndex);
			
			let currentDay = getDay(date.getDay());
			let currentMonth = getMonth(date.getMonth());
			let currentDate = date.getDate();
			if(currentDate<10){
			currentDate='0'+currentDate; 
			}
			
			//set days
			let dayCell = row.insertCell(0);
			dayCell.innerHTML = "<p>"+currentDay+"</p><span class='subText'>"+currentMonth+" "+currentDate+"</span>";
			
			//set description
			let desCell = row.insertCell(1);
			desCell.innerHTML = description;
			
			//set current, min and max temperature
			let tempCell = row.insertCell(2);
			minTemp = Math.round(minTemp - toCelsius);
			maxTemp = Math.round(maxTemp - toCelsius);
			tempCell.innerHTML = "<p>"+temp+"&deg;</p><span class='subText'>max "+maxTemp+"&deg; - min "+minTemp+"&deg;</span>";
			
			//set wind
			let windCell = row.insertCell(3);
			windCell.innerHTML = wind;
			
			//set humidity
			let humidityCell = row.insertCell(4);
			humidityCell.innerHTML = humidity+"%";
			
			date.setDate(date.getDate()+1);
			date.setHours(0,0,0,0);
		}
	}else{
		searchText.innerHTML = "Search for: "+searchValue.charAt(0).toUpperCase() + searchValue.slice(1)+", No result found";
	}
}
