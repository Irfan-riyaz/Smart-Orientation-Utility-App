import { useEffect, useRef, useState } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [orientation, setOrientation] = useState(getOrientation());
  const intervalRef = useRef(null);
  const alarmSoundRef = useRef(null);
  const hasAlerted = useRef(false);

  function getOrientation() {
    return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  }

  useEffect(() => {
    const handleResize = () => {
      setOrientation(getOrientation());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const isLandscape = orientation === "landscape";

  return (
    <div
      style={{
        ...cardStyle,
        flexDirection: isLandscape ? "row" : "column",
        overflow: "auto",          // <- Scrollbar added
        maxHeight: "100vh",        // <- Ensure scroll triggers if needed
      }}
    >
      <div style={{ flex: 1, textAlign: "center" }}>
        <h2 style={cardTitle}>⏱️ Stopwatch</h2>
        <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          📅 {new Date().toLocaleDateString()}
        </p>
        <p style={{ fontSize: "2.5rem", margin: "1rem 0" }}>{formatTime(time)}</p>
      </div>

      <div style={{ flex: 1, textAlign: "center" }}>
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255, 255, 255, 0.1)",
  padding: "1.5rem",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  backdropFilter: "blur(8px)",
  color: "#fff",
  width: "90%",
  maxWidth: "600px",
  margin: "2rem auto",
  textAlign: "center",
  flexDirection: "column",
};

const cardTitle = {
  fontSize: "1.6rem",
  marginBottom: "0.5rem",
};

const buttonStyle = {
  padding: "0.6rem 1.2rem",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "none",
  color: "white",
  margin: "0.5rem",
  cursor: "pointer",
};
