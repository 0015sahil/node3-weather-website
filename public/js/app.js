console.log('Clientside javascript file is loaded');

fetch('http://puzzle.mead.io/puzzle').then(response => {
    response.json().then(data => {
        console.log(data)
    })
})

// Send data to browser


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);

    document.getElementById('getLocation').innerHTML = 'Loading...';
    document.getElementById('getForecast').innerHTML = '';

    fetch('http://localhost:3001/weather?address=' + location).then(response => {
    response.json().then(data => {
        if (data.error) {
            document.getElementById('getLocation').innerHTML = 'Location not found....'
        } else {
            console.log(data.location)
            console.log(data.forecast)
            document.getElementById('getLocation').innerHTML = data.location
            document.getElementById('getForecast').innerHTML = data.forecast
        }
    })
})
})
