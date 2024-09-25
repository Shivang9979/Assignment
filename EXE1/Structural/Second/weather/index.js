"use strict";
// Weather Data Class
class WeatherData {
    constructor(temperature, humidity, pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
    }
}
// Concrete Weather Station Class
class ConcreteWeatherStation {
    constructor() {
        this.observers = [];
        this.weatherData = new WeatherData(0, 0, 0);
    }
    // Method to update the weather data and notify observers
    setWeatherData(temperature, humidity, pressure) {
        this.weatherData = new WeatherData(temperature, humidity, pressure);
        this.notifyObservers();
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    notifyObservers() {
        for (const observer of this.observers) {
            observer.update(this.weatherData);
        }
    }
}
// Concrete Observer Classes
class TemperatureDisplay {
    update(weatherData) {
        console.log(`Temperature Display: ${weatherData.temperature}°C`);
    }
}
class HumidityDisplay {
    update(weatherData) {
        console.log(`Humidity Display: ${weatherData.humidity}%`);
    }
}
class PressureDisplay {
    update(weatherData) {
        console.log(`Pressure Display: ${weatherData.pressure} hPa`);
    }
}
class WeatherLogger {
    constructor() {
        this.logs = [];
    }
    update(weatherData) {
        const logEntry = `Logged Data - Temp: ${weatherData.temperature}°C, Humidity: ${weatherData.humidity}%, Pressure: ${weatherData.pressure} hPa`;
        this.logs.push(logEntry);
        console.log(logEntry);
    }
    // Method to get all logs
    getLogs() {
        return this.logs;
    }
}
// Client Code
function main() {
    const weatherStation = new ConcreteWeatherStation();
    const temperatureDisplay = new TemperatureDisplay();
    const humidityDisplay = new HumidityDisplay();
    const pressureDisplay = new PressureDisplay();
    const weatherLogger = new WeatherLogger();
    // Subscribe displays and logger to weather station
    weatherStation.subscribe(temperatureDisplay);
    weatherStation.subscribe(humidityDisplay);
    weatherStation.subscribe(pressureDisplay);
    weatherStation.subscribe(weatherLogger);
    // Simulate weather data updates
    weatherStation.setWeatherData(25, 60, 1013); // Initial weather update
    weatherStation.setWeatherData(27, 65, 1010); // Second update
    weatherStation.setWeatherData(22, 70, 1008); // Third update
    // Unsubscribe humidity display
    weatherStation.unsubscribe(humidityDisplay);
    // Another weather update after unsubscription
    weatherStation.setWeatherData(20, 75, 1005); // Final update
}
// Run the client code
main();
