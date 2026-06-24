import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './UeberUns.css';
import { Helmet } from 'react-helmet';

const smallImages = {
  reception: `${process.env.PUBLIC_URL}/mobile_images/ueberuns/DSC04767.webp`,
  therapist: `${process.env.PUBLIC_URL}/mobile_images/ueberuns/DSC04831.webp`,
};

const largeImages = {
  reception: `${process.env.PUBLIC_URL}/desktop_images/ueberuns/DSC04767.webp`,
  therapist: `${process.env.PUBLIC_URL}/desktop_images/ueberuns/DSC04831.webp`,
};

function UeberUns({ cookiesAccepted }) {
  const [currentImages, setCurrentImages] = useState({});

  const [isBlurred, setIsBlurred] = useState(!cookiesAccepted);

  // Update isBlurred when cookiesAccepted changes
  useEffect(() => {
    setIsBlurred(!cookiesAccepted);
  }, [cookiesAccepted]);

  useEffect(() => {
    const updateImages = () => {
      if (window.innerWidth < 768) {
        setCurrentImages(smallImages);
      } else {
        setCurrentImages(largeImages);
      }
    };

    // Run on initial load
    updateImages();

    // Add event listener to update images on window resize
    window.addEventListener('resize', updateImages);

    return () => {
      window.removeEventListener('resize', updateImages);
    };
  }, []);

  const [expandedItem, setExpandedItem] = useState(null);

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
      title: 'Entspannungstherapie',
      details: 'Genießen Sie entspannende Techniken zur Stressbewältigung und inneren Ruhe. Unsere Entspannungstherapie unterstützt Sie dabei, sich zu erholen und neue Energie zu tanken.',
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
        <title>Über Uns | Sen Physiotherapie</title>
      </Helmet>
      <Navbar isBlurred={isBlurred} />
      <div className={`ue-container ${!cookiesAccepted ? 'ue-blurred' : ''}`}>

        <motion.img
          src={currentImages.reception}
          alt="Unser Empfang"
          className="ue-img-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }} />

        <motion.h2
          className="ue-title"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Unsere Praxis
        </motion.h2>

        <motion.p
          className="ue-text"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Unser Team ist hier, um Ihnen zu einem schmerzfreien, aktiven Leben zu verhelfen. Wir bieten individuelle Therapien, die genau auf Ihre Bedürfnisse und Ziele abgestimmt sind, zur Rehabilitation, Schmerzlinderung und Prävention an. Mit innovativen Methoden verbessern wir Ihre Beweglichkeit und steigern Ihre Lebensqualität. <br/>Gemeinsam erreichen wir Ihre Gesundheitsziele. In unserer Praxis steht die Bewegungstherapie an erster Stelle!
        </motion.p>

        <motion.img
          src={currentImages.therapist}
          alt="Therapeut"
          className="ue-img-padded"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }} />

        <motion.h2
          className="ue-title"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Über mich
        </motion.h2>

        <motion.p
          className="ue-text"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Mein Name ist Benjamin Sen, und mein Ziel ist es, in Pforzheim eine Physiotherapiepraxis zu eröffnen, in der Bewegungstherapie im Mittelpunkt steht. Mit meiner fundierten Ausbildung und meiner langjährigen Erfahrung biete ich eine einzigartige Kombination aus theoretischem Wissen und praktischer Anwendung. <br/>Als erfahrener Trainer im Brazilian Jiu-Jitsu habe ich gelernt, dass Bewegung der Schlüssel zu einem gesunden Leben ist. Dieses Wissen möchte ich als ausgebildeter Physiotherapeut weitergeben, um meinen Patient*innen durch gezielte Mobilitätstherapie zu einem nachhaltigen, positiven Körpergefühl zu verhelfen. 
        </motion.p>


        <motion.h2
          className="ue-title"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Unsere Leistungen
        </motion.h2>

        <ul className="ue-list">
          {services.map((service, index) => (
            <React.Fragment key={index}>
              <li
                className={`ue-list-item ${expandedItem === index ? 'active' : ''}`}
                onClick={() => toggleItem(index)}
              >
                <i className="fas fa-check-circle"></i>
                <span>{service.title}</span>
              </li>
              {expandedItem === index && (
                <div className="ue-info">
                  <p>{service.details}</p>
                </div>
              )}
            </React.Fragment>
          ))}
        </ul>

        <a href="/kontakt" className="ue-button">
          Termin vereinbaren
        </a>

      </div>
      <Footer isBlurred={isBlurred}/>
    </>
  );
}

export default UeberUns;
