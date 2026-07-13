const STORAGE_KEY = "docroi-bsc-kpi-builder-v2";
const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const steps = [
  {
    id: "map",
    label: "1. Mapa",
    title: "Mapa estrategico Norton y Kaplan",
    body: "Dibuja cuatro lineas horizontales: Recursos, Procesos, Clientes y Finanzas. En cada una colocas las metas que quieres alcanzar en tu proyecto, empresa, servicio o proceso.",
    rule: "No empieces por el indicador. Empieza por la meta estrategica y su lugar en el mapa.",
  },
  {
    id: "relations",
    label: "2. Causa-efecto",
    title: "Journey relacional de metas",
    body: "Conecta primero las metas dentro de Recursos. Despues enlaza Recursos con Procesos, Procesos con Clientes y Clientes con Finanzas. Asi aparece el modelo causa-efecto.",
    rule: "Una flecha debe explicar una hipotesis directiva: si mejora A, entonces deberia mejorar B.",
  },
  {
    id: "kpis",
    label: "3. Fichas KPI",
    title: "Configuracion de indicadores",
    body: "Ve meta por meta y define maximo 2 KPIs. Cada ficha recoge objetivo, formula, unidad, fuente, responsable, alarma, accion correctora y presupuesto.",
    rule: "Dos KPIs bien elegidos por meta valen mas que diez indicadores imposibles de gobernar.",
  },
  {
    id: "tracking",
    label: "4. Seguimiento",
    title: "Tabla mensual de valores",
    body: "Introduce cada mes el valor real del KPI. La herramienta calcula estado, alarma, presupuesto y accion recomendada para construir el cuadro de mando.",
    rule: "Tres amarillos seguidos se convierten en rojo: el riesgo sostenido tambien es problema.",
  },
  {
    id: "reporting",
    label: "5. Reporting",
    title: "Mapa con semaforos y bajada a Excel",
    body: "El mapa final muestra perspectivas, metas, KPIs, colores, presupuesto corrector y acciones. La tabla se puede descargar para Data Studio o seguimiento operativo.",
    rule: "El reporting no solo ensena que KPI falla: ensena que parte del modelo causal esta sufriendo.",
  },
];

const seed = {
  perspectives: [
    { id: "fin", name: "Finanzas", subtitle: "Margen, ingresos, LTV y coste", order: 1, color: "#05070b" },
    { id: "cli", name: "Clientes", subtitle: "Satisfaccion, retencion y recurrencia", order: 2, color: "#003b5c" },
    { id: "proc", name: "Procesos", subtitle: "Flujos, calidad, productividad y tiempos", order: 3, color: "#0b4f6c" },
    { id: "res", name: "Recursos", subtitle: "Aprendizaje, capacidades, datos e IA", order: 4, color: "#5b6472" },
  ],
  goals: [
    goal("g-data", "Mejorar calidad del dato", "res", "Data Office"),
    goal("g-ai", "Aumentar adopcion de IA", "res", "Direccion digital"),
    goal("g-sla", "Reducir tiempo de respuesta", "proc", "Operaciones"),
    goal("g-auto", "Automatizar seguimiento", "proc", "CRM"),
    goal("g-nps", "Aumentar satisfaccion NPS", "cli", "Customer Success"),
    goal("g-churn", "Reducir churn", "cli", "Direccion clientes"),
    goal("g-ltv", "Incrementar LTV", "fin", "Growth"),
    goal("g-margin", "Aumentar margen", "fin", "Finanzas"),
  ],
  links: [
    link("g-data", "g-auto"), link("g-ai", "g-sla"), link("g-auto", "g-nps"),
    link("g-sla", "g-churn"), link("g-nps", "g-ltv"), link("g-churn", "g-margin"), link("g-ltv", "g-margin"),
  ],
  kpis: [
    kpi("k-complete", "Registros completos", "g-data", "%", 95, "higher", "Registros completos / total", "Activar limpieza de datos y reglas de captura", 3.5),
    kpi("k-dup", "Duplicados detectados", "g-data", "%", 3, "lower", "Duplicados / registros", "Depurar base y bloquear altas duplicadas", 2.2),
    kpi("k-ai", "Usuarios activos IA", "g-ai", "%", 80, "higher", "Usuarios activos / usuarios objetivo", "Sesiones de activacion por equipo", 1.8),
    kpi("k-time", "Tiempo medio respuesta", "g-sla", "h", 4, "lower", "Horas respuesta / tickets", "Redisenar workflow y reforzar turnos criticos", 4.2),
    kpi("k-auto", "Leads con seguimiento", "g-auto", "%", 85, "higher", "Leads automatizados / leads totales", "Conectar CRM con secuencias automatizadas", 3.1),
    kpi("k-nps", "NPS promedio", "g-nps", "pts", 62, "higher", "Promotores - detractores", "Cerrar causas de detraccion prioritarias", 2.6),
    kpi("k-churn", "Tasa de abandono", "g-churn", "%", 9, "lower", "Clientes perdidos / cartera", "Programa de recuperacion de riesgo", 3.8),
    kpi("k-ltv", "LTV medio", "g-ltv", "EUR", 5000, "higher", "Ingreso medio x margen x vida", "Mejorar retencion y recurrencia", 3.2),
    kpi("k-margin", "Margen operativo", "g-margin", "%", 19, "higher", "Beneficio operativo / ingresos", "Revisar pricing y coste de servicio", 4.5),
  ],
  values: {},
};

