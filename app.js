const usertab = document.querySelector("[data-userWeather]");
const searchtab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector('.weather-container');

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let oldTab = usertab;
const API_KEY ="7dfe7ae6235db69cc312d18627659b6a";
oldTab.classList.add("current-tab");
getfromSessionStorage();  //this function runs when the page loads.


function getfromSessionStorage(){
    //now this this line tells , did i already saved the user lat and lon?
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        //if it doesn't know your coordinates then it will show "Grant Location Access"
        grantAccessContainer.classList.add('active');
    }else{
        //if it conatins your location then JSON.parse() converts the string into an object 
        const coordinates = JSON.parse(localCoordinates);
        //then this is called to start the weather api request
        fetchUserWeatherInfo(coordinates);
    }
}


function switchTab(newTab){
    if(newTab!=oldTab){
        oldTab.classList.remove("current-tab");
        oldTab=newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");

            getfromSessionStorage();
        }
    }
}


usertab.addEventListener("click" , () =>{
    switchTab(usertab);
});

searchtab.addEventListener("click", () =>{
    switchTab(searchtab);
});



const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

//whenever the user click grant access location so this function will run

function getLocation(){
    if(navigator.geolocation){
        //ask for location
        //if the user press allow, then the brower automatically calls the showPosition
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        alert("Geolocation is not supported by your browser.");
    }
}

function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude, 
        lon: position.coords.longitude
    }

    //now save the coordinates in sessionStorage
    //this is bcz , when u refresh the page again it won't ask your location again
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    //
    fetchUserWeatherInfo(userCoordinates);
} 



async function fetchUserWeatherInfo(coordinates) {
    const {lat,lon} = coordinates;
    //hide grant access bcz user already allowed location
    grantAccessContainer.classList.remove("active");
    //the api take some time to respond o, instead of showing black screen, using loading effect
    loadingScreen.classList.add("active");

    //API call

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        //here reponse.json() readss the response body and covert the JSON into java script object
        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);


        } catch (error) {
        loadingScreen.classList.remove("active");
        alert("Unable to fetch data. Please try again.");
        console.log(error);
    }
}

function renderWeatherInfo(weatherInfo){
            //now here weatherInfo conatins the complete api response
    
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}



const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => { 
    e.preventDefault();

    let cityName = searchInput.value;

    if(cityName==="")
        return;
    else
        fetchSearchWeatherInfo(cityName);
});


const errorContainer = document.querySelector(".error-container");



async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
       
        if(data.cod==404){
            errorContainer.classList.add("active");
            document.querySelector("[data-err]").innerText = "City not found";
            return;
        }
        userInfoContainer.classList.add("active");
        errorContainer.classList.remove("active");
        renderWeatherInfo(data);
    } catch (error) {
       loadingScreen.classList.remove("active");
       errorContainer.classList.add("active");
    }
} 