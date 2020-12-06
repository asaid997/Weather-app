const renderer = new Renderer()
const serverManager = new ServerManager()

async function onStartUp(){
    await serverManager.getDataFromDB()
    renderer.weatherHandleBarAppender(serverManager.cityData)
}

const render = async () => renderer.weatherHandleBarAppender(serverManager.cityData)

onStartUp()

//serverManager.getCityData("haifa")
$('#search').on("click",async function(){
    const city = $('#city_to_search').val()
    await serverManager.getCityData(city)
    render()
})

$('#all_data_container').on("click",".remove-from-database", async function(){
    const id = $(this).closest('.weather-container').data('id')
    console.log(id)
    console.log(serverManager.getCityById(id))
})
$('#all_data_container').on("click",".add-to-database", async function(){
    const id = `${$(this).closest('.weather-container').data('id')}`
    const city = serverManager.getCityById(id)
    await serverManager.saveCity(city)
    render()
})