const seedValues = {
  "k-complete": [70, 74, 78, 82, 84, 86, 88, 90, 91, 92, 93, 95],
  "k-dup": [9, 8, 7, 7, 6, 5, 5, 4, 4, 3.5, 3.2, 3],
  "k-ai": [40, 45, 48, 55, 58, 60, 66, 70, 72, 76, 82, 88],
  "k-time": [6.2, 5.9, 5.5, 5.1, 4.9, 4.7, 4.6, 4.4, 4.3, 4.1, 3.9, 3.7],
  "k-auto": [45, 50, 54, 60, 63, 66, 69, 72, 76, 80, 84, 88],
  "k-nps": [42, 45, 48, 50, 51, 53, 55, 58, 60, 62, 65, 68],
  "k-churn": [14, 13.5, 13, 12, 11.5, 11, 10.5, 10, 9.8, 9.4, 9, 8.6],
  "k-ltv": [3800, 3900, 4050, 4200, 4300, 4450, 4600, 4720, 4880, 5050, 5300, 6100],
  "k-margin": [14, 15, 15.5, 16, 16.5, 17, 17.8, 18.4, 19, 20, 22, 24],
};
seed.kpis.forEach((item) => {
  seed.values[item.id] = Object.fromEntries(MONTHS.map((month, index) => [month, seedValues[item.id]?.[index] ?? ""]));
});

let state = load();
let activeStep = "map";
let selectedKpi = null;
let selectedGoal = null;
let selectedPeriod = "Dic";

function goal(id, name, perspectiveId, owner) {
  return { id, name, perspectiveId, owner, priority: "Alta", description: "Meta estrategica del mapa causa-efecto." };
}

function link(source, target) {
  return { id: `${source}-${target}`, source, target };
}

function kpi(id, name, goalId, unit, target, direction, formula, correctiveAction, budget) {
  const lowerThreshold = direction === "lower" ? target * 1.1 : target * 0.9;
  const upperThreshold = direction === "lower" ? target * 0.9 : target * 1.1;
  return {
    id, name, goalId, unit, target, direction, formula, correctiveAction, budget,
    metric: name, expectedResult: "Mejora medible de la meta asociada.", visualization: "Gauge",
    lowerThreshold, upperThreshold, excellentPct: 20, blueAction: "Revisar el objetivo: puede ser demasiado facil o haberse quedado antiguo.",
    source: "Demo Doc ROI", owner: "Responsable", frequency: "Mensual",
    alertRecipient: "direccion@empresa.com", alertMessage: `Alarma KPI: ${name}`,
  };
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.perspectives && saved?.goals && saved?.kpis) return normalizeState(saved);
  } catch {}
  return normalizeState(structuredClone(seed));
}

