// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//* Initializing the main project folder */
app.use(express.static('website'));
// Setup Server
const port = 8080;
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};
// handling the get request
app.get('/weatherdata',(req, res)=> {
    res.send(projectData);
});
// handling post requests 
app.post('/addWeatherInfo', (req,res)=>{
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.user_input = req.body.user_input;
    res.send(projectData);
    console.log(projectData)
    }

);

