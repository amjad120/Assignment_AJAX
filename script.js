const CityInput = document.getElementById("CityInput");
const submitBtn = document.getElementById("submitBtn");
const maxtemp_c =document.getElementById("maxtemp_c");
const mintemp_c =document.getElementById("mintemp_c");
const condition =document.getElementById("condition"); 


submitBtn.addEventListener("click", ()=>{
     CityInput.innerHTML = "";
     fetchWeatherAPI(CityInput.value);
})


async function fetchWeatherAPI(city) {
    var url = "http://api.weatherapi.com/v1/forecast.json";
    var apiKey = "c1bbca1b91a84ffab3d160450242410"; 
 var params = `key=${apiKey}&q=${city}&days=1`; 

    if (!city) {
         return;
     }

    var requestOptions = {
         method: 'GET'
       };

    try {
        const response = await fetch(url  +  "?" + params, requestOptions );
         const data = await response.json();
          processWeatherResponse(data);
    } 
    catch (error) {
        console.error("Error fetching the weather data:", error);
    }
}

function processWeatherResponse(data) {
    if (data && data.forecast && data.forecast.forecastday.length > 0) {
        const forecast = data.forecast.forecastday[0].day;

        maxtemp_c.innerText = `Max temperature: ${forecast.maxtemp_c}°C`;
        mintemp_c.innerText = `Min temperature: ${forecast.mintemp_c} °C` ;
        condition.innerText = `Staute: ${forecast.condition.text}`;
    } else {
         console.error("No data available.");
    }
}
