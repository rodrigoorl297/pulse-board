const STATUSES = ['healthy', 'degraded', 'down'];
const eventsEl = document.getElementById("events");
const chart = document.getElementById("chart");
const ctx = chart.getContext("2d");

const state = {
  volume: 128,
  sla: 97.4,
  risk: 4,
  status: STATUSES[0],
  dist: [48, 31, 21],
  events: ["Bootstrap do console operacional", "Fonte mock conectada"],
};

function render() {
  document.getElementById("kpi-volume").textContent = state.volume;
  document.getElementById("kpi-sla").textContent = state.sla.toFixed(1) + "%";
  document.getElementById("kpi-risk").textContent = String(state.risk);
  document.getElementById("kpi-status").textContent = state.status;
  eventsEl.innerHTML = state.events.slice(0, 8).map((item) => `<li>${item}</li>`).join("");
  draw();
}

function draw() {
  const w = chart.width, h = chart.height;
  ctx.clearRect(0, 0, w, h);
  const max = Math.max(...state.dist);
  state.dist.forEach((value, i) => {
    const barH = (value / max) * (h - 40);
    const x = 40 + i * 160;
    ctx.fillStyle = i === 0 ? "#22d3ee" : i === 1 ? "#a78bfa" : "#f97316";
    ctx.fillRect(x, h - barH - 20, 90, barH);
    ctx.fillStyle = "#a1a1aa";
    ctx.fillText(STATUSES[i], x, h - 4);
  });
}

document.querySelectorAll("nav button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("nav button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("heading").textContent = btn.textContent;
  });
});

setInterval(() => {
  state.volume += Math.floor(Math.random() * 5);
  state.sla = Math.min(99.9, state.sla + (Math.random() - 0.45) * 0.2);
  state.risk = Math.max(0, state.risk + Math.round(Math.random() * 2 - 1));
  state.status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
  state.dist = state.dist.map((n) => Math.max(8, n + Math.round(Math.random() * 6 - 3)));
  state.events.unshift(new Date().toLocaleTimeString() + " · tick de metricas");
  render();
}, 1600);

render();
