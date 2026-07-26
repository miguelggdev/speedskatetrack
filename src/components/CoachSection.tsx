import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = [
  {
    id: 'director',
    avatar: '👨‍💼',
    name: 'Carlos Morales',
    role: 'Director del Club',
    color: 'from-blue-500 to-cyan-400',
    border: 'border-blue-500/30',
    glow: 'shadow-blue-500/20',
    tagline: '"Sé exactamente cómo va el club sin moverme de mi silla"',
    what: 'Lo que Carlos ve todos los días',
    features: [
      { icon: '📊', title: 'Dashboard en tiempo real', desc: 'Pagos, asistencia, competencias y reportes — todo en una pantalla.' },
      { icon: '💬', title: 'Asistente IA 24/7', desc: 'Le pregunta al asistente y obtiene respuestas en segundos sin buscar en hojas.' },
      { icon: '📋', title: 'Reportes automáticos', desc: 'El informe mensual llega solo a su email el último día del mes.' },
      { icon: '🔔', title: 'Alertas inteligentes', desc: 'Recibe una alerta cuando hay algo urgente — pagos vencidos, lesiones, ausencias.' },
    ],
    stat: { n: '20h', label: 'semanales recuperadas' },
  },
  {
    id: 'coach',
    avatar: '🧑‍🏫',
    name: 'Andrea Silva',
    role: 'Entrenadora Principal',
    color: 'from-orange-500 to-amber-400',
    border: 'border-orange-500/30',
    glow: 'shadow-orange-500/20',
    tagline: '"Planifico entrenamientos en minutos, no en horas"',
    what: 'Lo que Andrea gestiona desde la app',
    features: [
      { icon: '📅', title: 'Calendario inteligente', desc: 'Crea y modifica el plan semanal desde el celular. Los atletas lo ven al instante.' },
      { icon: '✅', title: 'Control de asistencia', desc: 'Toma lista en 30 segundos. El sistema calcula porcentajes automáticamente.' },
      { icon: '📈', title: 'Progreso por atleta', desc: 'Ve los tiempos y mejoras de cada atleta en gráficas claras. Identifica quién necesita atención.' },
      { icon: '🍎', title: 'Planes de nutrición y gym', desc: 'El asistente genera planes personalizados según el perfil del atleta.' },
    ],
    stat: { n: '3h', label: 'de papeleo ahorradas/día' },
  },
  {
    id: 'parent',
    avatar: '👨‍👩‍👧',
    name: 'Familia Herrera',
    role: 'Padres de atleta',
    color: 'from-emerald-500 to-teal-400',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20',
    tagline: '"Seguimos el progreso de Diego sin molestar al entrenador"',
    what: 'Lo que la familia ve en su app',
    features: [
      { icon: '🗓️', title: 'Horarios siempre actualizados', desc: 'Ven el calendario de la semana en tiempo real. Nunca más preguntar por WhatsApp.' },
      { icon: '🏆', title: 'Resultados al instante', desc: 'Los resultados de la competencia llegan a su teléfono en minutos de terminar la prueba.' },
      { icon: '💳', title: 'Pagos transparentes', desc: 'Ven el estado de su cuenta, historial de pagos y reciben recordatorios amables.' },
      { icon: '📊', title: 'Progreso de su hijo/a', desc: 'Siguen la evolución de tiempos y asistencia. Participan activamente en el proceso.' },
    ],
    stat: { n: '-90%', label: 'consultas por WhatsApp' },
  },
];

export default function CoachSection() {
  const [active, setActive] = useState(0);
  const role = roles[active];

  return (
    <section className="relative py-24 bg-[#06080f] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,rgba(249,115,22,0.04),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14 space-y-4">
          <div className="flex justify-center">
            <span className="section-label section-label-orange">👥 Para cada rol del club</span>
          </div>
          <h2 className="heading-xl text-white">
            Diseñado para{' '}
            <span className="gradient-text-orange">todos en el club</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            SpeedSkateTrack no es solo para el director. El entrenador, los padres y los atletas tienen su propia experiencia.
          </p>
        </motion.div>

        {/* Role selector */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          {roles.map((r, i) => (
            <motion.button key={r.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
              onClick={() => setActive(i)}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border font-bold text-sm transition-all duration-200 ${
                active === i
                  ? `border-transparent bg-gradient-to-r ${r.color} text-white shadow-xl ${r.glow}`
                  : 'border-white/10 bg-white/4 text-slate-400 hover:text-white hover:border-white/20'
              }`}>
              <span className="text-2xl">{r.avatar}</span>
              <div className="text-left">
                <div className="font-black">{r.name}</div>
                <div className={`text-xs font-medium ${active === i ? 'text-white/75' : 'text-slate-500'}`}>{r.role}</div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className={`rounded-3xl border ${role.border} bg-white/3 overflow-hidden`}>

            {/* Header */}
            <div className={`px-8 py-6 bg-gradient-to-r ${role.color} bg-opacity-10 border-b border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center text-3xl shadow-xl`}>
                  {role.avatar}
                </div>
                <div>
                  <div className="text-white font-black text-xl">{role.name}</div>
                  <div className="text-slate-300 text-sm">{role.role}</div>
                  <div className="text-slate-400 text-sm italic mt-1">{role.tagline}</div>
                </div>
              </div>
              <div className="text-center px-6 py-3 rounded-2xl bg-white/8 border border-white/10">
                <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${role.color}`}>
                  {role.stat.n}
                </div>
                <div className="text-slate-400 text-xs">{role.stat.label}</div>
              </div>
            </div>

            {/* Features grid */}
            <div className="p-8">
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-6">{role.what}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {role.features.map((f, i) => (
                  <motion.div key={f.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="group p-4 rounded-2xl border border-white/8 bg-white/4 hover:border-white/15 hover:bg-white/6 transition-all duration-200">
                    <div className="text-3xl mb-3">{f.icon}</div>
                    <div className="text-white font-bold text-sm mb-1.5">{f.title}</div>
                    <div className="text-slate-400 text-xs leading-relaxed">{f.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Todos los roles incluidos en todos los planes. Sin costo adicional.
          </p>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-base shadow-xl shadow-orange-500/30">
            Empieza gratis — todos acceden desde el día 1 →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
