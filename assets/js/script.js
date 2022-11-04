const API_KEY = 'b80f4f4a76bd4c6a587f1efe91224ce5'



function getGeoLocation(query, limit = 5) {
    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_KEY}`)
}

function getCurrentWeather(arguments) {
    return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${arguments.lat}&lon=${arguments.lon}&exclude=hourly,minutely,alerts&units=imperial&appid=${API_KEY}`)
}

var cityInfo= $(".city-info")

getGeoLocation('Atlanta')
.then(response => response.json())
.then(data => {
    //same thing
    // var lat = data[0].lat
    // var lon = data[0].lon
    console.log(data[0])
    getCurrentWeather({ lat: data[0].lat, lon: data[0].lon })
    .then(weatherResponse => weatherResponse.json())
    .then(weatherData => {
        console.log(JSON.stringify(weatherData, null, 2))
        cityInfo.text(JSON.stringify(weatherData, null, 2))
    })
    .catch(error => {
        cityInfo.text(error.message)
    })
})
.catch(error => {
    cityInfo.text(error.message)
})

var myDate = new Date( 1667581200 * 1000);
console.log(myDate.toGMTString()+"<br>"+myDate.toLocaleString());