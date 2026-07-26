import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Fake data ──────────────────────────────────────────────────────────────
const athletes = [
  { name: 'Valentina Torres', cat: 'Junior A', pay: true,  att: 94 },
  { name: 'Sebastián Mora',   cat: 'Juvenil',  pay: true,  att: 88 },
  { name: 'Camila Ríos',      cat: 'Junior B', pay: false, att: 71 },
  { name: 'Diego Herrera',    cat: 'Junior A', pay: true,  att: 97 },
  { name: 'Laura Gómez',      cat: 'Infantil', pay: false, att: 83 },
];

const kpis = [
  { label: 'Atletas activos', value: '78',   sub: '+3 este mes',  color: 'text-blue-400' },
  { label: 'Cobros al día',   value: '91%',  sub: '7 pendientes', color: 'text-emerald-400' },
  { label: 'Asistencia',      value: '88%',  sub: 'esta semana',  color: 'text-violet-400' },
  { label: 'Próxima comp.',   value: '8d',   sub: 'Liga regional',color: 'text-orange-400' },
];

const schedule = [
  { day: 'LUN', sessions: ['Velocidad 6am', 'Técnica 4pm'] },
  { day: 'MAR', sessions: ['Fuerza 6am'] },
  { day: 'MIE', sessions: ['Velocidad 6am', 'Resistencia 4pm'] },
  { day: 'JUE', sessions: ['Descanso activo'] },
  { day: 'VIE', sessions: ['Velocidad 6am', 'Competencia 4pm'] },
];

const progressPoints = [28.4, 27.9, 27.6, 27.1, 26.8, 26.4, 26.0, 25.7];
const compLabels    = ['Abr','May','May','Jun','Jun','Jul','Jul','Ago'];

const results = [
  { pos: 1, name: 'V. Torres',  club: 'Club Élite',    time: '25.74', rec: true  },
  { pos: 2, name: 'A. Martínez',club: 'Academia Sprint',time: '26.01', rec: false },
  { pos: 3, name: 'S. Mora',    club: 'Club Élite',    time: '26.18', rec: false },
  { pos: 4, name: 'C. López',   club: 'Velocidad CF',  time: '26.34', rec: false },
  { pos: 5, name: 'D. Herrera', club: 'Club Élite',    time: '26.55', rec: false },
];

