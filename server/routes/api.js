const { response } = require('express')
const express = require('express')
const urllib = require('urllib')
const router = express.Router()

const Weather = require('../models/weather.js')

function _makeWeatherRequest(city, callbackFunction) {
    urllib.request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a6e968f0a06749b832f24642cb313745`, callbackFunction)
}

function _extractRelevantWeatherData(apiWeatherData) {
    return {
        name: apiWeatherData.name,
        temperature: apiWeatherData.main.temp,
        condition: apiWeatherData.weather[0].description,
        conditionPic: apiWeatherData.weather[0].icon,
        main: apiWeatherData.weather[0].main,
        timestamp: +new Date()
    }
}

//get weather object/city weather data
router.get('/city/:cityName', function (request, response) {
    const { cityName } = request.params
    _makeWeatherRequest(cityName, (err, weatherResponse) => {
        const weatherData = JSON.parse(weatherResponse)
        if (weatherData.cod !== '404') {
            const weatherObject = _extractRelevantWeatherData(weatherData)
            weatherObject.isInDataBase = false

            response.send(weatherObject)
        }
        else
            response.send(weatherData.message)
    })
})

//update database and return the new weather object
router.put(`/city/:cityName`, async function (request, response) {
    const { cityName } = request.params
    _makeWeatherRequest(cityName, async (err, weatherResponse) => {
        const weatherData = JSON.parse(weatherResponse)
        await Weather.findOneAndUpdate({ name: cityName }, { $set: _extractRelevantWeatherData(weatherData) }, { new: true }, async (err, doc) => {
            if (err) 
                response.send("Failure");
            else
                response.send(doc);
        })

    })
})

router.get(`/cities`, async function (request, response) {
    const cities = await Weather.find({}, { _id: 0, __v: 0 })
    response.send(cities)
})

//save new city 
router.post(`/city/:city`, async function (request, response) {
    const city = JSON.parse(request.params.city || "{}")
    await new Weather(city).save()
    response.send("saved")
})

router.delete(`/city/:cityName`, async function (request, response) {
    const { cityName } = request.params
    const deleteStatus = await Weather.find({ name: cityName }).deleteOne()
    response.send(`${deleteStatus.deletedCount}`)
})


module.exports = router