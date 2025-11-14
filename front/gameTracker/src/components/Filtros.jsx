import { FaFilter } from 'react-icons/fa';

const Filtros = ({ 
  genero, 
  plataforma, 
  completado, 
  onGeneroChange, 
  onPlataformaChange, 
  onCompletadoChange,
  generosDisponibles = [],
  plataformasDisponibles = []
}) => {
  return (
    <div className="filtros-container">
      <div className="filtros-header">
        <FaFilter className="filtros-icon" />
        <h3>Filtros</h3>
      </div>
      
      <div className="filtros-grid">
        <div className="filtro-group">
          <label>Género</label>
          <select 
            value={genero} 
            onChange={(e) => onGeneroChange(e.target.value)}
            className="filtro-select"
          >
            <option value="">Todos</option>
            {generosDisponibles.map((gen) => (
              <option key={gen} value={gen}>{gen}</option>
            ))}
          </select>
        </div>

        <div className="filtro-group">
          <label>Plataforma</label>
          <select 
            value={plataforma} 
            onChange={(e) => onPlataformaChange(e.target.value)}
            className="filtro-select"
          >
            <option value="">Todas</option>
            {plataformasDisponibles.map((plat) => (
              <option key={plat} value={plat}>{plat}</option>
            ))}
          </select>
        </div>

        <div className="filtro-group">
          <label>Estado</label>
          <select 
            value={completado} 
            onChange={(e) => onCompletadoChange(e.target.value)}
            className="filtro-select"
          >
            <option value="">Todos</option>
            <option value="true">Completados</option>
            <option value="false">Por completar</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filtros;

