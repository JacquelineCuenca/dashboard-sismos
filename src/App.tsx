import './App.css';
import { Grid } from '@mui/material';

function App() {

    return (
        <Grid container spacing={5} 
        sx={{ justifyContent: 'center', 
            alignItems: 'center',}}
            >

            {/* Encabezado Sismo */}
            <Grid size= {{xs:12}}>
                Elemento: Encabezado </Grid>

            {/* Panel Filtros */}
            <Grid size={{xs:12}}>
                Elemento: Filtros </Grid>

            {/* Indicadores KPI */}
            <Grid size={{ xs:12, sm: 6, md:3}}>
                Indicador 1: Sismos Registrados </Grid>

            <Grid size={{ xs:12, sm: 6, md:3}}>
                Indicador 2: Magnitud máxima </Grid>
            
            <Grid size={{ xs:12, sm: 6, md:3}}>
                Indicador 3: Profundidad promedio </Grid>

            <Grid size={{ xs:12, sm: 6, md:3}}>
                Indicador 4: Sismos ≥ M4.5 </Grid>

            {/* Gráfico */}
            <Grid size={{ xs:12, md:6}}>
                Gráfico 1: Sismos por año </Grid>

            <Grid size={{ xs:12, md:6}}>
                Gráfico 2: Sismos por país </Grid>

            <Grid size={{ xs:12, md:6}}>
                Gráfico 3: Distribución por Magnitud </Grid>
            
            <Grid size={{ xs:12, md:6}}>
                Gráfico 4: Profundidad del foco </Grid>

            {/* Información adicional */}
            <Grid size={{ xs:12 }}>
                Elemento: Pie de Página </Grid>

        </Grid>
    );
}

export default App;