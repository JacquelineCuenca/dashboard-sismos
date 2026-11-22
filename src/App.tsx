import './App.css';
import { DashboardSismos } from './components/layout/DashboardSismos';
import {
  FILTROS_INICIALES,
  OPCIONES_FILTROS,
  REGISTROS_SISMOS,
  calcularDatosDashboard,
} from './data/sismosData';

function App() {
  const datosIniciales = calcularDatosDashboard(REGISTROS_SISMOS, FILTROS_INICIALES);

  return (
    <DashboardSismos
      datosDashboard={datosIniciales}
      opcionesFiltros={OPCIONES_FILTROS}
      filtrosIniciales={FILTROS_INICIALES}
      registros={REGISTROS_SISMOS}
    />
  );
}

export default App;