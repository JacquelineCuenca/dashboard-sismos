"""
Para generar el archivo json, ejecutar el siguiente comando en la terminal donde se encuentra el archivo query.csv y transformar_csv_a_json.py :
python transformar_csv_a_json.py

Se generará y descargará automaticamente el archivo sismos.json
"""

import csv
import json
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path

# ---- Esquema: tipo esperado de cada columna ---------------------------------
NUMERICAS_FLOAT = ["latitude", "longitude", "depth", "mag", "dmin", "rms",
                   "horizontalError", "depthError", "magError"]
NUMERICAS_INT = ["nst", "gap", "magNst"]
FECHAS = ["time", "updated"]
CATEGORICAS = ["magType", "net", "id", "place", "type", "status",
               "locationSource", "magSource"]
# Orden de las columnas igual al del CSV original
COLUMNAS = ["time", "latitude", "longitude", "depth", "mag", "magType", "nst",
            "gap", "dmin", "rms", "net", "id", "updated", "place", "type",
            "horizontalError", "depthError", "magError", "magNst", "status",
            "locationSource", "magSource"]


def parse_fecha(valor):
    """Valida fecha ISO 8601 UTC (2026-01-01T12:37:06.282Z) y la normaliza."""
    dt = datetime.strptime(valor, "%Y-%m-%dT%H:%M:%S.%fZ")
    return dt.strftime("%Y-%m-%dT%H:%M:%S.") + f"{dt.microsecond // 1000:03d}Z"


def convertir_fila(fila, numero, errores):
    """Convierte una fila (dict de str) a un registro tipado. Vacío -> None."""
    reg = {}
    for col in COLUMNAS:
        crudo = (fila.get(col) or "").strip()      
        if crudo == "":
            reg[col] = None                      
            continue
        try:
            if col in NUMERICAS_FLOAT:
                reg[col] = float(crudo)
            elif col in NUMERICAS_INT:
                reg[col] = int(crudo)
            elif col in FECHAS:
                reg[col] = parse_fecha(crudo)
            else:
                reg[col] = " ".join(crudo.split())  
        except ValueError:
            errores.append(f"fila {numero}, columna '{col}': valor inválido '{crudo}'")
            reg[col] = None
    return reg


def main():
    base = Path(__file__).resolve().parent
    entrada = Path(sys.argv[1]) if len(sys.argv) > 1 else base / "query.csv"
    salida = Path(sys.argv[2]) if len(sys.argv) > 2 else base / "sismos.json"

    with open(entrada, encoding="utf-8-sig", newline="") as f:
        filas = list(csv.DictReader(f))

    errores = []
    registros = [convertir_fila(f, i, errores) for i, f in enumerate(filas, start=2)]

    # Validación: ids únicos
    ids = [r["id"] for r in registros]
    duplicados = [k for k, v in Counter(ids).items() if v > 1]

    with open(salida, "w", encoding="utf-8") as f:
        json.dump(registros, f, ensure_ascii=False, indent=2)

    # ---- Reporte de validación ----------------------------------------------
    print(f"Archivo de entrada : {entrada.name}")
    print(f"Archivo de salida  : {salida.name}")
    print(f"Registros CSV      : {len(filas)}")
    print(f"Registros JSON     : {len(registros)}")
    print(f"Coinciden          : {'SI' if len(filas) == len(registros) else 'NO'}")
    print(f"Errores de tipo    : {len(errores)}")
    for e in errores[:10]:
        print("  -", e)
    print(f"IDs duplicados     : {len(duplicados)}")
    print("Valores faltantes (null) por campo:")
    hay = False
    for col in COLUMNAS:
        n = sum(1 for r in registros if r[col] is None)
        if n:
            hay = True
            print(f"  - {col}: {n} ({n / len(registros):.1%})")
    if not hay:
        print("  (ninguno)")


if __name__ == "__main__":
    main()
