import React from "react";

const values = [
  { id: 1, icon: "🥬", title: "Fresh every day", text: "Buns are baked each morning and vegetables come from local farms." },
  { id: 2, icon: "⚡", title: "Fast delivery", text: "Every order is cooked when it comes in and sent straight out." },
  { id: 3, icon: "❤️", title: "Fair prices", text: "Clear prices and no hidden fees." },
];

function About() {
  return (
    <div className="container">
      <h1 className="page-title">About Ember</h1>

      <div className="about">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
          alt="Inside the Ember restaurant"
        />
        <div>
          <h2>Our story</h2>
          <p>
            Ember started as a small weekend food stall with one grill and one
            burger recipe. People kept asking if we could deliver, so we opened
            a kitchen and made this website to make ordering easy.
          </p>
          <p>
            Our menu is short on purpose. We would rather make a few things very
            well than lots of things that are just fine.
          </p>
        </div>
      </div>

      <h2 className="section-title">What we care about</h2>
      <div className="steps">
        {values.map((value) => (
          <div className="step" key={value.id}>
            <span className="step-icon">{value.icon}</span>
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
