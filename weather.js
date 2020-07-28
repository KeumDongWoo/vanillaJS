const COORDS = 'coords';


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
}

function handleGeoError(){
    console.log("ERROR!!!!");
}

function askForCords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function init(){
    askForCords()
}

init();