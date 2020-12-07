const renderer = new Renderer()
const serverManager = new ServerManager()

async function onStartUp() {
    await serverManager.getDataFromDB()
    renderer.weatherHandleBarAppender(serverManager.cityData)
}

const render = async () => renderer.weatherHandleBarAppender(serverManager.cityData)

onStartUp()


async function search(){
    const search = $('#city_to_search')
        const city = search.val()
        search.val("")
        await serverManager.getCityData(city)
        render()
}
$('#search').on("click", search)
$('#city_to_search').keypress(async function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        search()
    }
});


$('#all_data_container').on("click", ".remove-from-database", async function () {
    const name = $(this).closest('.weather-container').find('.name').text()
    await serverManager.removeCity(name)
    render()
})
$('#all_data_container').on("click", ".add-to-database", async function () {
    const name = $(this).closest('.weather-container').find('.name').text()
    const city = serverManager._getCityByName(name)
    await serverManager.saveCity(city)
    render()
})
$('#all_data_container').on("click", ".refresh", async function () {
    const name = $(this).closest('.weather-container').find('.name').text()
    await serverManager.refreshCity(name)
    render()
})