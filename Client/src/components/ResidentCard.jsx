import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const ResidentCard = ({ resident, index }) => {
  const initials =
    `${resident.firstName[0]}${resident.lastName[0]}`.toUpperCase();

  return (
    <motion.div
      className="resident-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="profile-image">
        {resident.profilePhoto ? (
          <img
            src={resident.profilePhoto}
            alt={`${resident.firstName} ${resident.lastName}`}
          />
        ) : (
          <span className="profile-initials">{initials}</span>
        )}
      </div>

      <h3 className="resident-name">
        {resident.firstName} {resident.lastName}
      </h3>

      <p className="resident-role">{resident.role}</p>

      <div className="social-links">
        {resident.linkedin && (
          <a
            href={resident.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaLinkedin size={18} />
          </a>
        )}
        {resident.twitter && (
          <a
            href={resident.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaTwitter size={18} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ResidentCard;
