import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const App = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [city, setCity] = useState(""); // State to store the city input
    const apiKey = 'f87d486e4d0d7d8e29b2149c051fa809'; // Replace with your API key

    const fetchWeather = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            );
            setWeather(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (city !== "") {
            fetchWeather();
        }
    }, [city]); // Fetch weather data whenever the city changes

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <div className='container'>
            <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Weather App</h1>
                <input
                    type="text"
                    value={city}
                    onChange={handleInputChange}
                    placeholder="Enter city name"
                    style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px' }}
                />
                {loading && <p>Loading weather...</p>}
                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Error fetching weather: {error.message}</p>}
                {weather && (
                    <div className="weather-info">
                        <h2>Weather in {weather.name}</h2>
                        <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
                        <p>Condition: {weather.weather[0].description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