function normalizeState(data) {
  data.values = data.values || {};
  data.perspectives = (data.perspectives || seed.perspectives).map((p) => {
    const ref = seed.perspectives.find((item) => item.id === p.id);
    return { ...p, order: ref?.order ?? p.order, color: ref?.color ?? p.color };
  }).sort((a, b) => a.order - b.order);
  data.goals = (data.goals || []).map((g) => ({ priority: "Alta", description: "Meta estrategica del mapa causa-efecto.", ...g }));
  data.kpis = (data.kpis || []).map((item) => {
    const target = Number(item.target || 0);
    const direction = item.direction || "higher";
    const lowerThreshold = item.lowerThreshold ?? (direction === "lower" ? target * 1.1 : target * 0.9);
    const upperThreshold = item.upperThreshold ?? (direction === "lower" ? target * 0.9 : target * 1.1);
    data.values[item.id] = data.values[item.id] || Object.fromEntries(MONTHS.map((month) => [month, ""]));
    return {
      metric: item.name,
      expectedResult: "Mejora medible de la meta asociada.",
      visualization: "Gauge",
      excellentPct: 20,
      blueAction: "Revisar el objetivo: puede ser demasiado facil o haberse quedado antiguo.",
      lowerThreshold,
      upperThreshold,
      ...item,
    };
  });
  return data;
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function $(id) {
  return document.getElementById(id);
}

function currentValue(kpiId) {
  const row = state.values[kpiId] || {};
  for (let i = MONTHS.length - 1; i >= 0; i--) {
    const value = Number(row[MONTHS[i]]);
    if (Number.isFinite(value) && row[MONTHS[i]] !== "") return value;
  }
  return "";
}

function monthStatus(item, month) {
  const raw = state.values[item.id]?.[month];
  const value = Number(raw);
  if (!Number.isFinite(value) || raw === "") return "empty";
  const target = Number(item.target);
  const ratio = kpiRatio(item, value);
  let status = "red";
  if (ratio >= 1 + Number(item.excellentPct || 20) / 100) status = "blue";
  else if (item.direction === "lower") {
    if (value <= Number(item.upperThreshold ?? target * 0.9)) status = "green";
    else if (value <= Number(item.lowerThreshold ?? target * 1.1)) status = "amber";
  } else {
    if (value >= Number(item.upperThreshold ?? target * 1.1)) status = "green";
    else if (value >= Number(item.lowerThreshold ?? target * 0.9)) status = "amber";
  }
  const monthIndex = MONTHS.indexOf(month);
  if (status === "amber" && monthIndex >= 2) {
    const previous = MONTHS.slice(monthIndex - 2, monthIndex + 1).map((m) => {
      const v = Number(state.values[item.id]?.[m]);
      if (!Number.isFinite(v) || state.values[item.id]?.[m] === "") return "empty";
      const r = kpiRatio(item, v);
      if (r >= 1 + Number(item.excellentPct || 20) / 100) return "blue";
      if (item.direction === "lower") {
        if (v <= Number(item.upperThreshold ?? target * 0.9)) return "green";
        if (v <= Number(item.lowerThreshold ?? target * 1.1)) return "amber";
      } else {
        if (v >= Number(item.upperThreshold ?? target * 1.1)) return "green";
        if (v >= Number(item.lowerThreshold ?? target * 0.9)) return "amber";
      }
      return "red";
    });
    if (previous.every((s) => s === "amber")) status = "red";
  }
  return status;
}

function kpiRatio(item, value = currentValue(item.id)) {
  const target = Number(item.target);
  const measured = Number(value);
  if (!Number.isFinite(target) || !Number.isFinite(measured) || target === 0 || measured === 0) return 0;
  return item.direction === "lower" ? target / measured : measured / target;
}

function kpiSuccessPct(item, value = currentValue(item.id)) {
  return Math.round(kpiRatio(item, value) * 100);
}

function alarmActivated(item, status = kpiStatus(item)) {
  return status === "red";
}

function kpiStatus(item) {
  const lastMonth = latestMonth(item.id);
  return lastMonth ? monthStatus(item, lastMonth) : "empty";
}

function latestMonth(kpiId) {
  const row = state.values[kpiId] || {};
  for (let i = MONTHS.length - 1; i >= 0; i--) {
    if (row[MONTHS[i]] !== "" && row[MONTHS[i]] !== undefined) return MONTHS[i];
  }
  return "";
}

function goalStatus(goalId) {
  const statuses = state.kpis.filter((item) => item.goalId === goalId).map(kpiStatus);
  if (statuses.includes("red")) return "red";
  if (statuses.includes("amber")) return "amber";
  if (statuses.includes("green")) return "green";
  if (statuses.includes("blue")) return "blue";
  return "empty";
}

function formatBudget(value) {
  const n = Number(value || 0);
  return `${String(Math.round(n * 10) / 10).replace(".", ",")}k`;
}

function formatValue(value, unit) {
  if (value === "") return "-";
  const n = Number(value);
  const base = Number.isFinite(n) ? new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 }).format(n) : value;
  return unit === "EUR" ? `${base} EUR` : `${base}${unit ? ` ${unit}` : ""}`;
}

function statusLabel(status) {
  return { red: "Rojo", amber: "Amarillo", green: "Verde", blue: "Azul", empty: "Sin dato" }[status] || status;
}

function render() {
  save();
  renderMenu();
  renderTabs();
  renderTraining();
  renderWorkspace();
}

function renderMenu() {
  $("stepMenu").innerHTML = steps.map((step) => `<button class="${activeStep === step.id ? "active" : ""}" data-step="${step.id}" type="button">${step.label}</button>`).join("");
}

function renderTabs() {
  $("workTabs").innerHTML = steps.map((step) => `<button class="${activeStep === step.id ? "active" : ""}" data-step="${step.id}" type="button">${step.title}</button>`).join("");
}

function renderTraining() {
  const step = steps.find((item) => item.id === activeStep);
  $("trainingKicker").textContent = step.label;
  $("trainingTitle").textContent = step.title;
  $("trainingBody").textContent = step.body;
  $("trainingRule").textContent = step.rule;
}

function renderWorkspace() {
  if (activeStep === "map") return renderMapBuilder();
  if (activeStep === "relations") return renderRelations();
  if (activeStep === "kpis") return renderKpis();
  if (activeStep === "tracking") return renderTracking();
  return renderReporting();
}

