import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import Pagination from "./Pagination";
import "../styles/global.css";
import "../styles/App.css";
import "../styles/SearchBar.css";
import "../styles/RecipeCard.css";
import "../styles/Pagination.css";
import "../styles/RecipeModal.css";
import "../styles/animations.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [favorites, setFavorites] = useState([]); // NEW: track favorite recipe IDs

  const limit = 8; // recipes per page

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/recipes/?skip=${skip}&limit=${limit}`
        );
        const data = await res.json();
        setRecipes(data.recipes || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, [skip]);

  // Suggestions
  useEffect(() => {
    if (!search) {
      setSuggestions([]);
      return;
    }
    const filtered = recipes
      .filter((r) => r.title.toLowerCase().includes(search.toLowerCase()))
      .map((r) => r.title);
    setSuggestions(filtered);
  }, [search, recipes]);

  const handleSuggestionClick = (title) => {
    setSearch(title);
    setSuggestions([]);
  };

  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  // NEW: toggle favorite
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="recipe-list-container">
      {/* SEARCH BAR */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((title, index) => {
              const regex = new RegExp(`(${search})`, "gi");
              const parts = title.split(regex);
              return (
                <li key={index} onClick={() => handleSuggestionClick(title)}>
                  {parts.map((part, i) =>
                    part.toLowerCase() === search.toLowerCase() ? (
                      <span key={i} className="highlight">{part}</span>
                    ) : (
                      part
                    )
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* RECIPE GRID */}
      <div className="grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onView={() => setSelectedRecipe(recipe)}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(recipe.id)} // pass state
          />
        ))}
      </div>

      {/* PAGINATION */}
      <Pagination skip={skip} setSkip={setSkip} limit={limit} total={total} />

      {/* MODAL */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

export default RecipeList;