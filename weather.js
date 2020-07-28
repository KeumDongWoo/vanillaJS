const weather = document.querySelector('.js-weather');

const COORDS = 'coords';
const api_key = '08f0d99a8e5b0451d8b2f89969173057';

function getWeather(lat,lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`
    )
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = json.main.temp;
        const placed = json.name;
        weather.innerText = `${temperature} @ ${placed}`;
    }); 
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const coordsObj = {
        lat,
        long
    }

    saveCoords(coordsObj);
    getWeather(lat,long);
}

function handleGeoError(){
    console.log("ERROR!!!!");
}

function askForCords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCords();
    }else{
        const parserCoords = JSON.parse(loadedCords);
        getWeather(parserCoords.lat,parserCoords.long);
    }
}

function init(){
    loadCoords()
}

init();