// In Kontakt.js
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Kontaktformular from "../components/Kontaktformular";
import './Kontakt.css';
import { Helmet } from 'react-helmet';

function Kontakt({ cookiesAccepted, cookiePreferences, setCookiePreferences }) {
  const [googleMapsEnabled, setGoogleMapsEnabled] = useState(true);
  const [recaptchaEnabled, setRecaptchaEnabled] = useState(true);

  // This will control the blur effect
  const [isBlurred, setIsBlurred] = useState(!cookiesAccepted);

  // Update isBlurred when cookiesAccepted changes
  useEffect(() => {
    setIsBlurred(!cookiesAccepted);
  }, [cookiesAccepted]);

  useEffect(() => {
    if (cookiePreferences) {
      setGoogleMapsEnabled(cookiePreferences.googleMaps);
      setRecaptchaEnabled(cookiePreferences.googleRecaptcha);
    }
  }, [cookiePreferences]); 

  // Function to enable Google Maps by updating cookie preferences
  const handleEnableGoogleMaps = () => {
    const updatedPreferences = {
      ...cookiePreferences,
      googleMaps: true
    };
    setCookiePreferences(updatedPreferences);  // Update the cookies via props or state management
    setGoogleMapsEnabled(true);  // Update local state
  };

  return (
    <>
      <Helmet>
        <title>Kontakt | Sen Physiotherapie</title>
      </Helmet>
      <Navbar isBlurred={isBlurred} /> {/* Pass isBlurred to Navbar */}

      <div className={`kp-kontakt-container ${isBlurred ? 'blurred' : ''}`}> {/* Apply blur class */}
        <h2 className="kp-info-title">Kontakt</h2>

        <button 
          className="kp-whatsapp-button" 
          onClick={() => window.open('https://wa.me/4972316032819', '_blank')}
        >
          <i className="fab fa-whatsapp"></i> WhatsApp Chat starten
        </button>

        <button 
          className="kp-call-button" 
          onClick={() => window.location.href='tel:072316032819'}
        >
          <i className="fas fa-phone"></i> Jetzt anrufen
        </button>

        <a 
          href="mailto:info@senphysio.de" 
          className="kp-email-button"
        >
          <i className="fas fa-envelope"></i> E-Mail senden
        </a>

        {/* Pass the recaptchaEnabled state to Kontaktformular */}
        <Kontaktformular googleRecaptchaEnabled={recaptchaEnabled} /> {/* Pass it as a prop */}

        <h2 className="kp-info-title">Öffnungszeiten</h2>

        <p className="kp-info-text">
          <p>
          <strong>Montag - Donnerstag:</strong> <br />
          08:00 - 18:00 Uhr <br />
          </p>

          <p>
          <strong>Freitag:</strong> <br />
          08:00 - 14:00 Uhr <br />
          </p>

          <p>
          <strong>Sprechzeiten:</strong> <br />
          08:00 - 12:00 Uhr, Montag - Freitag <br />
          </p>
          <p><em>Termine nur nach Vereinbarung.</em></p>
        </p>
        

        <div className="kp-map-container">
          {googleMapsEnabled ? (
            <iframe
              title="Praxis Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.2127280197897!2d8.693781099999999!3d48.8922829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479773f2bbed0329%3A0xc3d8ed955ee445cb!2sSen%20Physiotherapie!5e0!3m2!1sde!2sde!4v1725100023930!5m2!1sde!2sde"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          ) : (
            <div className="kp-maps-disabled">
              <p className="kp-maps-disabled-text">
                Google Maps wurde deaktiviert. Bitte aktivieren Sie die Cookies, um die Karte anzuzeigen.
              </p>
              <button className="kp-enable-maps-button" onClick={handleEnableGoogleMaps}>
                Google Maps aktivieren
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer className="kp-footer" isBlurred={isBlurred}/>
    </>
  );
}

export default Kontakt;
