import React, { useState } from 'react';
import './CookieBanner.css';

function CookieBanner({ onSavePreferences }) {
  const [googleMaps, setGoogleMaps] = useState(true);
  const [googleRecaptcha, setGoogleRecaptcha] = useState(true);

  // Handle click event to save preferences
  const handleSavePreferencesClick = () => {
    onSavePreferences({ googleMaps, googleRecaptcha }); // Pass the preferences to parent (App.js)
  };

  return (
    <div className="cookie-banner">
      <h3>Cookie-Einstellungen</h3>
      <p>Wir verwenden Cookies, um Ihre Benutzererfahrung zu verbessern. Bitte wählen Sie aus, welche Cookies wir verwenden dürfen:</p>
      
      <label>
        <input 
          type="checkbox" 
          checked={googleMaps} 
          onChange={() => setGoogleMaps(!googleMaps)} 
        />
        Google Maps
      </label>
      <br />
      <label>
        <input 
          type="checkbox" 
          checked={googleRecaptcha} 
          onChange={() => setGoogleRecaptcha(!googleRecaptcha)} 
        />
        Google reCAPTCHA
      </label>
      <br />
      <button type="button" onClick={handleSavePreferencesClick}>Einstellungen speichern</button>
      <p>Sie können Ihre Einstellungen jederzeit in der Datenschutzerklärung ändern.</p>
    </div>
  );
}

export default CookieBanner;
