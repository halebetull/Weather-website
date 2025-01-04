document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city").value.trim();
    const apiKey = "senin-api-anahtarın"; // OpenWeatherMap API anahtarını buraya ekle
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;
  
    if (city === "") {
      showError("Lütfen bir şehir adı girin!");
      return;
    }
  
    showLoading();
  
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Şehir bulunamadı");
        }
        return response.json();
      })
      .then((data) => {
        showWeather(data);
      })
      .catch(() => {
        showError("Maalesef şehir bulunamadı!");
      })
      .finally(() => hideLoading());
  });
  
  function showWeather(data) {
    document.querySelector(".result").classList.remove("hidden");
    document.querySelector(".error").classList.add("hidden");
  
    document.getElementById("city-name").textContent = `📍 ${data.name}`;
    document.getElementById("temperature").textContent = `🌡️ Sıcaklık: ${data.main.temp}°C`;
    document.getElementById("weather-description").textContent = `🌥️ Durum: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `💧 Nem: %${data.main.humidity}`;
    document.getElementById("wind-speed").textContent = `💨 Rüzgar: ${data.wind.speed} m/s`;
  }
  
  function showError(message) {
    document.querySelector(".result").classList.add("hidden");
    const errorDiv = document.querySelector(".error");
    errorDiv.classList.remove("hidden");
    errorDiv.querySelector("p").textContent = message;
  }
  
  function showLoading() {
    document.querySelector(".loading").classList.remove("hidden");
  }
  
  function hideLoading() {
    document.querySelector(".loading").classList.add("hidden");
  }
  