import { useEffect, useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // 🔁 Replace with your real API key

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeather({
              temp: Math.round(data.main.temp),
              description: data.weather[0].description,
              location: data.name,
              icon: data.weather[0].icon,
            });
          })
          .catch(() => setError("Failed to fetch weather data."));
      },
      () => setError("Location access denied.")
    );
  }, []);

  return (
    <div style={cardStyle}>
      <h2 style={cardTitle}>🌤️ Weather</h2>
      <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
        📅 {new Date().toLocaleDateString()}
      </p>

      {error && <p>{error}</p>}

      {weather ? (
        <>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather icon"
            style={{ width: "80px", marginBottom: "0.5rem" }}
          />
          <p style={{ fontSize: "2rem" }}>{weather.temp}°C</p>
          <p style={{ textTransform: "capitalize" }}>{weather.description}</p>
          <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>
            📍 {weather.location}
          </p>
        </>
      ) : (
        !error && <p>Loading weather...</p>
      )}
    </div>
  );
}

const cardStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  padding: "1.5rem",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  backdropFilter: "blur(8px)",
  color: "#fff",
  width: "90%",
  maxWidth: "500px",
  margin: "auto",
  textAlign: "center",
};

const cardTitle = {
  fontSize: "1.6rem",
  marginBottom: "0.5rem",
};
