import { useEffect, useState, useRef } from "react";

export default function Alarm() {
  const [currentTime, setCurrentTime] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [message, setMessage] = useState("");
  const alarmSoundRef = useRef(null);
  const hasRungRef = useRef(false); // Prevents multiple rings per second

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const formattedTime = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setCurrentTime(formattedTime);

      const formattedAlarm = `${alarmTime}:00`;

      if (alarmTime && formattedTime === formattedAlarm) {
        if (!hasRungRef.current) {
          setMessage("🔔 Alarm Ringing!");
          alarmSoundRef.current?.play();
          hasRungRef.current = true;
        }
      } else {
        hasRungRef.current = false;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [alarmTime]);

  const handleSetAlarm = (e) => {
    e.preventDefault();
    if (alarmTime) {
      setMessage(`✅ Alarm set for ${alarmTime}`);
    }
  };

  return (
    <div style={scrollContainer}>
      <div style={cardStyle}>
        <h2 style={cardTitle}>⏰ Alarm</h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
          📅 {new Date().toDateString()}
        </p>
        <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>{currentTime}</p>

        <form onSubmit={handleSetAlarm}>
          <input
            type="time"
            required
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Set Alarm</button>
        </form>

        <p style={{ marginTop: "1rem" }}>{message}</p>
        <audio ref={alarmSoundRef} src="/alarm.mp3" preload="auto" />
      </div>
    </div>
  );
}

// 🌐 Scroll container style
const scrollContainer = {
  height: "100vh",
  overflowY: "auto",
  backgroundColor: "#121212", // optional dark background
  padding: "2rem 0",
};

// 💳 Card styling
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
};

const cardTitle = {
  fontSize: "1.6rem",
  color: "#f0f0f0",
  marginBottom: "1rem",
};

const inputStyle = {
  padding: "0.5rem",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "none",
  marginRight: "1rem",
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer",
};
