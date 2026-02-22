import React, { useEffect, useState } from "react";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/recipes/?skip=0&limit=8"
        );

        if (!res.ok) throw new Error("Failed to fetch recipes");

        const data = await res.json();

        // ✅ Correct according to your backend
        setRecipes(data.recipes || []);
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="bg-dark text-white vh-100 d-flex justify-content-center align-items-center">
        <h4>Loading recipes...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-dark text-danger vh-100 d-flex justify-content-center align-items-center">
        <h4>{error}</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-dark min-vh-100 py-5">
      <div className="container">
        <h2 className="text-center text-white fw-bold mb-5">
          Premium Recipes
        </h2>

        <div className="row g-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col-lg-3 col-md-6">
              <div className="card bg-black text-white border-0 shadow-lg h-100 premium-card">

                {/* Image */}
                <img
                  src={
                    recipe.image ||
                    "https://images.unsplash.com/photo-1490645935967-10de6ba17061"
                  }
                  className="card-img-top"
                  alt={recipe.title}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                />

                {/* Card Body */}
                <div className="card-body d-flex flex-column">

                  {/* Title */}
                  <h5 className="fw-bold mb-3">
                    {recipe.title}
                  </h5>

                  {/* Rating (static for now) */}
                  <div className="text-warning mb-2">
                    ⭐ 5
                  </div>

                  {/* Time Info */}
                  <div className="small text-secondary mb-3">
                    <div>Prep: {recipe.prep_time} min</div>
                    <div>Cook: {recipe.cook_time} min</div>
                  </div>

                  {/* Button */}
                  <button className="btn btn-warning mt-auto fw-bold">
                    View Recipe
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Styling */}
      <style>
        {`
          .premium-card {
            border-radius: 18px;
            overflow: hidden;
            transition: all 0.3s ease;
            background: #1c1c1c;
          }

          .premium-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(255, 193, 7, 0.3);
          }

          .premium-card img {
            border-top-left-radius: 18px;
            border-top-right-radius: 18px;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
