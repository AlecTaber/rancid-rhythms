import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Body from './components/body.tsx';
import Footer from './components/footer.tsx';
import Header from './components/header.tsx';
import Nav from './components/Nav.tsx';
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
