import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Welcome.css';
import AppMainSound from '../../assets/AppMainSound.mp3'

function Welcome() {
    const location = useLocation();
    const isWelcomePage = location.pathname === '/';
    const audioRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isBlack, setIsBlack] = useState(true);
    const [circleVisible, setCircleVisible] = useState(false);
    const [delayTimes] = useState([1000, 2000, 3000, 4000]);

    const SoundClick = () => {
        if (audioRef.current) {
          audioRef.current.play().catch((error) => {
            console.error('Sound error:', error);
          });
        }
      };

    const headerStyle = {
        cursor: 'pointer',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: isBlack ? 'black' : '#CD7F32',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        padding: '20px 20px',
        textAlign: 'center',
        filter: 'drop-shadow(0 0 3em #646cffaa)',
        position: 'relative',
        zIndex: 1,
    };
    
    const circleStyles = [
        { width: '250px', height: '250px', backgroundColor: '#666666', zIndex: -1 },
        { width: '350px', height: '350px', backgroundColor: '#999999', zIndex: -2 },
        { width: '450px', height: '450px', backgroundColor: '#333333', zIndex: -3 },
        { width: '600px', height: '600px', backgroundColor: '#000000', zIndex: -4 },
    ];
    
        const circleLinks = [
            '/aboutme', 
            '/landing', 
            '/form', 
            '/home', 
          ];
    
    const DelayedCircle = ({ style, delay }) => {
        const [visible, setVisible] = useState(false);
        useEffect(() => {
          const timer = setTimeout(() => {
            setVisible(true);
          }, delay);
          return () => clearTimeout(timer);
        }, [delay]);
        return visible ? <div className="circle" style={{ ...style, transform: 'scale(1)' }}></div> : null;
      };

    const renderCircles = menuOpen ? (
        <div className="circles">
          {circleStyles.map((style, index) => (
            <Link 
            key={index} 
            to={circleLinks[index]} 
            className="circle-link">
            <DelayedCircle 
            key={index}
            className="circle" 
            style={{ ...style, transform: circleVisible ? 'scale(1)' : 'scale(0)' }} 
            delay={delayTimes[index]}
            onClick={() => handleCircleClick(index)} />
            </Link>
            ))}
            </div>
      ) : null;

    const handleAllClicks = () => {
        SoundClick();
        setIsBlack(!isBlack);
        setMenuOpen(!menuOpen);
        setCircleVisible(!menuOpen);
      };

  return (
    <div className="app-container">
      {isWelcomePage && ( 
        <header 
        className={`header ${menuOpen ? 'open' : ''}`} 
        style={headerStyle} 
        onClick={handleAllClicks}>
          <h1 className="title">PI Drivers</h1>
          <audio ref={audioRef} src={AppMainSound} />
        </header>
      )}
      {renderCircles}
    </div>
  );
}

export default Welcome;