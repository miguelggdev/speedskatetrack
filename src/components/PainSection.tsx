import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const pains = [
  { emoji: '📱', title: 'WhatsApp caótico', desc: 'Grupos de padres llenos de dudas, mensajes perdidos y preguntas que ya respondiste 10 veces esta semana.' },
  { emoji: '📊', title: 'Excel desactualizado', desc: 'Datos de atletas en hojas que nadie actualiza, que se pierden, que no se comparten y que llevan horas mantener.' },
  { emoji: '💸', title: 'Cobros que se pierden', desc: 'Atletas con pagos vencidos que siguen entrenando. Dinero que se te escapa sin que te des cuenta mes a mes.' },
  { emoji: '😤', title: 'Padres desinformados', desc: 'Llamadas a cualquier hora preguntando horarios, resultados o si su hijo asistió. Tú de secretario, no de director.' },
  { emoji: '🕐', title: 'Resultados tardíos', desc: 'Tres días para publicar los resultados de la última competencia. Los atletas preguntan, tú buscas las planillas.' },
  { emoji: '📋', title: 'Reportes a mano', desc: 'El directivo del club pide un informe mensual y pasas horas armando tablas, copiando datos y haciendo sumas.' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

export default function PainSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-24 bg-[#06080f] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(239,68,68,0.05),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14 space-y-5"
        >
          <div className="flex justify-center">
            <span className="section-label section-label-red">⚡ ¿Te suena familiar?</span>
          </div>
          <h2 className="heading-xl text-white">
            La realidad de gestionar<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              un club sin las herramientas correctas
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Si te identificas con alguno de estos problemas, no estás solo. El 87% de los directivos de clubes deportivos admiten que pierden más de 15 horas semanales en tareas administrativas.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {pains.map((p) => (
            <motion.div
              key={p.title}
              variants={item}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl border border-red-900/30 bg-red-950/[0.12] p-6
                hover:border-red-700/50 hover:bg-red-950/25
                hover:shadow-lg hover:shadow-red-950/40
                transition-all duration-300 overflow-hidden cursor-default"
            >
              {/* Subtle red glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle at 20% 30%, rgba(239,68,68,0.07), transparent 65%)' }} />

              <div className="relative">
                {/* Emoji in styled container */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-950/50 border border-red-900/40 text-2xl mb-4 group-hover:border-red-800/60 transition-colors duration-200">
                  {p.emoji}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </div>

              {/* Animated red pulse dot */}
              <div className="absolute top-4 right-4 w-2.5 h-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500/80" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bridge to solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center p-8 sm:p-10 rounded-3xl border border-white/8 bg-gradient-to-r from-blue-950/40 to-cyan-950/30 backdrop-blur-sm"
        >
          <p className="text-2xl sm:text-3xl font-black text-white mb-3">
            Hay una forma mejor. Y es más fácil de lo que crees.
          </p>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Miles de horas de trabajo se pueden automatizar. Tu trabajo es dirigir el club — no administrar el caos.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#how')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-7 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base shadow-xl shadow-blue-500/30 hover:shadow-blue-500/45 transition-shadow duration-200"
          >
            Muéstrame la solución →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
