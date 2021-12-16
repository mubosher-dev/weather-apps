const api = {
    key : "9e97756ebdd39cfb819d829598516935",
    baseurl : "https://api.openweathermap.org/data/2.5/"
};
let m = [];
const search = document.querySelector('.search');
const locations = document.querySelector('.location');
const weather_icon = document.querySelector('.weather-icon');
const weather_info = document.querySelector('.weather-info');
let date = new Date();
let wrapper = document.querySelector('.container');

search.addEventListener('keypress',setQuery);

function setQuery(e){
   if(e.keyCode === 13){
       getResult(search.value);
       e.preventDefault();
       document.querySelector('.main').classList.add('show');
       setTimeout(() => {
            search.value = '';
       }, 100);

   }
}

let items = dateBuilder(date)
function getResult(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => {
        return response.json();
    })
    .then (data => {
        console.log(data);
        getItems(data);
    });
}

function getItems(data){
    locations.innerHTML = `
    <h1>${data.name}, ${data.sys.country}</h1>
    <h4>${items}</h4>
    `;
    weather_info.innerHTML = `
    <h1 class="temp" style="display:inline;">${data.main.temp}</h1><span>&degC;</span>
    <h4>${data.weather[0].main}, wind ${data.wind.speed}</h4>
    `;
    m.push(data.weather[0].main);

    getIcons(m);
}

function dateBuilder(s) {
    let months = ['January', 'Febraury', "March", 'April', 'May', "June", 'July', "August", "September", "October", "November", "December"];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thousday', "Friday", "Saturday"];
    let day = days[s.getDay()];
    let date = s.getDate();
    let month = months[s.getMonth()];
    let year = s.getFullYear();


    return `${day} ${date} ${month} ${year}` ;
}

function getIcons(ms){
    if(ms[0] === "Clouds"){
        wrapper.classList.add('clouds');
        weather_icon.innerHTML = `
        <img class="icon" src="./icon/animated/cloudy-day-1.svg" alt="svg">
        `;
        // ms remove [0]
        ms.shift();
    }
    else if (ms[0] === "Mist"){
        wrapper.classList.add('mist');
        wrapper.classList.remove('clouds');
        weather_icon.innerHTML = `
                <i class="fas fa-fog icon"></i>
        `;
        ms.shift();
    }
    else if(ms[0] === "Sunny"){
        wrapper.classList.add("sunny")
        weather_icon.innerHTML = `
        <img class="icon" src="./icon/animated/day.svg" alt="svg">
        `;
        wrapper.classList.remove("sunny");
        ms.shift();
    }
    else if(ms[0] === "Snow"){
        wrapper.classList.add("snow");

        weather_icon.innerHTML = `
         <img class="icon" src="./icon/animated/snowy-1.svg" alt="svg">
        `;
        wrapper.classList.remove('sunny');
        ms.shift()
    } 
    else{
        weather_icon.innerHTML = `
        <img class="icon" src="./icon/animated/weather-sprite.svg" alt="svg">
        `;
        ms.shift();
        wrapper.classList.remove("clouds");
        wrapper.classList.remove("mist");
        wrapper.classList.remove("snow");
        wrapper.classList.remove("sunny");
    }
}