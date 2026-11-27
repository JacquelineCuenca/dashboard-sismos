import { get, ref } from 'firebase/database';
import { database } from '../firebase/firebase';
import { normalizarRegistros } from '../data/sismosData';
import type { RegistroSismo } from '../types/dashboard';

export async function obtenerSismos(ruta: string): Promise<RegistroSismo[]> {
  const snapshot = await get(ref(database, ruta));
  if (!snapshot.exists()) return [];

  const items = Object.values(
    snapshot.val() as Record<string, Record<string, unknown>>
  );
  return normalizarRegistros(items);
}