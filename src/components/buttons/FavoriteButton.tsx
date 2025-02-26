import { FaStar, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";

interface FavoriteButtonProps {
  favorite: boolean;
  toggleFavorite: (old: boolean) => void;
}

function FavoriteButton({ favorite, toggleFavorite }: FavoriteButtonProps) {
  return (
    <motion.button
      className="absolute top-[10px] left-[15px] border-none bg-none text-yellow-500 hover:text-yellow-600"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
      onClick={() => toggleFavorite(favorite)}
      type="button"
    >
      {favorite ? <FaStar size={20} /> : <FaRegStar size={20} />}
    </motion.button>
  );
}

export default FavoriteButton;
