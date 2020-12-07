class Renderer {

    weatherCodeToColor =  {
        Thunderstorm: "#B68FE0",
        Drizzle: "#8B99A7",
        Rain: "#079CC5",
        Snow: "#DCF7F9",
        Clear: "#6E93D8",
        Clouds: "#B1C3D3",
        Sand: "#E8D89B",
        other: "#D6D6D6",
        Mist: this.other,
        Smoke: this.other,
        Haze: this.other,
        Dust: this.other,
        Fog: this.other,
        Dust: this.other,
        Ash: this.other,
        Squall: this.other,
        Tornado: this.other
    }

    constructor() {
        const source = $('#weather-template').html();
        this._weatherTemplate = Handlebars.compile(source);

        Handlebars.registerHelper('getColor', main => this.weatherCodeToColor[main])
        Handlebars.registerHelper('hotColdColorAdjustor', temperature => {
            if( temperature < 0) temperature = 0
            if( temperature > 20) temperature *= 2
            else if( temperature > 30) temperature *= 4
            return 255 - (temperature)
        })
        Handlebars.registerHelper('lastUpdated', timestamp => {
            const currentTime = +new Date()
            const last_updated = currentTime - timestamp
            return `${(last_updated/1000/60/60).toFixed(2)}h`
        })
    }

    _handleBarAppender = (elementToAppendTo, Template, data) => {
        let newHTML = Template(data);
        elementToAppendTo.empty().append(newHTML);
    }

    weatherHandleBarAppender = (cities) => this._handleBarAppender($('#all_data_container'), this._weatherTemplate, {city: cities})
}