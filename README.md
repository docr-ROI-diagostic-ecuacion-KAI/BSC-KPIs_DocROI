# BSC KPIs DocROI

Pildora formativa DOC ROI para construir un Balanced Scorecard operativo: mapa estrategico, metas, relaciones causa-efecto, fichas KPI completas, seguimiento mensual, semaforos, alarmas, contramedidas y exportacion CSV/Excel.

## Que hace

- Cabecera global DOC ROI con logo oficial y navegacion.
- Cuatro perspectivas: Finanzas, Clientes, Procesos y Recursos.
- Constructor de metas por perspectiva.
- Edicion y borrado de metas.
- Constructor de relaciones causa-efecto con borrado de relaciones.
- Maximo 2 KPIs por meta.
- Ficha KPI completa con:
  - KPI
  - Formula
  - Unit of Measure
  - Current Value
  - Target Goal
  - KPI (%) Value/Target
  - Lower Threshold (-10%)
  - Upper Threshold (+10%)
  - Status
  - Visualization
  - Alarm Activated
  - Corrective Action
- Tabla mensual con valor introducido y porcentaje de cumplimiento destacado por color.
- Reporting por periodo con tabla tipo Excel.
- Exportacion CSV y XLSX.
- Persistencia local en `localStorage`.

## Como ejecutar

```bash
npm start
```

Abre:

```text
http://127.0.0.1:3000
```

## Archivos principales

- `index.html`: estructura de la pildora.
- `strategic-kpi.css`: sistema visual DOC ROI.
- `strategic-kpi-app.js`: logica del configurador, semaforos, reporting y exportaciones.
- `dev-server.cjs`: servidor local estatico.

## Privacidad

La herramienta funciona en local. No envia datos a ningun backend.
