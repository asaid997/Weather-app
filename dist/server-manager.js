class ServerManager {
    cityData = []
    id = 0

    getRecipes = (ingredient,renderFunction) => $.get(`/recipes/${ingredient}`, recipes => renderFunction(recipes))

    getDataFromDB = () => $.get(`/cities`, cities => this.cityData = cities)

    getCityById = id => this.cityData.find(city => city._id === id)

    //adds id for newly added cities to manage finding them more easily using one function "getCityById"
    getCityData = async city => $.get(`/city/${city}`, _city => {
        console.log(_city)
        if(_city !== "city not found"){
            _city._id = `${this.id++}`
            console.log(_city._id)
            this.cityData.push(_city)
        }
    })

    //function handles the local id, it deletes the key so that a new _id is generated properly from mongoose
    saveCity = async city => {
        city.inDataBase = true
        delete city["_id"]
        console.log(city)
        const id = await $.post(`/city/${JSON.stringify(city)}`)
        city._id = id
    }
}