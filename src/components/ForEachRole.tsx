import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const roles = [
  {
    icon: '👨‍💼',
    name: 'Director del Club',
    badge: 'Administración',
    color: 'from-blue-500 to-cyan-400',
    border: 'border-blue-500/20',
    glow: 'rgba(59,130,246,0.10)',
    accent: 'text-blue-400',
    accentBg: 'bg-blue-500/10',
    story:
      'Carlos llegaba cada lunes con 40 mensajes sin leer, tres padres esperando respuesta y sin saber cuántos pagos faltaban del mes. Ahora abre el celular y el club ya trabajó mientras él dormía.',
    tasks: [
      { before: 'Armar el informe mensual a mano (4 horas)', after: 'Llega solo a tu correo el último día del mes' },
      { before: 'Llamar uno por uno a los atletas que deben', after: 'El sistema les avisa y gestiona el cobro por ti' },
      { before: 'Responder mensajes repetidos de padres', after: 'El asistente responde las preguntas frecuentes solo' },
      { before: 'No saber cómo va el club hasta fin de mes', after: 'En cualquier momento ves el estado real del club' },
    ],
    stat: { value: '20h', desc: 'recuperadas cada semana' },
  },
  {
    icon: '🛼',
    name: 'Entrenador',
    badge: 'Cuerpo técnico',
    color: 'from-orange-500 to-amber-400',
    border: 'border-orange-500/20',
    glow: 'rgba(249,115,22,0.10)',
    accent: 'text-orange-400',
    accentBg: 'bg-orange-500/10',
    story:
      'Andrea pasaba sus tardes editando PDF de horarios que los atletas perdían o ignoraban. Ahora escribe el plan en 10 minutos desde el teléfono y todos lo ven al instante — sin imprimir nada.',
    tasks: [
      { before: 'Pasar lista en papel o por WhatsApp', after: 'Control de asistencia en 30 segundos desde el celular' },
      { before: 'Adivinar quién mejoró y quién no', after: 'Ves la evolución de tiempos de cada atleta en una gráfica' },
      { before: 'Crear planes de entrenamiento en Word', after: 'El asistente te genera una propuesta que tú ajustas' },
      { before: 'Buscar en carpetas qué entrenaste hace 2 meses', after: 'Todo tu historial de sesiones organizado y buscable' },
    ],
    stat: { value: '3h', desc: 'de papeleo menos por día' },
  },
  {
    icon: '💳',
    name: 'Coordinador Financiero',
    badge: 'Finanzas',
    color: 'from-emerald-500 to-teal-400',
    border: 'border-emerald-500/20',
    glow: 'rgba(16,185,129,0.10)',
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    story:
      'Sandra tenía una hoja de Excel que solo ella entendía, y meses donde no recordaba quién había pagado. Hoy cierra el mes en 15 minutos. El sistema hizo el trabajo incómodo por ella.',
    tasks: [
      { before: 'Rastrear manualmente quién pagó este mes', after: 'El sistema lleva el registro solo — siempre actualizado' },
      { before: 'Llamar a los morosos sintiéndote incómoda', after: 'Recordatorios automáticos, amables y en el momento justo' },
      { before: 'Generar recibos de pago uno por uno', after: 'Se generan solos en el momento en que confirmas el pago' },
      { before: 'Cuadrar cuentas el último día del mes', after: 'El reporte financiero ya está listo cuando lo necesitas' },
    ],
    stat: { value: '0', desc: 'morosos sin gestionar' },
  },
  {
    icon: '⛸️',
    name: 'Deportista',
    badge: 'Atleta',
    color: 'from-violet-500 to-purple-400',
    border: 'border-violet-500/20',
    glow: 'rgba(139,92,246,0.10)',
    accent: 'text-violet-400',
    accentBg: 'bg-violet-500/10',
    story:
      'Valentina no sabía sus tiempos de hace 3 meses ni cuántas competencias habían quedado. Ahora revisa su progreso en 2 minutos — sin pedirle información al entrenador ni al director.',
    tasks: [
      { before: 'Preguntar los horarios de la semana por WhatsApp', after: 'Calendario siempre actualizado en tu teléfono' },
      { before: 'Esperar días para conocer tus resultados', after: 'Los resultados te llegan solos, minutos después de competir' },
      { before: 'No tener idea si estás mejorando', after: 'Ves tu progresión de tiempos en una gráfica propia' },
      { before: 'Llamar al club para consultar tu estado de pago', after: 'Ves tu cuenta y pagas directo desde la app' },
    ],
    stat: { value: '100%', desc: 'de tu historial visible' },
  },
  {
    icon: '👨‍👩‍👧',
    name: 'Familia del Atleta',
    badge: 'Padres',
    color: 'from-pink-500 to-rose-400',
    border: 'border-pink-500/20',
    glow: 'rgba(236,72,153,0.10)',
    accent: 'text-pink-400',
    accentBg: 'bg-pink-500/10',
    story:
      'Los Herrera mandaban mensaje al entrenador cada semana: horarios, si su hijo había asistido, el estado del pago. Hoy abren la app y ven todo — sin molestar a nadie.',
    tasks: [
      { before: 'Preguntar horarios por WhatsApp a las 9pm', after: 'El calendario está en tu app, actualizado en tiempo real' },
      { before: 'Esperar 2-3 días para ver los resultados', after: 'Te llega una notificación cuando terminan de publicar' },
      { before: 'No saber si tu hijo asistió al entrenamiento', after: 'Notificación automática de asistencia ese mismo día' },
      { before: 'Pagar en efectivo sin saber si llegó bien', after: 'Confirmas el pago y recibes tu recibo al instante' },
    ],
    stat: { value: '-90%', desc: 'mensajes al entrenador' },
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
};

function ArrowRight() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0 text-slate-600" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ForEachRole() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="relative py-24 bg-[#080c16] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(59,130,246,0.04),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-5"
        >
          <div className="flex justify-center">
            <span className="section-label section-label-blue">🧑‍🤝‍🧑 Para cada persona del club</span>
          </div>
          <h2 className="heading-xl text-white">
            Así cambia el día a día{' '}
            <span className="gradient-text-orange">de cada rol</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            No importa si eres el director, el entrenador, el financiero, el atleta o la mamá de Diego —
            SpeedSkateTrack quita exactamente lo que te molesta a ti.
          </p>
        </motion.div>

        {/* Role cards grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {roles.map((role) => (
            <motion.div
              key={role.name}
              variants={item}
              className={`group relative rounded-3xl border ${role.border} bg-white/[0.025] overflow-hidden
                hover:border-white/15 hover:-translate-y-1
                hover:shadow-2xl hover:shadow-black/40
                transition-all duration-300`}
            >
              {/* Ambient glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at 30% 20%, ${role.glow}, transparent 65%)` }}
              />
              {/* Top accent */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${role.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative p-7 space-y-6">
                {/* Role header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                      {role.icon}
                    </div>
                    <div>
                      <div className="text-white font-black text-lg leading-tight">{role.name}</div>
                      <div className={`inline-flex items-center mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-widest ${role.accentBg} ${role.accent}`}>
                        {role.badge}
                      </div>
                    </div>
                  </div>
                  {/* Stat bubble */}
                  <div className="flex-shrink-0 text-center">
                    <div className={`text-2xl font-black ${role.accent} tabular-nums`}>{role.stat.value}</div>
                    <div className="text-slate-500 text-[10px] leading-tight max-w-[70px]">{role.stat.desc}</div>
                  </div>
                </div>

                {/* Story */}
                <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-white/10 pl-4 italic">
                  "{role.story}"
                </p>

                {/* Before → After tasks */}
                <div className="space-y-3">
                  {role.tasks.map((task, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                      className="flex gap-3"
                    >
                      {/* Before */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 text-red-500/70 text-xs mt-0.5 font-bold">✕</span>
                          <span className="text-slate-500 text-xs leading-relaxed line-through decoration-red-500/40">{task.before}</span>
                        </div>
                      </div>
                      <ArrowRight />
                      {/* After */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <span className={`flex-shrink-0 text-xs mt-0.5 font-bold ${role.accent}`}>✓</span>
                          <span className="text-slate-200 text-xs leading-relaxed">{task.after}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* "What about you?" card */}
          <motion.div
            variants={item}
            className="relative rounded-3xl border border-dashed border-white/15 bg-transparent overflow-hidden
              hover:border-orange-500/30 hover:-translate-y-1
              transition-all duration-300 flex flex-col items-center justify-center p-8 text-center space-y-4 min-h-[300px]"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
              🤔
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-black text-lg">¿Tienes un rol diferente?</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                Federaciones, médicos de club, coordinadores técnicos… si gestionas un club de patinaje, tenemos algo para ti.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-xl border border-orange-500/40 text-orange-400 text-sm font-bold
                hover:bg-orange-500/10 transition-all duration-200"
            >
              Cuéntanos tu caso →
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Bottom strip — key message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 rounded-2xl border border-white/8 bg-white/[0.02] p-7 sm:p-8 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="text-4xl">💡</div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-white font-black text-lg sm:text-xl mb-2">
              Nadie tiene que aprender a "usar software"
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Cada persona del club ve solo lo que necesita ver. El director ve el negocio, el entrenador ve sus atletas,
              la mamá ve a su hijo. Sin menús complicados, sin manuales, sin capacitaciones de 3 horas.
              Si sabes usar el celular, ya sabes usar SpeedSkateTrack.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-shrink-0 px-7 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500
              text-white font-black text-sm shadow-xl shadow-orange-500/30 whitespace-nowrap"
          >
            Probarlo gratis →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
