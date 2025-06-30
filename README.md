# Recipe Autocomplete Search (React + Vite)

This project is a simple React application built with Vite that demonstrates an autocomplete search bar for recipes. As you type, it fetches recipe suggestions from the [DummyJSON Recipes API](https://dummyjson.com/docs/recipes) and displays detailed information for the selected recipe.

## Features

- **Autocomplete Search:** Type in the search bar to get live recipe suggestions.
- **Keyboard Navigation:** Use arrow keys to navigate suggestions and Enter to select.
- **Recipe Details:** View detailed info and image for the selected recipe.
- **Caching:** Previously searched queries are cached for faster results.
- **Error Handling:** Graceful handling of loading and error states.

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Run the development server:**

   ```sh
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/App.jsx` – Main app logic and autocomplete UI.
- `src/components/RecipeCard.jsx` – Displays recipe details.
- `src/App.css` & `src/index.css` – Styling.

## API Reference

- [DummyJSON Recipes API](https://dummyjson.com/docs/recipes)

## Customization

You can expand this project by:

- Adding more filters (cuisine, difficulty, etc.)
- Improving UI/UX
- Integrating with a real recipe API

---

Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
