import { useEffect, useRef, useState } from "react";
import "./App.css";
import RecipeCard from "./components/RecipeCard";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!input) {
      setRecipes([]);
      setError("");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [input]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
        setSelectedIdx(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchData = async () => {
    if (cache[input]) {
      setRecipes(cache[input]);
      setLoading(false);
      return;
    }
    try {
      const data = await fetch(
        "https://dummyjson.com/recipes/search?q=" + input
      );
      const jsonData = await data.json();
      setRecipes(jsonData?.recipes || []);
      setCache((prevCache) => ({
        ...prevCache,
        [input]: jsonData?.recipes || [],
      }));
      setError(jsonData?.recipes?.length === 0 ? "No recipes found." : "");
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setError("Failed to fetch recipes.");
      setRecipes([]);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setShowDropdown(true);
    setSelectedIdx(-1);
    setSelectedRecipe(null);
  };

  const handleResultClick = (recipe) => {
    setInput(recipe.name);
    setShowDropdown(false);
    setSelectedRecipe(recipe);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || recipes.length === 0) return;
    if (e.key === "ArrowDown") {
      setSelectedIdx((prev) => (prev + 1) % recipes.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIdx((prev) => (prev - 1 + recipes.length) % recipes.length);
    } else if (e.key === "Enter" && selectedIdx >= 0) {
      handleResultClick(recipes[selectedIdx]);
    }
  };

  return (
    <div className="autocomplete-container">
      <h1 className="title">Recipe Autocomplete Search</h1>
      <div className="search-wrapper" ref={wrapperRef}>
        <input
          type="text"
          className="search-bar"
          placeholder="Search for recipes..."
          value={input}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        {showDropdown && (
          <div className="search-results">
            {loading ? (
              <div className="result loading">Loading...</div>
            ) : error ? (
              <div className="result error">{error}</div>
            ) : recipes.length === 0 && input ? (
              <div className="result">No recipes found.</div>
            ) : (
              recipes.map((recipe, idx) => (
                <span
                  className={`result${idx === selectedIdx ? " selected" : ""}`}
                  key={recipe.id}
                  onMouseDown={() => handleResultClick(recipe)}
                >
                  {recipe.name}
                </span>
              ))
            )}
          </div>
        )}
      </div>
      {selectedRecipe && (
        <div className="recipes-grid">
          <RecipeCard recipe={selectedRecipe} />
        </div>
      )}
    </div>
  );
}

export default App;
