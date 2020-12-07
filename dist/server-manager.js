class ServerManager {
    cityData = []

    _getCityByName = cityName => this.cityData.find(city => city.name.toLowerCase() === cityName.toLowerCase())

    _ifDoesntExist = cityName => this._getCityByName(cityName) ? false : true

    getDataFromDB = () => $.get(`/cities`, cities => this.cityData = cities)

    getCityData = async cityName => {
        if (this._ifDoesntExist(cityName))
            await $.get(`/city/${cityName}`, city => city !== "city not found" ? this.cityData.push(city) : {})
    }

    saveCity = async city => {
        city.isInDataBase = true
        await $.post(`/city/${JSON.stringify(city)}`)
    }

    removeCity = async cityName => {
        const deletedSuccesfuly = await $.ajax({url: `/city/${cityName}`,type: 'DELETE'})
        if (deletedSuccesfuly)
            this.cityData.find(city => city.name === `${cityName}`).isInDataBase = false
    }

    refreshCity = async cityName => {
        const index = this.cityData.findIndex(city => city.name === `${cityName}`)
        let updated

        //update database
        if (this.cityData[index].isInDataBase) {
            updated = await $.ajax({url: `/city/${cityName}`,type: 'PUT'})
            if (updated === "Failure") 
                return
        }
        //just fetch data(since its not in database)
        else
            updated = await $.get(`/city/${cityName}`, city => updated = city)
            
        this.cityData[index] = updated
    }
}