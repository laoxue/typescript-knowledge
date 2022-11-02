const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

// 设置时间

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const moths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jil', "Aug", "Sep", "Oct", "Nov", "Dec"];
const API_KEY = '';

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';

  timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes + '' + `<span class="am-pm">${ampm}</spoan>`;
  dateEl.innerHTML = days[day] + ', ' + date + '' + moths[month];
}, 1000);


getWeatherData();
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);

    let { latitude, longitude } = success.coords;
    console.log(latitude, longitude)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
      .then(res => res.json()).then(data => {
        const { list } = data;
        const items = list.filter((item, index) => {
          if (index === 5) {
            return item;
          } else {
            return index % 8 == 0;
          }
        })
      })
  })
}
