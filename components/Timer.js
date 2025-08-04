import { useEffect, useRef, useState } from "react";

export default function Timer() {
  const [duration, setDuration] = useState(0);
  const [inputMinutes, setInputMinutes] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [isLandscapeRight, setIsLandscapeRight] = useState(false);
  const intervalRef = useRef(null);
  const alarmSoundRef = useRef(null);

  // Format time in MM:SS
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Orientation checker
  useEffect(() => {
    const checkOrientation = () => {
      const orientation = window.screen.orientation?.angle;
      if (orientation === 90) {
        setIsLandscapeRight(true);
      } else {
        setIsLandscapeRight(false);
        setIsRunning(false); // Pause timer if rotated away
      }
    };

    checkOrientation();

    window.addEventListener("orientationchange", checkOrientation);
    return () => window.removeEventListener("orientationchange", checkOrientation);
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0 && isRunning) {
      alarmSoundRef.current?.play();
      setMessage("⏰ Timer Finished!");
      setIsRunning(false);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, remainingTime]);

  const handleStart = () => {
    if (!inputMinutes || isNaN(inputMinutes) || inputMinutes <= 0) {
      setMessage("⚠️ Enter valid minutes");
      return;
    }
    const totalSeconds = parseInt(inputMinutes) * 60;
    setDuration(totalSeconds);
    setRemainingTime(totalSeconds);
    setIsRunning(true);
    setMessage(`✅ Timer started for ${inputMinutes} minute(s)`);
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setMessage("⏸️ Timer Paused");
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setRemainingTime(0);
    setInputMinutes("");
    setMessage("🔁 Timer Reset");
  };

  if (!isLandscapeRight) {
    return (
      <div style={cardStyle}>
        <h2 style={cardTitle}>🔄 Rotate Device</h2>
        <p style={{ fontSize: "1.1rem" }}>
          Please rotate your device to <strong>Landscape Right (90°)</strong> to view the timer.
        </p>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <h2 style={cardTitle}>⏱️ Timer</h2>
      <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
        📅 {new Date().toDateString()}
      </p>
      <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        {formatTime(remainingTime)}
      </p>

      <input
        type="number"
        min="1"
        placeholder="Enter minutes"
        value={inputMinutes}
        onChange={(e) => setInputMinutes(e.target.value)}
        style={inputStyle}
        disabled={isRunning}
      />

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleStart} style={buttonStyle}>
          ▶️ Start
        </button>
        <button onClick={handlePause} style={{ ...buttonStyle, backgroundColor: "#ff9800" }}>
          ⏸️ Pause
        </button>
        <button onClick={handleReset} style={{ ...buttonStyle, backgroundColor: "#f44336" }}>
          🔁 Reset
        </button>
      </div>

      <p style={{ marginTop: "1rem" }}>{message}</p>
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
  width: "calc(100% - 2rem)",
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer",
  margin: "0.5rem 0.5rem 0 0",
};
