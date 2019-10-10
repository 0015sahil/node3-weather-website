const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define path for express setting 
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup hendlebar engine and view location  
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'This is Home page',
        name: 'Sahil Patel'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'This is About page',
        name: 'Sahil Patel'
    });
});

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'This is Help page',
        name: 'Sahil Patel'
    });
});

// Weather Data
app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'Cannot find address'
        })
    }

    geocode(address, (error, {latitude, longitude, location}= {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecast) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                location,
                forecast,
                address
            })
        })
    })    
});

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Andrew Mead',
        errorMessage:'Help article Not Found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Andrew Mead',
        errorMessage:'Page Not Found'
    });
})

// app.get('', (req, res) => {
//     res.send('<h1>Hello ExpressJS</h1>');
// })

// app.get('/help', (req, res) => {
//     res.send([{
//             name: 'Hello this is array of object'
//         }, {
//             name: 'This feature is pretty cool'
//         }
//     ]);
// });

// app.get('/about', (req, res) => {
//     res.send('<title>Hey this is html title</title>');
// });



// Start Server
app.listen(3001, ()=> {
    console.log('Port 3001 is running successfully...');
});
