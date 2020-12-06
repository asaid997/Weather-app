const express = require('express')
const urllib = require('urllib')
const router = express.Router()

const Weather = require('../models/weather.js')

router.get('/city/:city', function (request, response) {
    const { city } = request.params
    try {
        urllib.request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a6e968f0a06749b832f24642cb313745`, (err, _response, res) => {
            const weatherData = JSON.parse(_response)
            if (weatherData.cod !== '404') {
                response.send({ name: weatherData.name, temperature: weatherData.main.temp, condition: weatherData.weather[0].description, conditionPic: weatherData.weather[0].icon, inDataBase: false })
            }
            response.send(weatherData.message)
        })
    }
    catch (error) {
        response.send(error)
    }

})

router.get(`/cities`, async function (request, response) {
    const cities = await Weather.find({})
    response.send(cities)
})

//localhost:3000/city/{"name": "Haifa", "temperature": 17.11, "condition": "light rain",  "icon": "10n"}
router.post(`/city/:city`, function (request, response) {
    const city = JSON.parse(request.params.city || "{}")
    const w = new Weather(city)
    w.save()
    response.send(w._id)
})

router.delete(`/city/:city`, async function (request, response) {
    const { city } = request.params

    try {
        await Weather.findByIdAndDelete(`${city}`)
    }
    catch (error) {
        response.send(error)
    }

    response.send("deleted")
})


module.exports = router