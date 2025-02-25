import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Feature from './components/Feature';
import Banner from './components/Banner';
import VehicleAds from './components/VehicleAds';
import SmallBanner from './components/SmallBanner';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Feature />
      <Banner />
      <VehicleAds />
      <SmallBanner />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;