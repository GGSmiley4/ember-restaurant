import React, { useState } from "react";

function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState([]);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = [];
    if (!values.name.trim()) newErrors.push("Name is required.");
    if (!values.email.trim()) newErrors.push("Email is required.");
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) newErrors.push("Email is not valid.");
    if (!values.message.trim()) newErrors.push("Message is required.");

    setErrors(newErrors);
    if (newErrors.length > 0) {
      setSent(false);
      return;
    }

   
    setSent(true);
    setValues({ name: "", email: "", message: "" });
  };

  return (
    <div className="container">
      <h1 className="page-title">Contact Us</h1>

      <div className="contact-info">
        <div className="step">
          <span className="step-icon">📍</span>
          <h3>Address</h3>
          <p>Downtown</p>
        </div>
        <div className="step">
          <span className="step-icon">📞</span>
          <h3>Phone</h3>
          <p>08 919 353</p>
        </div>
        <div className="step">
          <span className="step-icon">✉️</span>
          <h3>Email</h3>
          <p>ember@gmail.com</p>
        </div>
      </div>

      <form className="card form contact-form" onSubmit={handleSubmit}>
        <h2>Send us a message</h2>

        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Enter your name..."
          value={values.name} onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" placeholder="Enter your email..."
          value={values.email} onChange={handleChange} />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" placeholder="Enter your message..."
          value={values.message} onChange={handleChange} />

        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        {sent && <p className="success">Thank you! Your message has been sent.</p>}

        <button type="submit" className="btn">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
