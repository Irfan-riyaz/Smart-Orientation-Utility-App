import { useEffect, useRef, useState } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0); // milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const alarmSoundRef = useRef(null);
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    const seconds = Math.floor(time / 1000);

    // 🔔 Play alarm sound at 10 seconds
    if (seconds === 10 && !hasAlerted.current) {
      alarmSoundRef.current?.play();
      hasAlerted.current = true;
    }
  }, [time]);

  const handleStart = () => {
    setIsRunning(true);
    hasAlerted.current = false;
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
    hasAlerted.current = false;
  };

  const handleReset = () => {
    setTime(0);
    hasAlerted.current = false;
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}:${centiseconds}`;
  };

  return (
    <div style={cardStyle}>
      <h2 style={cardTitle}>⏱️ Stopwatch</h2>
      <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
        📅 {new Date().toLocaleDateString()}
      </p>
      <p style={{ fontSize: "2rem", margin: "1rem 0" }}>{formatTime(time)}</p>

      <div>
        <button onClick={handleStart} style={{ ...buttonStyle, backgroundColor: "#4CAF50" }}>
          Start
        </button>
        <button onClick={handlePause} style={{ ...buttonStyle, backgroundColor: "#FF9800" }}>
          Pause
        </button>
        <button onClick={handleStop} style={{ ...buttonStyle, backgroundColor: "#F44336" }}>
          Stop
        </button>
        <button onClick={handleReset} style={{ ...buttonStyle, backgroundColor: "#2196F3" }}>
          Reset
        </button>
      </div>

      <audio ref={alarmSoundRef} src="/alarm.mp3" preload="auto" />
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

const buttonStyle = {
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "none",
  color: "white",
  margin: "0.5rem",
  cursor: "pointer",
};
