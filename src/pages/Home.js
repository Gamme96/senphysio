import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Slideshow from '../components/Slideshow';
import Footer from '../components/Footer';
import './Home.css';
import { Helmet } from 'react-helmet';
import CookieBanner from '../components/CookieBanner';

function Home({ cookiesAccepted, isCookieBannerVisible, onSavePreferences }) {
  const [expandedItem, setExpandedItem] = useState(null);
  const [isBlurred, setIsBlurred] = useState(!cookiesAccepted);

  // Update isBlurred when cookiesAccepted changes
  useEffect(() => {
    setIsBlurred(!cookiesAccepted);
  }, [cookiesAccepted]);

  

  // Array of services
  const services = [ 
    {
      title: 'Krankengymnastik (KG)',
      details: 'Erleben Sie gezielte Übungen zur Verbesserung Ihrer Beweglichkeit und Stärke. Unsere Krankengymnastik hilft Ihnen, Schmerzen zu lindern und Ihre Lebensqualität zu steigern. Starten Sie noch heute Ihre Reise zu mehr Wohlbefinden!',
    },
    {
      title: 'Krankengymnastik Gerätegestützt (KGG)',
      details: 'Nutzen Sie moderne Geräte zur gezielten Muskelstärkung und Rehabilitation. Diese Methode optimiert Ihre Fortschritte und unterstützt Sie auf dem Weg zu mehr Wohlbefinden und Leistungsfähigkeit.',
    },
    {
      title: 'Manuelle Lymphdrainage (MLD)',
      details: 'Lassen Sie sich durch sanfte, therapeutische Techniken bei der Entstauung von Gewebeflüssigkeiten helfen. Unsere manuelle Lymphdrainage fördert Ihre Heilung und verbessert Ihre Lebensqualität.',
    },
    {
      title: 'Physikalische Therapie (Elektro-, Wärme-, Kältetherapie)',
      details: 'Erfahren Sie die Vorteile von modernen physikalischen Therapieformen. Elektro-, Wärme- und Kältetherapien unterstützen Ihre Genesung und tragen zur Schmerzlinderung und Muskulaturregeneration bei.',
    },
    {
      title: 'Schlingentisch - Therapie (Traktionstherapie)',
      details: 'Profitieren Sie von der sanften Zugkraft der Schlingentisch-Therapie, um Verspannungen zu lösen und Schmerzen zu lindern. Diese Therapie fördert Ihre Beweglichkeit und hilft Ihnen, sich besser zu fühlen.',
    },
    {
      title: 'KG-ZNS (nach Bobath)',
      details: 'Die KG nach Bobath fördert durch gezielte Übungsreize physiologische Bewegungsmuster. Ziel ist mehr Selbstständigkeit im Alltag trotz Schädigung im zentralen Nervensystem.',
    },
    {
      title: 'Personal Training zur Gewichtsreduktion oder Leistungssteigerung',
      details: 'Erreichen Sie Ihre Fitnessziele mit individuellem Personal Training. Ob Gewichtsreduktion oder Leistungssteigerung – unser gezieltes Training hilft Ihnen, Ihre Ziele effizient und motiviert zu erreichen.',
    },
  ];

  const toggleItem = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Sen Physiotherapie | Willkommen</title>
      </Helmet>

      {isCookieBannerVisible && (
        <CookieBanner onSavePreferences={onSavePreferences} />
      )}

      {isCookieBannerVisible && <div className="overlay" />} {/* Overlay to block clicks */}

      <Slideshow isBlurred={isBlurred} />
      <Navbar isBlurred={isBlurred} />

      <div className={`layout-container-unique ${isBlurred ? 'blurred' : ''}`}>
        <div className="side-section-unique"></div>
        <div className="content-container-unique">
          <h2 className="info-title-unique">Unsere Leistungen</h2>
          <br />
          <ul className="info-text-unique modern-list-unique">
            {services.map((service, index) => (
              <React.Fragment key={index}>
                <li
                  className={`list-item-unique ${expandedItem === index ? 'active-unique' : ''}`}
                  onClick={() => toggleItem(index)}
                >
                  <div className="service-header-unique">
                    <i className="fas fa-check-circle"></i>
                    <span>{service.title}</span>
                  </div>
                </li>
                {expandedItem === index && (
                  <div className="info-details-unique">
                    <p>{service.details}</p>
                  </div>
                )}
              </React.Fragment>
            ))}
          </ul>
          <p className="info-text-unique">
            <br />
            <em>Ihr Sen Physiotherapie Team</em>
          </p>
          <a href="/ueber-uns" className="kontakt-button-unique">
            Über uns
          </a>
        </div>
        <div className="side-section-unique"></div>
      </div>
      <Footer isBlurred={isBlurred} />
    </>
  );
}

export default Home;
