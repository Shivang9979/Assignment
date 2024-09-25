// Subject Interface
interface WeatherStation {
    subscribe(observer: Observer): void;
    unsubscribe(observer: Observer): void;
    notifyObservers(): void;
}

// Observer Interface
interface Observer {
    update(weatherData: WeatherData): void;
}

// Weather Data Class
class WeatherData {
    constructor(
        public temperature: number,
        public humidity: number,
        public pressure: number
    ) {}
}

// Concrete Weather Station Class
class ConcreteWeatherStation implements WeatherStation {
    private observers: Observer[] = [];
    private weatherData: WeatherData;

    constructor() {
        this.weatherData = new WeatherData(0, 0, 0);
    }

    // Method to update the weather data and notify observers
    public setWeatherData(temperature: number, humidity: number, pressure: number): void {
        this.weatherData = new WeatherData(temperature, humidity, pressure);
        this.notifyObservers();
    }

    public subscribe(observer: Observer): void {
        this.observers.push(observer);
    }

    public unsubscribe(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    public notifyObservers(): void {
        for (const observer of this.observers) {
            observer.update(this.weatherData);
        }
    }
}

// Concrete Observer Classes
class TemperatureDisplay implements Observer {
    update(weatherData: WeatherData): void {
        console.log(`Temperature Display: ${weatherData.temperature}°C`);
    }
}

class HumidityDisplay implements Observer {
    update(weatherData: WeatherData): void {
        console.log(`Humidity Display: ${weatherData.humidity}%`);
    }
}

class PressureDisplay implements Observer {
    update(weatherData: WeatherData): void {
        console.log(`Pressure Display: ${weatherData.pressure} hPa`);
    }
}

class WeatherLogger implements Observer {
    private logs: string[] = [];

    update(weatherData: WeatherData): void {
        const logEntry = `Logged Data - Temp: ${weatherData.temperature}°C, Humidity: ${weatherData.humidity}%, Pressure: ${weatherData.pressure} hPa`;
        this.logs.push(logEntry);
        console.log(logEntry);
    }

    // Method to get all logs
    getLogs(): string[] {
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