function renderMapBuilder() {
  $("workspace").innerHTML = `
    <div class="builder-grid">
      <form class="tool-panel" id="goalForm">
        <h3>Crear meta estrategica</h3>
        <p>Coloca cada meta en una perspectiva. Piensa en resultados deseados, no en tareas.</p>
        <label>Perspectiva <select name="perspectiveId">${state.perspectives.map((p) => `<option value="${p.id}">${p.name}</option>`).join("")}</select></label>
        <label>Meta <input name="name" required placeholder="Ej. Mejorar calidad del dato" /></label>
        <label>Responsable <input name="owner" placeholder="Area responsable" /></label>
        <button class="btn primary" type="submit">Anadir meta</button>
      </form>
      <div class="bsc-lanes">${state.perspectives.map(renderPerspectiveLane).join("")}</div>
    </div>`;
  $("goalForm").addEventListener("submit", addGoal);
}

function renderPerspectiveLane(p) {
  const goals = state.goals.filter((g) => g.perspectiveId === p.id);
  return `<section class="bsc-lane" style="--accent:${p.color}">
    <h3>${p.name}</h3><p>${p.subtitle}</p>
    <div>${goals.map((g) => `<article class="goal-pill status-${goalStatus(g.id)}"><strong>${g.name}</strong><small>${g.owner} · ${g.priority}</small><button class="mini-action" data-edit-goal="${g.id}" type="button">Editar meta</button></article>`).join("")}</div>
  </section>`;
}

function renderRelations() {
  $("workspace").innerHTML = `
    <div class="builder-grid">
      <form class="tool-panel" id="linkForm">
        <h3>Conectar metas</h3>
        <p>Construye el journey: Recursos -> Procesos -> Clientes -> Finanzas.</p>
        <label>Desde <select name="source">${goalOptions()}</select></label>
        <label>Hacia <select name="target">${goalOptions()}</select></label>
        <button class="btn primary" type="submit">Crear flecha causa-efecto</button>
        <div class="relation-list">
          <strong>Relaciones creadas</strong>
          ${state.links.length ? state.links.map(renderRelationItem).join("") : "<small>No hay relaciones todavia.</small>"}
        </div>
      </form>
      <div class="map-board">
        <svg id="relationSvg"></svg>
        <div class="map-columns">${state.perspectives.map(renderMapColumn).join("")}</div>
      </div>
    </div>`;
  $("linkForm").addEventListener("submit", addLink);
  requestAnimationFrame(drawRelationLines);
}

function renderRelationItem(item) {
  const source = state.goals.find((g) => g.id === item.source);
  const target = state.goals.find((g) => g.id === item.target);
  return `<article class="relation-item"><span>${source?.name || "Origen"} -> ${target?.name || "Destino"}</span><button type="button" data-delete-link="${item.id}">Borrar</button></article>`;
}

function renderMapColumn(p) {
  const goals = state.goals.filter((g) => g.perspectiveId === p.id);
  return `<section class="map-column" style="--accent:${p.color}"><h3>${p.name}</h3>${goals.map((g) => `<article id="goal-${g.id}" class="map-goal status-${goalStatus(g.id)}"><strong>${g.name}</strong><small>${kpisForGoal(g.id).length}/2 KPIs · ${g.owner}</small><button class="mini-action" data-edit-goal="${g.id}" type="button">Editar</button></article>`).join("")}</section>`;
}

