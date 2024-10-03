import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Services from './pages/Subjects';
import About from './pages/TreatmentTime';

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          {/* 라우팅 설정 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Subjects" element={<Services />} />
            <Route path="/TreatmentTime" element={<About />} />
          </Routes>
        </div>
      </Router>
  );
}

// Home 컴포넌트
const Home = () => {
  return <h1>홈 화면</h1>;
};

export default App;
