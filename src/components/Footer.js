import React from 'react';
import './Footer.css';  // Your custom CSS for the footer

function Footer({ isBlurred }) {
  return (
    <footer className={`footer-container-unique ${isBlurred ? 'blurred' : ''}`}>
      <div className="footer-top-unique">
        <div className="footer-contact-info-unique">
          <h4>Adresse</h4>
          <p>Sen Physiotherapie</p>
          <p>Durlacherstr. 1</p> 
          <p>75172 Pforzheim</p>
          <p>Telefon: <a href="tel:072316032819">07231 6032819</a></p>
          <p>Email: <a href="mailto:info@senphysio.de">info@senphysio.de</a></p>
        </div>
        <div className="footer-opening-hours-unique">
          <h4>Öffnungszeiten</h4>
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
            08:00 - 12:00 Uhr, Montag - Freitag
          </p>
          <p><em>Termine nur nach Vereinbarung.</em></p>
        </div>

        <div className="footer-social-unique">
          <h4>Folgen Sie uns</h4>
          <a href="https://www.instagram.com/sen_physio/"><i className="fab fa-instagram"></i></a>
          <a href="https://www.tiktok.com/@sen_physio?_t=8nsY7vWiN29&_r=1" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
        </div>
      </div>
      
      {/* Add this section for Datenschutz and Impressum buttons */}
      <div className="footer-links-unique">
        <a href="/datenschutz">Datenschutz</a>
        <a href="/impressum">Impressum</a>
      </div>

      <div className="footer-bottom-unique">
        <p>&copy; 2024 Sen Physiotherapie. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}

export default Footer;