function drawRelationLines() {
  const svg = $("relationSvg");
  const board = document.querySelector(".map-board");
  if (!svg || !board) return;
  const rect = board.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
  svg.innerHTML = `<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#8da2b5"/></marker></defs>`;
  state.links.forEach((item) => {
    const a = $(`goal-${item.source}`);
    const b = $(`goal-${item.target}`);
    if (!a || !b) return;
    const ar = a.getBoundingClientRect();
    const br = b.getBoundingClientRect();
    const x1 = ar.right - rect.left;
    const y1 = ar.top + ar.height / 2 - rect.top;
    const x2 = br.left - rect.left;
    const y2 = br.top + br.height / 2 - rect.top;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${x1} ${y1} C ${x1 + 70} ${y1}, ${x2 - 70} ${y2}, ${x2} ${y2}`);
    path.setAttribute("class", "link");
    path.setAttribute("marker-end", "url(#arrow)");
    svg.appendChild(path);
  });
}

function renderKpis() {
  $("workspace").innerHTML = `
    <div class="builder-grid">
      <form class="tool-panel" id="quickKpiForm">
        <h3>Crear KPI</h3>
        <p>Maximo 2 por meta. Si ya hay dos, toca mejorar los existentes.</p>
        <label>Meta <select name="goalId">${goalOptions()}</select></label>
        <label>Nombre KPI <input name="name" required /></label>
        <label>Objetivo <input name="target" type="number" step="0.01" required /></label>
        <label>Unidad <input name="unit" placeholder="%, h, EUR" /></label>
        <label>Sentido <select name="direction"><option value="higher">Mas alto es mejor</option><option value="lower">Mas bajo es mejor</option></select></label>
        <label>Presupuesto accion (k) <input name="budget" type="number" step="0.1" value="1.5" /></label>
        <button class="btn primary" type="submit">Crear ficha KPI</button>
      </form>
      <div class="kpi-card-grid">${state.kpis.map(renderKpiCard).join("")}</div>
    </div>`;
  $("quickKpiForm").addEventListener("submit", addKpi);
}

function renderKpiCard(item) {
  const g = state.goals.find((goal) => goal.id === item.goalId);
  const status = kpiStatus(item);
  return `<article class="kpi-card status-${status}">
    <div><span class="status-dot"></span><strong>${item.name}</strong></div>
    <p>${g?.name || "Sin meta"} · objetivo ${formatValue(item.target, item.unit)} · exito ${kpiSuccessPct(item)}%</p>
    <small>${statusLabel(status)} · ${item.formula || "Formula pendiente"} · ${item.visualization || "Gauge"} · ${formatBudget(item.budget)}</small>
    <button class="btn secondary" data-edit-kpi="${item.id}" type="button">Editar ficha</button>
  </article>`;
}

function renderTracking() {
  $("workspace").innerHTML = `
    <div class="table-actions">
      <button class="btn secondary" id="downloadCsv" type="button">Descargar CSV</button>
      <button class="btn secondary" id="downloadXlsx" type="button">Descargar Excel</button>
      <button class="btn ghost" id="loadDemoValues" type="button">Recargar valores demo</button>
    </div>
    <div class="tracking-wrap">
      <table class="tracking-table">
        <thead><tr><th>Perspectiva</th><th>Meta</th><th>KPI</th><th>Objetivo</th>${MONTHS.map((m) => `<th>${m}<small>valor + %</small></th>`).join("")}<th>Estado</th><th>Accion</th><th>Presupuesto</th></tr></thead>
        <tbody>${state.kpis.map(renderTrackingRow).join("")}</tbody>
      </table>
    </div>`;
  document.querySelectorAll("[data-kpi-value]").forEach((input) => input.addEventListener("change", updateValue));
  $("downloadCsv").addEventListener("click", downloadCsv);
  $("downloadXlsx").addEventListener("click", downloadXlsx);
  $("loadDemoValues").addEventListener("click", () => {
    state.values = structuredClone(seed.values);
    render();
  });
}

function renderTrackingRow(item) {
  const g = state.goals.find((goal) => goal.id === item.goalId);
  const p = state.perspectives.find((perspective) => perspective.id === g?.perspectiveId);
  const status = kpiStatus(item);
  return `<tr class="status-${status}">
    <td>${p?.name || ""}</td><td>${g?.name || ""}</td><td><button data-edit-kpi="${item.id}" type="button">${item.name}</button></td><td>${formatValue(item.target, item.unit)}</td>
    ${MONTHS.map((m) => renderMonthCell(item, m)).join("")}
    <td><strong>${statusLabel(status)}</strong></td><td>${status === "red" ? item.correctiveAction : status === "blue" ? "Revisar objetivo: puede estar demasiado facil" : status === "amber" ? "Alerta y seguimiento" : "Enhorabuena, mantener"}</td><td>${status === "red" ? formatBudget(item.budget) : "-"}</td>
  </tr>`;
}

function renderMonthCell(item, month) {
  const status = monthStatus(item, month);
  const value = state.values[item.id]?.[month] ?? "";
  const pct = value === "" ? "-" : `${kpiSuccessPct(item, value)}%`;
  return `<td><div class="month-cell status-${status}"><input class="month-input" data-kpi-value="${item.id}" data-month="${month}" value="${value}" /><strong>${pct}</strong><small>${formatValue(value, item.unit)}</small></div></td>`;
}

function renderReporting() {
  const redKpis = state.kpis.filter((item) => monthStatus(item, selectedPeriod) === "red");
  const redBudget = redKpis.reduce((sum, item) => sum + Number(item.budget || 0), 0);
  $("workspace").innerHTML = `
    <form class="period-entry" id="periodEntry">
      <label>Periodo <select name="period">${MONTHS.map((month) => `<option value="${month}" ${month === selectedPeriod ? "selected" : ""}>${month}</option>`).join("")}</select></label>
      <label>KPI a informar <select name="kpiId">${state.kpis.map((item) => `<option value="${item.id}">${item.name}</option>`).join("")}</select></label>
      <label>Valor del periodo <input name="value" type="number" step="0.01" placeholder="Dato real" /></label>
      <button class="btn primary" type="submit">Guardar valor</button>
      <button class="btn secondary" id="downloadCsvReport" type="button">CSV</button>
      <button class="btn secondary" id="downloadXlsxReport" type="button">Excel</button>
    </form>
    <div class="report-grid">
      <article class="metric"><span>KPIs rojos</span><strong>${redKpis.length}</strong></article>
      <article class="metric"><span>Presupuesto corrector</span><strong>${formatBudget(redBudget)}</strong></article>
      <article class="metric"><span>Periodo</span><strong>${selectedPeriod}</strong></article>
      <article class="metric"><span>KPIs azules</span><strong>${state.kpis.filter((k) => monthStatus(k, selectedPeriod) === "blue").length}</strong></article>
    </div>
    <div class="period-kpi-grid">${state.kpis.map((item) => renderPeriodKpiCard(item, selectedPeriod)).join("")}</div>
    <div class="report-table-wrap">
      <table class="report-data-table">
        <thead><tr><th>Perspective</th><th>Strategic Objective</th><th>KPI</th><th>Formula</th><th>Unit of Measure</th><th>Current Value</th><th>Target Goal</th><th>KPI (%)</th><th>Lower Threshold (-10%)</th><th>Upper Threshold (+10%)</th><th>Status</th><th>Visualization</th><th>Alarm Activated</th><th>Corrective Action</th><th>Budget</th></tr></thead>
        <tbody>${state.kpis.map((item) => renderReportDataRow(item, selectedPeriod)).join("")}</tbody>
      </table>
    </div>
    <div class="report-map">${state.perspectives.map(renderReportPerspective).join("")}</div>
    <article class="diagnosis-main"><h3>Lectura directiva</h3><p>${diagnosisText()}</p></article>`;
  $("periodEntry").addEventListener("submit", updatePeriodValue);
  $("periodEntry").elements.period.addEventListener("change", (event) => {
    selectedPeriod = event.target.value;
    render();
  });
  $("downloadCsvReport").addEventListener("click", downloadCsv);
  $("downloadXlsxReport").addEventListener("click", downloadXlsx);
}

function renderReportDataRow(item, period) {
  const g = state.goals.find((goal) => goal.id === item.goalId);
  const p = state.perspectives.find((perspective) => perspective.id === g?.perspectiveId);
  const value = state.values[item.id]?.[period] ?? "";
  const status = monthStatus(item, period);
  return `<tr class="status-${status}">
    <td>${p?.name || ""}</td>
    <td>${g?.name || ""}</td>
    <td>${item.name}</td>
    <td>${item.formula || ""}</td>
    <td>${item.unit || ""}</td>
    <td>${formatValue(value, item.unit)}</td>
    <td>${formatValue(item.target, item.unit)}</td>
    <td><strong class="pct-pill status-${status}">${value === "" ? "-" : `${kpiSuccessPct(item, value)}%`}</strong></td>
    <td>${formatValue(item.lowerThreshold, item.unit)}</td>
    <td>${formatValue(item.upperThreshold, item.unit)}</td>
    <td>${statusLabel(status)}</td>
    <td>${item.visualization || "Gauge"}</td>
    <td>${alarmActivated(item, status) ? "Si" : "No"}</td>
    <td>${status === "red" ? item.correctiveAction : status === "blue" ? item.blueAction : ""}</td>
    <td>${status === "red" ? formatBudget(item.budget) : ""}</td>
  </tr>`;
}

function renderReportPerspective(p) {
  const goals = state.goals.filter((g) => g.perspectiveId === p.id);
  return `<section class="report-perspective" style="--accent:${p.color}"><h3>${p.name}</h3>${goals.map((g) => `<article class="report-goal status-${goalPeriodStatus(g.id, selectedPeriod)}"><strong>${g.name}</strong>${kpisForGoal(g.id).map((item) => `<span class="report-kpi status-${monthStatus(item, selectedPeriod)}">${item.name} · ${statusLabel(monthStatus(item, selectedPeriod))} · ${monthStatus(item, selectedPeriod) === "red" ? formatBudget(item.budget) : ""}</span>`).join("")}</article>`).join("")}</section>`;
}

function diagnosisText() {
  const red = state.kpis.find((item) => monthStatus(item, selectedPeriod) === "red");
  if (!red) return "No hay KPIs en rojo. Revisa los amarillos sostenidos y los azules, porque un azul puede indicar excelencia o un objetivo demasiado facil.";
  const g = state.goals.find((goal) => goal.id === red.goalId);
  const p = state.perspectives.find((perspective) => perspective.id === g?.perspectiveId);
  return `En ${selectedPeriod}, el foco prioritario esta en ${p?.name}, meta "${g?.name}", KPI "${red.name}". Se activa la contramedida "${red.correctiveAction}" con presupuesto ${formatBudget(red.budget)}. Revisa sus flechas del mapa porque puede estar afectando al resto del modelo causa-efecto.`;
}

function renderPeriodKpiCard(item, period) {
  const status = monthStatus(item, period);
  const value = state.values[item.id]?.[period] ?? "";
  const action = status === "red" ? item.correctiveAction : status === "blue" ? item.blueAction : status === "amber" ? "Alerta: seguimiento cercano" : "Enhorabuena: mantener disciplina";
  return `<article class="period-kpi-card status-${status}">
    <div><span class="status-dot"></span><strong>${item.name}</strong><b>${statusLabel(status)}</b></div>
    <p>Valor ${formatValue(value, item.unit)} · objetivo ${formatValue(item.target, item.unit)} · exito ${kpiSuccessPct(item, value)}%</p>
    <small>Umbral rojo ${formatValue(item.lowerThreshold, item.unit)} · umbral superior ${formatValue(item.upperThreshold, item.unit)} · alarma ${alarmActivated(item, status) ? "activada" : "no activada"}</small>
    <em>${action}${status === "red" ? ` · ${formatBudget(item.budget)}` : ""}</em>
  </article>`;
}

function goalPeriodStatus(goalId, period) {
  const statuses = kpisForGoal(goalId).map((item) => monthStatus(item, period));
  if (statuses.includes("red")) return "red";
  if (statuses.includes("amber")) return "amber";
  if (statuses.includes("green")) return "green";
  if (statuses.includes("blue")) return "blue";
  return "empty";
}

function updatePeriodValue(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  selectedPeriod = data.period;
  state.values[data.kpiId] = state.values[data.kpiId] || {};
  state.values[data.kpiId][data.period] = data.value;
  render();
}

function goalOptions() {
  return state.goals.map((g) => `<option value="${g.id}">${g.name}</option>`).join("");
}

function kpisForGoal(goalId) {
  return state.kpis.filter((item) => item.goalId === goalId);
}

function addGoal(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  state.goals.push(goal(`g-${Date.now()}`, data.name, data.perspectiveId, data.owner || "Responsable"));
  render();
}

function perspectiveOptions(selected = "") {
  return state.perspectives.map((p) => `<option value="${p.id}" ${p.id === selected ? "selected" : ""}>${p.name}</option>`).join("");
}

function openGoal(id) {
  selectedGoal = state.goals.find((item) => item.id === id);
  if (!selectedGoal) return;
  const form = $("goalDialogForm");
  $("goalDialogTitle").textContent = selectedGoal.name;
  $("dialogPerspective").innerHTML = perspectiveOptions(selectedGoal.perspectiveId);
  Object.keys(selectedGoal).forEach((key) => {
    if (form.elements[key]) form.elements[key].value = selectedGoal[key] ?? "";
  });
  $("goalDialog").showModal();
}

function saveGoal(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const item = state.goals.find((g) => g.id === data.id);
  if (!item) return;
  Object.assign(item, {
    name: data.name,
    perspectiveId: data.perspectiveId,
    owner: data.owner,
    priority: data.priority,
    description: data.description,
  });
  $("goalDialog").close();
  render();
}

function deleteGoal() {
  if (!selectedGoal) return;
  state.links = state.links.filter((item) => item.source !== selectedGoal.id && item.target !== selectedGoal.id);
  const kpiIds = state.kpis.filter((item) => item.goalId === selectedGoal.id).map((item) => item.id);
  state.kpis = state.kpis.filter((item) => item.goalId !== selectedGoal.id);
  kpiIds.forEach((id) => delete state.values[id]);
  state.goals = state.goals.filter((item) => item.id !== selectedGoal.id);
  $("goalDialog").close();
  render();
}

function addLink(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  if (data.source !== data.target && !state.links.some((item) => item.source === data.source && item.target === data.target)) {
    state.links.push(link(data.source, data.target));
  }
  render();
}

function deleteLink(id) {
  state.links = state.links.filter((item) => item.id !== id);
  render();
}

function addKpi(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  if (kpisForGoal(data.goalId).length >= 2) {
    alert("Esta meta ya tiene 2 KPIs. La pildora recomienda no pasar de dos para mantener foco directivo.");
    return;
  }
  const id = `k-${Date.now()}`;
  state.kpis.push(kpi(id, data.name, data.goalId, data.unit, Number(data.target), data.direction, "Valor medido frente al objetivo", "Definir contramedida", Number(data.budget || 0)));
  state.values[id] = Object.fromEntries(MONTHS.map((month) => [month, ""]));
  render();
}

function updateValue(event) {
  const { kpiValue, month } = event.target.dataset;
  state.values[kpiValue] = state.values[kpiValue] || {};
  state.values[kpiValue][month] = event.target.value;
  render();
}

function openKpi(id) {
  selectedKpi = state.kpis.find((item) => item.id === id);
  if (!selectedKpi) return;
  const form = $("kpiDialogForm");
  $("kpiDialogTitle").textContent = selectedKpi.name;
  $("dialogGoal").innerHTML = state.goals.map((g) => `<option value="${g.id}" ${g.id === selectedKpi.goalId ? "selected" : ""}>${g.name}</option>`).join("");
  Object.keys(selectedKpi).forEach((key) => {
    if (form.elements[key]) form.elements[key].value = selectedKpi[key] ?? "";
  });
  $("kpiDialog").showModal();
}

function saveKpi(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const item = state.kpis.find((k) => k.id === data.id);
  if (!item) return;
  if (item.goalId !== data.goalId && kpisForGoal(data.goalId).length >= 2) {
    alert("La meta destino ya tiene 2 KPIs.");
    return;
  }
  Object.assign(item, {
    name: data.name, goalId: data.goalId, unit: data.unit, target: Number(data.target), direction: data.direction,
    frequency: data.frequency, source: data.source, metric: data.metric, visualization: data.visualization,
    lowerThreshold: Number(data.lowerThreshold || 0), upperThreshold: Number(data.upperThreshold || 0),
    excellentPct: Number(data.excellentPct || 20), expectedResult: data.expectedResult,
    owner: data.owner, alertRecipient: data.alertRecipient, formula: data.formula,
    correctiveAction: data.correctiveAction, blueAction: data.blueAction,
    budget: Number(data.budget || 0), alertMessage: data.alertMessage,
  });
  $("kpiDialog").close();
  render();
}

function deleteKpi() {
  if (!selectedKpi) return;
  state.kpis = state.kpis.filter((item) => item.id !== selectedKpi.id);
  delete state.values[selectedKpi.id];
  $("kpiDialog").close();
  render();
}

function trackingRows() {
  return state.kpis.map((item) => {
    const g = state.goals.find((goal) => goal.id === item.goalId);
    const p = state.perspectives.find((perspective) => perspective.id === g?.perspectiveId);
    const row = {
      perspectiva: p?.name || "",
      meta: g?.name || "",
      kpi_id: item.id,
      kpi: item.name,
      formula: item.formula,
      fuente: item.source,
      metrica: item.metric,
      unidad: item.unit,
      objetivo: item.target,
      valor_actual: currentValue(item.id),
      porcentaje_exito: kpiSuccessPct(item),
      umbral_rojo: item.lowerThreshold,
      umbral_superior: item.upperThreshold,
      visualizacion: item.visualization,
      sentido: item.direction === "higher" ? "mas alto mejor" : "mas bajo mejor",
      estado: statusLabel(kpiStatus(item)),
      alarma_activada: alarmActivated(item) ? "si" : "no",
      accion_correctora: kpiStatus(item) === "red" ? item.correctiveAction : "",
      accion_azul: item.blueAction,
      presupuesto_k: kpiStatus(item) === "red" ? item.budget : "",
      responsable: item.owner,
      destinatario_alerta: item.alertRecipient,
      resultado_esperado: item.expectedResult,
    };
    MONTHS.forEach((month) => {
      row[month] = state.values[item.id]?.[month] ?? "";
      row[`${month}_estado`] = statusLabel(monthStatus(item, month));
    });
    return row;
  });
}

function downloadCsv() {
  const rows = trackingRows();
  const headers = Object.keys(rows[0] || {});
  const csv = [headers.join(";"), ...rows.map((row) => headers.map((h) => `"${String(row[h] ?? "").replaceAll('"', '""')}"`).join(";"))].join("\n");
  download("DocROI_BSC_KPI_tracking.csv", csv, "text/csv;charset=utf-8");
}

function downloadXlsx() {
  if (!window.XLSX) {
    downloadCsv();
    return;
  }
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(trackingRows()), "Seguimiento KPI");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(state.goals.map((g) => ({ ...g, estado: statusLabel(goalStatus(g.id)) }))), "Metas");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(state.links), "Relaciones");
  XLSX.writeFile(wb, "DocROI_BSC_KPI_tracking.xlsx");
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function resetBlank() {
  state = { perspectives: structuredClone(seed.perspectives), goals: [], links: [], kpis: [], values: {} };
  activeStep = "map";
  render();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

document.addEventListener("click", (event) => {
  const step = event.target.closest("[data-step]");
  if (step) {
    activeStep = step.dataset.step;
    render();
    setTimeout(() => document.querySelector(".work-frame")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }
  const edit = event.target.closest("[data-edit-kpi]");
  if (edit) openKpi(edit.dataset.editKpi);
  const editGoal = event.target.closest("[data-edit-goal]");
  if (editGoal) openGoal(editGoal.dataset.editGoal);
  const deleteLinkButton = event.target.closest("[data-delete-link]");
  if (deleteLinkButton) deleteLink(deleteLinkButton.dataset.deleteLink);
  const anchor = event.target.closest('a[href^="#"]');
  if (anchor) {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});

$("loadDemo").addEventListener("click", () => {
  state = structuredClone(seed);
  render();
});
$("resetBlank").addEventListener("click", resetBlank);
$("kpiDialogForm").addEventListener("submit", saveKpi);
$("deleteKpi").addEventListener("click", deleteKpi);
$("goalDialogForm").addEventListener("submit", saveGoal);
$("deleteGoal").addEventListener("click", deleteGoal);
window.addEventListener("resize", drawRelationLines);

render();
