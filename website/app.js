/* Global Variables */
//gui vars

const generateButton = document.getElementById('generate');
const zipCodeText = document.getElementById('zip');
const feelingsText = document.getElementById('feelings');
const date =document.getElementById('date');
 const temperature= document.getElementById('temp');
 const content= document.getElementById('content');

// Base URL and API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'a48d46f72a4bf915f132379e97170d7b';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// button onclick event

generateButton.addEventListener('click', (event) => {
    zipCode = zipCodeText.value;
    feelings = feelingsText.value;
    getWeatherData(baseURL,zipCode, apiKey).then((data) => {
        postWeather('/addWeatherInfo', { date: newDate, temperature: data.main.temp,user_input: feelings }).then(function(){
            updateUI();
        })
    });
});


// Async function to handle get request  from open weather map api 
const getWeatherData = async (baseURL, zipCode, key) => {
    const res = await fetch(baseURL + zipCode + ',us' + '&APPID=' + key);
    try {
        const weatherData = await res.json();
        console.log(weatherData);
        return weatherData;
    }
    catch (error) {
        console.log('error', error);
    }
};
// Async function to handle post request to the server
const postWeather = async (url = "/", data = {}) => {
    // respond fetching with the object  
    const postRequest = await fetch(url,
        // memoried object
        {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            // Body data type must match "Content-Type" header        
            body: JSON.stringify(data),
        });
    try {
        const newData = await postRequest.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Async function to update GUI from our server  
const updateUI = async () => {
    const request = await fetch('http://localhost:8080/weatherdata');
    try {
        const myData = await request.json();
        date.innerHTML = myData.date;
        temp.innerHTML = myData.temperature;
        content.innerHTML = myData.user_input;
    }
    catch (error) {
        console.log('error', error);
    }
}
