import React, { useState } from "react";
import "../styles/RecipeModal.css";

const RecipeModal = ({ recipe, onClose }) => {
  const [showNutrition, setShowNutrition] = useState(false);

  if (!recipe) return null;

  // Clean calories
  const cleanCalories =
    recipe.nutrients?.calories?.toString().replace(/kcal/gi, "").trim() || "";

  // Clean servings
  const servings =
    recipe.serves?.toString().replace(/servings?/i, "").trim() || "N/A";

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Close button */}
        <button className="close-btn" onClick={onClose}>✕</button>

        {/* Title (only once) */}
        <h2 className="modal-title">{recipe.title}</h2>

        {/* Show cuisine only if it's meaningful and not same as title */}
        {recipe.cuisine &&
          recipe.cuisine.toLowerCase() !== recipe.title.toLowerCase() && (
            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
          )}

        {/* Recipe meta */}
        <p>
          ⭐ {recipe.rating || "N/A"} • ⏱ {recipe.total_time || "N/A"} min • 🍽 {servings} servings
        </p>

        {/* Nutritional info */}
        {recipe.nutrients && (
          <>
            <button
              className="nutrition-btn"
              onClick={() => setShowNutrition(!showNutrition)}
            >
              {showNutrition ? "Hide Nutritional Info ▲" : "Show Nutritional Info ▼"}
            </button>

            {showNutrition && (
              <div className="nutrition-details">
                {cleanCalories && <p>Calories: {cleanCalories} kcal</p>}
                {recipe.nutrients.carbs && <p>Carbs: {recipe.nutrients.carbs} g</p>}
                {recipe.nutrients.protein && <p>Protein: {recipe.nutrients.protein} g</p>}
                {recipe.nutrients.fat && <p>Fat: {recipe.nutrients.fat} g</p>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;