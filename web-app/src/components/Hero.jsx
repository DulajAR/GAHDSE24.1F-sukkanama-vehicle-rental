import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroBackground from '../assets/hero4.png';

const Hero = () => {
  const navigate = useNavigate();

  const browseVehicles = () => {
    navigate('/loginCustomer');
  };

  return (
    <section
      id="hero"
      className="hero-section"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Sukkanama
      </motion.h1>

      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Super Value Vehicles
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Save time, connect with us!
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={browseVehicles}
      >
        Browse Now
      </motion.button>
    </section>
  );
};

export default Hero;
