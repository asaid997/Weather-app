class Renderer {
    constructor() {
        const source = $('#weather-template').html();
        this._weatherTemplate = Handlebars.compile(source);
    }

    _handleBarAppender = (elementToAppendTo, Template, data) => {
        let newHTML = Template(data);
        elementToAppendTo.empty().append(newHTML);
    }

    weatherHandleBarAppender = (cities) => this._handleBarAppender($('#all_data_container'), this._weatherTemplate, {city: cities})


}