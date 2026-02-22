import React from "react";
import "../styles/RecipeCard.css";

const RecipeCard = ({ recipe, onView, isFavorite, toggleFavorite }) => {
  const uniqueNumber = recipe.id || Math.random();

  const searchQuery = recipe.title
    .replace(/with/gi, "")
    .replace(/and/gi, "")
    .replace(/,/g, "")
    .trim();

  const imageUrl = `https://loremflickr.com/400/300/${encodeURIComponent(
    searchQuery
  )},food?lock=${uniqueNumber}`;

  // Cooking time badge
  const time = recipe.total_time || 0;
  let timeColor = "🟢";
  if (time > 60) timeColor = "🔴";
  else if (time > 30) timeColor = "🟡";

  // Smart tags (first 3 words)
  const tags = recipe.title.split(" ").slice(0, 3);

  return (
    <div className="recipe-card">
      <div className="recipe-image">
        <img
          src={imageUrl}
          alt={recipe.title}
          loading="lazy"
          onError={(e) =>
            (e.target.src = `https://loremflickr.com/400/300/dessert?lock=${uniqueNumber}`)
          }
        />
        <span
          className="favorite-icon"
          onClick={() => toggleFavorite(recipe.id)}
        >
          {isFavorite ? "❤️" : "🤍"}
        </span>
      </div>

      <h3 className="recipe-main-title">{recipe.title}</h3>

      <div className="recipe-tags">
        {tags.map((t, i) => (
          <span key={i} className="tag">
            {t}
          </span>
        ))}
      </div>

      <p className="recipe-meta">
        ⭐ {recipe.rating} • ⏱ {timeColor} {time} min
      </p>

      <button className="recipe-btn" onClick={onView}>
        View Details
      </button>
    </div>
  );
};

export default RecipeCard;