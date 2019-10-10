const request = require('request');

const forecast = (longitude,latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d9c7461ed3f8f728f09906a03f241f5e/'+ latitude +',' + longitude;

    request({url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect with server', undefined);
        } else if(body.error) {
            callback('Unable to find the data', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' 
            + body.currently.temperature + ' degree out. There is ' 
            + body.currently.precipProbability + '% chance of rain' );
        }
    })
}

module.exports = forecast;
