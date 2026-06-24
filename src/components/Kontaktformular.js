// In Kontaktformular.js
import React, { useState } from "react";
import loadable from "@loadable/component";
import './Kontaktformular.css'; // Optional: if you have custom CSS for styling

// Dynamically load ReCAPTCHA component
const ReCAPTCHA = loadable(() => import("react-google-recaptcha"));

function Kontaktformular({ googleRecaptchaEnabled }) { // Accept the prop here
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefon: "",
    nachricht: "",
    honeypot: "" // Invisible honeypot field
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the honeypot field is filled, reject form submission if it is
    if (formData.honeypot) {
      setFormStatus("Spamverdacht: Nachricht wurde nicht gesendet.");
      return;
    }

    // If reCAPTCHA is enabled but not completed, return error
    if (googleRecaptchaEnabled && !recaptchaValue) {
      setFormStatus("Bitte lösen Sie das reCAPTCHA.");
      return;
    }

    try {
      const response = await fetch("/.netlify/functions/sendMail", {
        method: "POST",
        body: JSON.stringify({ ...formData, recaptchaValue }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setFormStatus("Nachricht erfolgreich gesendet!");
      } else {
        setFormStatus("Fehler beim Senden der Nachricht.");
      }
    } catch (error) {
      setFormStatus("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <div className="kontaktformular-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="labelText" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="labelText" htmlFor="email">E-Mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="labelText" htmlFor="telefon">Telefon:</label>
          <input
            type="tel"
            id="telefon"
            name="telefon"
            value={formData.telefon}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="labelText" htmlFor="nachricht">Nachricht:</label>
          <textarea
            id="nachricht"
            name="nachricht"
            value={formData.nachricht}
            onChange={handleChange}
            required
          />
        </div>

        {/* Invisible honeypot field for spam detection */}
        <div className="honeypot-field">
          <label htmlFor="honeypot" style={{ display: "none" }}>Honeypot:</label>
          <input
            type="text"
            id="honeypot"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Conditionally render the reCAPTCHA based on the passed prop */}
        {googleRecaptchaEnabled && (
          <div className="form-group">
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} 
              onChange={setRecaptchaValue}
            />
          </div>
        )}

        <button type="submit">Nachricht senden</button>
        <p>{formStatus}</p>
      </form>
    </div>
  );
}

export default Kontaktformular;
