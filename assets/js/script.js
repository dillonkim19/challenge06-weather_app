const API_KEY = 'b80f4f4a76bd4c6a587f1efe91224ce5'

var input = document.querySelector('#input')
var searchButton = document.querySelector('#search-button')

input.addEventListener('keyup', function(event){
    if (event.key === 'Enter') {
        createWeatherDisplay(event.target.value)
    }
})

searchButton.addEventListener('click', function(event){
    var inputCity = input.value;
    console.log(inputCity);
    createWeatherDisplay(inputCity);
})

var cityDate = $(".city-date") 
var currentTemp = $(".current-temp") 
var currentWind = $(".current-wind") 
var currentHumidity = $(".current-humidity") 

var cityWeather = document.querySelector(".city-weather")
var fiveDay = document.querySelector(".five-day")

var cityInfo = $(".city-info")

var forecastCards = $(".forecast-cards")
var cardsArray = ['cards-one', 'cards-two', 'cards-three', 'cards-four', 'cards-five']

function getGeoLocation(query, limit = 5) {
    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${API_KEY}`)
}

function getCurrentWeather(arguments) {
    return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${arguments.lat}&lon=${arguments.lon}&exclude=hourly,minutely,alerts&units=imperial&appid=${API_KEY}`)
}

function getDate(unixTime) {
    var myDate = new Date(unixTime * 1000);
    myDate = myDate.toLocaleString().split(", ")[0]
    return myDate
}
// console.log(myDate.toGMTString())

function displayCurrentWeather(current, cityName) {
    cityDate.text(cityName + ': ' + getDate(current.dt))
    currentTemp.text('Temp: ' + current.temp)
    currentWind.text('Wind: ' + current.wind_speed + ' mph')
    currentHumidity.text('Humidity: ' + current.humidity + '%')
}

function displayForecast(daily) {
    // for (var i = 1; i < 6; i++) {

    // }
    // <div class="card card-one" style="width: 15rem;"></div>
    // <div class="card-body"></div>
    cityWeather.setAttribute("class", "city-weather p-2 border border-dark")
    fiveDay.setAttribute("style", "display: block")

    for (var i = 1; i < 6; i++){
        
 

        var card = document.createElement('div')
        card.setAttribute("class", `card ${cardsArray[i-1]} col-sm-3 col-md-4 col-lg-2`)
        forecastCards.append(card)
    
        var cardBody = document.createElement('div')
        cardBody.setAttribute("class", "card-body")
        card.append(cardBody)

        var cardDate = document.createElement('h5')
        cardDate.textContent = `${getDate(daily[i].dt)}`
        cardDate.setAttribute("class", "card-title")
        cardBody.append(cardDate)

        var weatherIcon = document.createElement('img')
        weatherIcon.src = `http://openweathermap.org/img/wn/${daily[i].weather[0].icon}.png`
        cardBody.append(weatherIcon)

        var cardTemp = document.createElement('p')
        cardTemp.textContent = `Temp: ${daily[i].temp.day}`
        cardTemp.setAttribute("class", "card-text")
        cardBody.append(cardTemp)

        var cardWind = document.createElement('p')
        cardWind.textContent = `Wind: ${daily[i].wind_speed}`
        cardWind.setAttribute("class", "card-text")
        cardBody.append(cardWind)

        var cardHumidity = document.createElement('p')
        cardHumidity.textContent = `Humidity: ${daily[i].humidity}`
        cardHumidity.setAttribute("class", "card-text")
        cardBody.append(cardHumidity)
    }
    
    

    
    
}

// var cityData;

function createWeatherDisplay(location) {
    getGeoLocation(location)
    .then(response => response.json())
    .then(data => {
        //same thing
        // var lat = data[0].lat
        // var lon = data[0].lon
        console.log(data[0])
        getCurrentWeather({ lat: data[0].lat, lon: data[0].lon })
        .then(weatherResponse => weatherResponse.json())
        .then(weatherData => {
            // console.log(JSON.stringify(weatherData, null, 2))
            console.log(weatherData)
            displayCurrentWeather(weatherData.current, data[0].name);
            displayForecast(weatherData.daily);
        })
        .catch(error => {
            cityInfo.text(error.message)
        })
    })
    .catch(error => {
        cityInfo.text(error.message)
    })
}




