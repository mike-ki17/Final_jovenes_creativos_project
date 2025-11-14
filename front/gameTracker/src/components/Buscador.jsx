import { FaSearch } from 'react-icons/fa';

const Buscador = ({ searchTerm, onSearchChange, placeholder = "Buscar juegos..." }) => {
  return (
    <div className="buscador-container">
      <FaSearch className="buscador-icon" />
      <input
        type="text"
        className="buscador-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default Buscador;

