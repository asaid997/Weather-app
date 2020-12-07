const mongoose = require('mongoose')
mongoose.set('useFindAndModify',false)
const Schema = mongoose.Schema

const weatherSchema = new Schema({
    name:  {type: String, unique: true},
    temperature: Number,
    main: String,
    condition: String,
    timestamp: Number,
    conditionPic: String,
    isInDataBase: Boolean
})

const Weather = mongoose.model("weather", weatherSchema)
module.exports = Weather