// ── Chart SVG ──────────────────────────────────────────────────────────────
function ProgressChart() {
  const W = 320, H = 120, pad = 20;
  const min = Math.min(...progressPoints) - 0.3;
  const max = Math.max(...progressPoints) + 0.3;
  const pts = progressPoints.map((v, i) => ({
    x: pad + (i / (progressPoints.length - 1)) * (W - pad * 2),
    y: pad + ((max - v) / (max - min)) * (H - pad * 2),
  }));
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const area = `${d} L${pts[pts.length-1].x},${H-pad} L${pts[0].x},${H-pad} Z`;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">Tiempo 500m (seg)</span>
        <span className="text-emerald-400 font-bold">↓ -2.74s mejora total</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#chartGrad)" />
        <path d={d} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3.5" fill="#10b981" />
            <text x={p.x} y={H - 4} textAnchor="middle" fill="#64748b" fontSize="8">{compLabels[i]}</text>
            <text x={p.x} y={p.y - 7} textAnchor="middle" fill="#e2e8f0" fontSize="7.5" fontWeight="600">
              {progressPoints[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── Tab content ────────────────────────────────────────────────────────────
const tabs = [
  {
    id: 'admin',
    label: '📊 Admin',
    content: () => (
      <div className="space-y-4">
        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl bg-white/5 border border-white/8 p-3">
              <div className={`text-xl font-black ${k.color}`}>{k.value}</div>
              <div className="text-white text-xs font-semibold mt-0.5">{k.label}</div>
              <div className="text-slate-500 text-[10px] mt-0.5">{k.sub}</div>
            </div>
          ))}
        </div>
        {/* Athlete table */}
        <div className="rounded-xl border border-white/8 overflow-hidden">
          <div className="px-4 py-2.5 bg-white/5 border-b border-white/6 flex justify-between items-center">
            <span className="text-white text-xs font-bold">Atletas recientes</span>
            <span className="text-slate-500 text-[10px]">Ver todos →</span>
          </div>
          <div className="divide-y divide-white/5">
            {athletes.map((a) => (
              <div key={a.name} className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-black">
                    {a.name[0]}
                  </div>
                  <div>
                    <div className="text-white text-xs font-semibold">{a.name}</div>
                    <div className="text-slate-500 text-[10px]">{a.cat}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-[10px]">{a.att}% asist.</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${a.pay ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                    {a.pay ? 'Al día' : 'Vencido'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'coach',
    label: '🏋️ Entrenador',
    content: () => (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-bold text-sm">Semana actual</div>
            <div className="text-slate-400 text-xs">Julio 21 – 26, 2026</div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            8 atletas hoy
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {schedule.map((d) => (
            <div key={d.day} className={`rounded-xl border p-2.5 text-center ${d.day === 'VIE' ? 'border-orange-500/40 bg-orange-950/20' : 'border-white/8 bg-white/4'}`}>
              <div className={`text-xs font-black mb-2 ${d.day === 'VIE' ? 'text-orange-400' : 'text-slate-400'}`}>{d.day}</div>
              <div className="space-y-1">
                {d.sessions.map((s) => (
                  <div key={s} className="text-[9px] text-slate-300 bg-white/6 rounded px-1 py-0.5 leading-tight">{s}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-white/8 bg-white/4 p-4 space-y-3">
          <div className="text-white text-xs font-bold">Asistencia hoy — Viernes AM</div>
          <div className="space-y-2">
            {athletes.slice(0, 4).map((a, i) => (
              <div key={a.name} className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${i < 3 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>
                  {i < 3 ? '✓' : '–'}
                </div>
                <span className="text-slate-300 text-xs flex-1">{a.name}</span>
                <span className="text-slate-500 text-[10px]">{a.cat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'athlete',
    label: '🛼 Atleta',
    content: () => (
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-xl font-black text-white">VT</div>
          <div>
            <div className="text-white font-black text-sm">Valentina Torres</div>
            <div className="text-slate-400 text-xs">Junior A · #1 ranking club</div>
            <div className="flex gap-2 mt-1">
              {['Velocidad', 'Sprint', 'Resistencia'].map((t) => (
                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/20">{t}</span>
              ))}
            </div>
          </div>
        </div>
        <ProgressChart />
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Mejor tiempo', value: '25.74s', color: 'text-emerald-400' },
            { label: 'Competencias', value: '12',     color: 'text-blue-400' },
            { label: 'Podios',       value: '7',      color: 'text-amber-400' },
          ].map((s) => (
            <div key={s.label} className="text-center p-2.5 rounded-xl bg-white/5 border border-white/8">
              <div className={`text-lg font-black ${s.color}`}>{s.value}</div>
              <div className="text-slate-500 text-[10px]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'results',
    label: '🏆 Resultados',
    content: () => (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-bold text-sm">Liga Regional — 500m</div>
            <div className="text-slate-400 text-xs">Publicado automáticamente · hace 3 min</div>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 font-bold">✓ Auto-publicado</span>
        </div>
        <div className="rounded-xl border border-white/8 overflow-hidden">
          <div className="grid grid-cols-4 px-3 py-2 bg-white/5 border-b border-white/6 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <span>Pos</span><span>Atleta</span><span>Club</span><span className="text-right">Tiempo</span>
          </div>
          <div className="divide-y divide-white/5">
            {results.map((r) => (
              <div key={r.pos} className={`grid grid-cols-4 px-3 py-2.5 items-center ${r.pos === 1 ? 'bg-amber-950/20' : ''}`}>
                <div className="flex items-center gap-1.5">
                  <span className={`text-sm font-black ${r.pos === 1 ? 'text-amber-400' : r.pos === 2 ? 'text-slate-400' : r.pos === 3 ? 'text-orange-700' : 'text-slate-600'}`}>
                    {r.pos === 1 ? '🥇' : r.pos === 2 ? '🥈' : r.pos === 3 ? '🥉' : r.pos}
                  </span>
                </div>
                <span className="text-white text-xs font-semibold">{r.name}</span>
                <span className="text-slate-400 text-[10px]">{r.club}</span>
                <div className="text-right">
                  <span className="text-white text-xs font-mono font-bold">{r.time}s</span>
                  {r.rec && <span className="ml-1 text-[8px] px-1 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">REC</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-slate-500 text-[10px]">
          Resultados notificados a 78 atletas y sus familias de forma automática
        </div>
      </div>
    ),
  },
];

// ── Main component ─────────────────────────────────────────────────────────
export default function AppPreview() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setActive((i) => (i + 1) % tabs.length), 4000);
    return () => clearInterval(t);
  }, [auto]);

  const Tab = tabs[active];

  return (
    <section className="relative py-24 bg-[#080c16] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(59,130,246,0.06),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14 space-y-4">
          <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">Ve el producto real</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Así se ve SpeedSkateTrack{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">por dentro</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Cada rol tiene su vista. El director ve el negocio, el entrenador ve sus atletas, el atleta ve su progreso.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl mx-auto">
          {/* Browser chrome */}
          <div className="rounded-2xl overflow-hidden border border-white/12 shadow-2xl shadow-black/60">
            {/* Browser bar */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#0d1117] border-b border-white/8">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-white/5 border border-white/8">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-400 text-xs font-mono">app.speedskatetrack.com</span>
                </div>
              </div>
            </div>

            {/* Tab bar */}
            <div className="flex border-b border-white/8 bg-[#0a0e18]">
              {tabs.map((t, i) => (
                <button key={t.id}
                  onClick={() => { setActive(i); setAuto(false); }}
                  className={`flex-1 py-3 text-xs font-bold transition-all duration-200 ${
                    active === i
                      ? 'text-white border-b-2 border-blue-400 bg-white/4'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="bg-[#0d1117] p-5 min-h-[360px]">
              <AnimatePresence mode="wait">
                <motion.div key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}>
                  <Tab.content />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Auto-play indicator */}
            <div className="px-5 py-3 bg-[#0a0e18] border-t border-white/6 flex items-center justify-between">
              <div className="flex gap-1.5">
                {tabs.map((_, i) => (
                  <button key={i} onClick={() => { setActive(i); setAuto(false); }}
                    className={`h-1 rounded-full transition-all duration-300 ${active === i ? 'w-6 bg-blue-400' : 'w-2 bg-white/15'}`} />
                ))}
              </div>
              <button onClick={() => setAuto(!auto)}
                className="text-slate-500 text-[10px] hover:text-slate-300 transition-colors">
                {auto ? '⏸ Pausar' : '▶ Auto'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom callout */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 max-w-2xl mx-auto text-center space-y-2">
          <p className="text-slate-400 text-sm">
            Todo lo que ves es <strong className="text-white">información real de tu club</strong>, actualizada en tiempo real.
            Sin importar dónde estés.
          </p>
          <button onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold underline underline-offset-4 transition-colors">
            Quiero ver mi club así →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
