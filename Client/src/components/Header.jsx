import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Header = ({ onAddClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="header-wrapper">
      <motion.header
        className={`header ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
          <motion.h1
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The Residents Book
          </motion.h1>

          <motion.button
            onClick={onAddClick}
            className="add-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Resident
          </motion.button>
        </div>
      </motion.header>
    </div>
  );
};

export default Header;
