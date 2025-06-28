import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "fb41b1c42ec4ded4cbf13753f63226b1"; // Your API key

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!res.ok) {
        setError("City not found or invalid API key.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setWeather(data);
      setCity("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-600 to-purple-700 flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-10 max-w-md w-full shadow-xl border border-white border-opacity-30">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
          🌤️ Weather Dashboard
        </h1>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="flex-grow rounded-lg px-4 py-3 text-lg font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-75 shadow-md transition"
            onKeyDown={(e) => {
              if (e.key === "Enter") getWeather();
            }}
            disabled={loading}
          />
          <button
            onClick={getWeather}
            disabled={!city.trim() || loading}
            className={`px-6 py-3 rounded-lg text-lg font-bold text-white 
              bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 
              disabled:opacity-50 disabled:cursor-not-allowed 
              transition transform hover:scale-105 active:scale-95 shadow-lg`}
          >
            {loading ? "Loading..." : "Get Weather"}
          </button>
        </div>

        {error && (
          <p
            className="text-red-400 text-center font-semibold mb-6 animate-shake"
            role="alert"
          >
            {error}
          </p>
        )}

        {weather?.main && (
          <div className="bg-white bg-opacity-80 rounded-2xl p-6 shadow-lg text-gray-900 space-y-4 text-center animate-fadeIn">
            <h2 className="text-3xl font-bold">{weather.name}</h2>
            <p className="text-2xl">
              🌡 Temp: <span className="font-semibold">{weather.main.temp}°C</span>
            </p>
            <p className="text-xl">
              💧 Humidity: <span className="font-semibold">{weather.main.humidity}%</span>
            </p>
            <p className="text-xl">
              💨 Wind: <span className="font-semibold">{weather.wind.speed} m/s</span>
            </p>
            <p className="text-xl">
              🌦 Status:{" "}
              <span className="font-semibold capitalize">{weather.weather[0].main}</span>
            </p>
          </div>
        )}
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.4s ease;
        }
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(10px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Weather;
