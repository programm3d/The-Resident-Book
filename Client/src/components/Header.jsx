import { motion } from "framer-motion";

const Header = ({ onAddClick }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <motion.h1
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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
      </div>
    </header>
  );
};

export default Header;
