import React from "react";
import { Link } from "react-router-dom";
import menu from "../data/menu";
import DishCard from "../components/DishCard";

const steps = [
  { id: 1, icon: "📋", title: "Pick your food", text: "Browse the menu and add dishes to your cart." },
  { id: 2, icon: "📝", title: "Check out", text: "Enter your address and choose cash or card." },
  { id: 3, icon: "🛵", title: "Track it", text: "Watch your order go from our kitchen to your door." },
];

function Home(props) {
  // Show one dish from each category on the home page
  const popular = menu.filter(
    (dish) => dish.id === 1 || dish.id === 3 || dish.id === 6
  );

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Hot food, delivered fast</h1>
          <p>
            Burgers, cold drinks and sweet desserts. Order in a few clicks and
            follow your food from our kitchen to your table.
          </p>
          <Link to="/menu" className="btn btn-big">
            Order Now
          </Link>
        </div>
      </section>

      <section className="container">
        <h2 className="section-title">How it works</h2>
        <div className="steps">
          {steps.map((step) => (
            <div className="step" key={step.id}>
              <span className="step-icon">{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <h2 className="section-title">Popular dishes</h2>
        <div className="dish-grid">
          {popular.map((dish) => (
            <DishCard key={dish.id} dish={dish} addToCart={props.addToCart} />
          ))}
        </div>
        <div className="center">
          <Link to="/menu" className="btn btn-outline">
            See the full menu
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
