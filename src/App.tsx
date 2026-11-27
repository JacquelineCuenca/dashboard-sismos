import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import './App.css';
import { DashboardSismos } from './components/layout/DashboardSismos';
import {
  FILTROS_INICIALES,
  OPCIONES_FILTROS,
  calcularDatosDashboard,
} from './data/sismosData';
import useFetchData from './hooks/useFetchData';

function App() {
  const { registros, cargando, error } = useFetchData();

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 10 }}>
        <CircularProgress />
        <Typography>Cargando sismos desde Firebase…</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (registros.length === 0) {
    return <Alert severity="info">No se encontraron registros en Firebase.</Alert>;
  }

  const datosIniciales = calcularDatosDashboard(registros, FILTROS_INICIALES);

  return (
    <DashboardSismos
      datosDashboard={datosIniciales}
      opcionesFiltros={OPCIONES_FILTROS}
      filtrosIniciales={FILTROS_INICIALES}
      registros={registros}
    />
  );
}

export default App;