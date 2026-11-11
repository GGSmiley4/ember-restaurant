import React, { useState } from "react";
import menu from "../data/menu";
import DishCard from "../components/DishCard";

const categories = ["All", "Burgers", "Drinks", "Desserts"];

function Menu(props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");


  const searched = menu.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  );

 
  const results = searched.filter(
    (dish) => category === "All" || dish.category === category
  );

  return (
    <div className="container">
      <h1 className="page-title">Our Menu</h1>

      <input
        type="text"
        className="search"
        placeholder="🔍 Search for a dish..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={category === cat ? "filter-btn active" : "filter-btn"}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="empty">No dishes found. Try another search.</p>
      ) : (
        <div className="dish-grid">
          {results.map((dish) => (
            <DishCard key={dish.id} dish={dish} addToCart={props.addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
