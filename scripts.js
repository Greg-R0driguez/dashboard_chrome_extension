//variables
const btcEl = document.getElementById('btc')
const pricesEl = document.getElementById('prices')
const WeatherEl = document.getElementById('weather')
const timeEl = document.getElementById('time')
const authorEl = document.getElementById('author')
const oneMin = 60000

//API for wallpaper backgrounds
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=wallpapers")
    .then(response => {
        if(!response.ok) {
            throw Error ("Something went wrong with unsplash")
        }
        //not implicit return
        return response.json()
    })
    .then(data => {
        //grabbing properties of the object and displaying to the DOM
        document.body.style.backgroundImage = `url(${data.urls.full})`
        authorEl.textContent = `Photo by: ${data.user.name}`
    })
    //default background if promise is rejected
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1509023464722-18d996393ca8?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDQ0NjY2NTU&ixlib=rb-1.2.1&q=85)`
    })

function getCrypto() {
    //API for crypto currency
    fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(response => {
        if (!response.ok) {
            throw Error ("something went wrong with coingecko")
        }
        //not implicit return
        return response.json()
    })
    .then(data => {
        //displaying image and asset name with btc div to the DOM
        btcEl.innerHTML = `   
            <img src=${data.image.small}> 
            <h2>${data.name}</h2>     
        `
        //updating DOM with prices using prices div
        pricesEl.innerHTML = `
            <p>Price: $ ${data.market_data.current_price.usd}</p>
            <p>24 hr: ${Math.round(data.market_data.price_change_percentage_24h * 100) / 100} %</p>
        `
    })
    .catch(err => console.log(err))
    //update price every minute
    setTimeout(getCrypto, oneMin)  
}
getCrypto()

//get current time and repeat every 60 seconds
function updateClock() {
    let d = new Date()
    timeEl.textContent = d.toLocaleTimeString("en-us", {timeStyle: "short"})
    setTimeout(updateClock, oneMin)
}
updateClock()

//gets location of users machine with longitude and latitude
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
    .then(response => {
        if (!response.ok) {
            throw Error("Weather data not available")
        }
        //not implicit return
        return response.json()
    })
    .then(data => {
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        // updating DOM with weather details using weather div to add elements
        WeatherEl.innerHTML = `
        <p>${data.weather[0].description}</p> 
        <img src=${iconUrl}>
        <h2>${Math.round(data.main.temp)}&degF</h2>
        `
    })
    .catch(err => console.error(err))
})