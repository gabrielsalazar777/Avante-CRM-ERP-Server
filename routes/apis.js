const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/weather", (req, res) => {
  axios
    .get(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_KEY}&q=Miami&days=3&aqi=no&alerts=no`
    )
    .then((response) => {
      let forecastData = response.data.forecast.forecastday;
      let forecast = [];
      const days = ["Today", "Tomorrow", "2 Days"];

      forecastData.forEach((d, i) => {
        forecast.push({
          day: days[i],
          rain: d.day.daily_chance_of_rain,
          condition: d.day.condition.text,
          icon: d.day.condition.icon,
        });
      });

      res.json(forecast);
    });
});

module.exports = router;
