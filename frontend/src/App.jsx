import React, { useState, useEffect } from "react";
import RecipeList from "./components/RecipeList";
import "./styles/App.css";        // correct path
import "./styles/global.css";     // global styles
import "./styles/animations.css";  // animations

function App() {
  // Dark/light mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || true
  );

  // Apply body class and save preference
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="main-title">RecipeHub 🧑‍🍳</h1>
        <button
          className="mode-toggle-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* Recipe List */}
      <RecipeList />
    </div>
  );
}

export default App;