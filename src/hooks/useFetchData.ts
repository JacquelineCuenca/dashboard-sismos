import { useEffect, useState } from 'react';
import { obtenerSismos } from '../services/sismoService';
import type { RegistroSismo } from '../types/dashboard';

export default function useFetchData() {
  const [registros, setRegistros] = useState<RegistroSismo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerSismos('sismos')
      .then((datos) => setRegistros(datos))
      .catch((e) => {
        console.error(e);
        setError('No se pudieron recuperar los sismos desde Firebase.');
      })
      .finally(() => setCargando(false));
  }, []); // se ejecuta al cargar el componente

  return { registros, cargando, error };
}