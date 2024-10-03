import React from 'react';
import { Link } from 'react-router-dom';  // Link 컴포넌트를 가져옴
import './Header.css';  // CSS 파일을 가져옴

const Header = () => {
  return (
      <header className="header">
        <div className="header-top">
          <div className="logo">
            <img src="logo.png" alt="Logo" />
          </div>
          <nav className="navbar">
            <ul>
              <li><Link to="/">홈</Link></li>
              <li><Link to="/Subjects">진료과목</Link></li>
              <li><Link to="/TreatmentTime">진료 시간</Link></li>
            </ul>
          </nav>
        </div>
      </header>
  );
};

export default Header;
