import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UeberUns from './pages/UeberUns'; 
import Galerie from './pages/Galerie'; 
import Kontakt from './pages/Kontakt'; 
import Impressum from './pages/Impressum'; 
import Datenschutz from './pages/Datenschutz'; 
import ScrollToTop from './components/ScrollToTop';
import CookieBanner from './components/CookieBanner'; 
import './components/CookieBanner.css'; 
import './App.css'; 

function App() {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [isCookieBannerVisible, setCookieBannerVisible] = useState(true);
  const [cookiePreferences, setCookiePreferences] = useState({});

  // Function to check cookie preferences and update states accordingly
  const checkCookiePreferences = () => {
    const savedPreferences = localStorage.getItem('cookie-preferences');
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      setCookiePreferences(preferences);
      setCookiesAccepted(true);
      setCookieBannerVisible(false);
    } else {
      setCookiesAccepted(false);
      setCookieBannerVisible(true);
    }
  };

  // Load cookie preferences from localStorage on initial render
  useEffect(() => {
    checkCookiePreferences(); // Check preferences when component mounts

    // Listen for storage events
    const handleStorageChange = (event) => {
      if (event.key === 'cookie-preferences') {
        checkCookiePreferences(); // Check preferences when localStorage changes
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Run once when the component mounts

  // Save cookie preferences to localStorage whenever they change
  useEffect(() => {
    if (cookiesAccepted) {
      localStorage.setItem('cookie-preferences', JSON.stringify(cookiePreferences));
    }
  }, [cookiePreferences, cookiesAccepted]);

  // Function to save preferences and hide the banner
  const handleSavePreferences = (preferences) => {
    setCookiePreferences(preferences); // Save cookie preferences in state
    setCookiesAccepted(true);
    setCookieBannerVisible(false);
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences)); // Save preferences in localStorage
  };

  return (
    <Router>
      <ScrollToTop /> 
     
      <Routes>
        <Route path="/" element={<Home cookiesAccepted={cookiesAccepted} />} />
       
        <Route path="/ueber-uns" element={<UeberUns cookiesAccepted={cookiesAccepted} />} />
        <Route path="/galerie" element={<Galerie cookiesAccepted={cookiesAccepted} />} />
        
        <Route path="/kontakt" element={
                <Kontakt 
                    cookiesAccepted={cookiesAccepted}
                    cookiePreferences={cookiePreferences} 
                    setCookiePreferences={setCookiePreferences} 
                />
              } 
        />
        
        <Route path="/impressum" element={<Impressum cookiesAccepted={cookiesAccepted}/>} />
        <Route path="/datenschutz" element={<Datenschutz cookiesAccepted={cookiesAccepted} setCookiesAccepted={setCookiesAccepted} setCookieBannerVisible={setCookieBannerVisible} />} />
      </Routes>

      {isCookieBannerVisible && <CookieBanner onSavePreferences={handleSavePreferences} />}
    </Router>
  );
}

export default App;
