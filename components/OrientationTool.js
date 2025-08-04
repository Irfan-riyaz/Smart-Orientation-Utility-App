// orientation-app.js

const views = {
  portrait: document.getElementById("alarm"),
  landscape: document.getElementById("weather"),
  upsidedown: document.getElementById("timer"),
  landscapeLeft: document.getElementById("stopwatch")
};

function hideAllViews() {
  Object.values(views).forEach(view => view.style.display = "none");
}

function showView(name) {
  hideAllViews();
  if (views[name]) {
    views[name].style.display = "block";
  }
}

function getOrientation() {
  const angle = window.orientation || window.screen.orientation?.angle;
  const orientation = window.screen.orientation?.type;
  if (typeof angle === 'number') {
    if (angle === 0) return 'portrait';
    if (angle === 180) return 'upsidedown';
    if (angle === 90) return 'landscape';
    if (angle === -90) return 'landscapeLeft';
  }
  // fallback using type
  if (orientation?.includes('portrait-primary')) return 'portrait';
  if (orientation?.includes('portrait-secondary')) return 'upsidedown';
  if (orientation?.includes('landscape-primary')) return 'landscape';
  if (orientation?.includes('landscape-secondary')) return 'landscapeLeft';

  // default
  return 'portrait';
}

function handleOrientationChange() {
  const orientation = getOrientation();
  console.log("Detected orientation:", orientation);
  showView(orientation);
}

// Initial load
window.addEventListener("DOMContentLoaded", handleOrientationChange);

// Listen to changes
window.addEventListener("orientationchange", handleOrientationChange);
window.addEventListener("resize", handleOrientationChange);

// Touch screen fallback
window.addEventListener("deviceorientation", handleOrientationChange);
