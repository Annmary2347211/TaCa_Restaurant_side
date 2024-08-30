import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../axiosConfig'; // Ensure the correct path
import { logout, setRestaurant } from '../../redux/restaurantSlice';
import './Header.css';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('dashboard');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = localStorage.getItem('token');
  const emailid = localStorage.getItem('emailid');

  const fetchRestaurantData = async () => {
    try {
      if (emailid) {
        const response = await axios.get(`/restaurant/${emailid}`, {
          headers: { 'x-auth-token': localStorage.getItem('token')} 
        });
        console.log(response, "Fetched restaurant data");
        dispatch(setRestaurant(response.data)); // Store the fetched data in Redux
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRestaurantData();
    } 
  }, [token, emailid, dispatch]);

  // useEffect(() => {
  //   // Set the active link based on the current path
  //   const path = location.pathname.replace('/', '');
  //   setActiveLink(path || 'dashboard'); // If the path is empty, default to 'home'
  // }, [location]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
    navigate(`/${link}`);
  };

  const controlHeader = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', controlHeader);

    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [controlHeader]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('emailid');
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className={`header ${isVisible ? 'visible' : 'hidden'} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="logo" onClick={() => handleLinkClick('home')}>
        <img src="/images/chef-hat.png" alt="TaCa" />
        <span>TaCa</span>
      </div>
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
  <ul>
    {token && (
      <>
        {['dashboard', 'profile', 'menu', 'reservations', 'reviews'].map((link) => (
          <li key={link}>
            <button
              className={`nav-link ${activeLink === link ? 'active' : ''}`}
              onClick={() => handleLinkClick(link)}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </button>
          </li>
        ))}
      </>
    )}
  </ul>
</nav>
      <div className="button-group">
        {!token ? (
          <>
            <button className="book-button" onClick={() => handleLinkClick('register')}>New Registration</button>
            <button className="book-button" onClick={() => handleLinkClick('login')}>Login</button>
          </>
        ) : (
          <button className="book-button" onClick={handleLogout}>Logout</button>
        )}
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
};

export default Header;
