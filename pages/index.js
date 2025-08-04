import { useEffect, useState } from "react";
import Weather from "@/components/Weather";
import Stopwatch from "@/components/Stopwatch";
import Timer from "@/components/Timer";
import Alarm from "@/components/Alarm";

export default function Home() {
  const [orientation, setOrientation] = useState("");

  useEffect(() => {
    const handleOrientation = () => {
      const { orientation } = window.screen;
      const angle = orientation?.angle ?? window.orientation;

      if (angle === 0) {
        setOrientation("portrait");
      } else if (angle === 90) {
        setOrientation("landscape-right");
      } else if (angle === 180) {
        setOrientation("portrait-upside-down");
      } else if (angle === -90) {
        setOrientation("landscape-left");
      } else {
        setOrientation("unknown");
      }
    };

    handleOrientation(); // Initial check
    window.addEventListener("orientationchange", handleOrientation);
    return () =>
      window.removeEventListener("orientationchange", handleOrientation);
  }, []);

  const orientationContent = {
    portrait: (
      <div style={cardStyle}>
        <h2 style={cardTitle}>⏰ Alarm</h2>
        <Alarm />
      </div>
    ),
    "landscape-right": (
      <div style={cardStyle}>
        <h2 style={cardTitle}>⏳ Timer</h2>
        <Timer />
      </div>
    ),
    "landscape-left": (
      <div style={cardStyle}>
        <h2 style={cardTitle}>🌤️ Weather</h2>
        <Weather />
      </div>
    ),
    "portrait-upside-down": (
      <div style={cardStyle}>
        <h2 style={cardTitle}>⏱️ Stopwatch</h2>
        <Stopwatch />
      </div>
    ),
  };

  return (
    <>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom right, #1e3c72, #2a5298)",
          fontFamily: "'Segoe UI', sans-serif",
          color: "#f1f1f1",
          textAlign: "center",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          overflowY: "auto", // Scrollbar enabled
        }}
      >
        <h1 style={{ fontSize: "2.6rem", marginBottom: "1rem" }}>
          📱 Orientation-based Utility App
        </h1>

        <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
          {orientation
            ? `Current orientation: ${orientation.replace(/-/g, " ")}`
            : "Rotate your device to trigger orientation-based features."}
        </p>

        {orientationContent[orientation] || (
          <div style={symbolBoxStyle}>
            <span style={symbolStyle}>🤷‍♂️</span>
            <p style={{ fontSize: "1.2rem" }}>
              Unknown orientation. Please rotate your device.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

const cardStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  padding: "1.5rem",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  backdropFilter: "blur(8px)",
  color: "#fff",
  transition: "transform 0.2s ease",
  width: "90%",
  maxWidth: "500px",
  margin: "auto",
};

const cardTitle = {
  fontSize: "1.6rem",
  color: "#f0f0f0",
  marginBottom: "1rem",
};

const symbolBoxStyle = {
  fontSize: "5rem",
  color: "#fff",
  marginBottom: "1.5rem",
};

const symbolStyle = {
  display: "block",
  fontSize: "6rem",
  marginBottom: "0.5rem",
};
