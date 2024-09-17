import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Body from './components/Body.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import './index.css';



function App() {

  return (
    <Router>
      <Header />
      <Nav />
      <Routes>
        <Route exact path="/" element={<Body section="home"/>} />
        <Route path="/profile" element={<Body section="profile" />} />
        <Route path="*" element={<Body section="notfound" />} />
      </Routes>
      <Footer />
    </Router>
  )
};

export default App
