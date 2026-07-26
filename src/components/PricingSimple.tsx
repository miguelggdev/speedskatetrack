import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
  {
    name: 'Starter',
    tagline: 'Para clubes que están empezando',
    priceM: 49,
    priceA: 39,
    athletes: 'Hasta 30 atletas',
    highlights: [
      'Gestión completa de atletas',
      'Cobros y recordatorios automáticos',
      'Calendario de entrenamientos',
      'Notificaciones a padres',
      'Resultados de competencias',
      'Soporte por email',
    ],
    cta: 'Empezar gratis 30 días',
    color: 'from-blue-600 to-cyan-600',
    shadowColor: 'shadow-blue-500/25',
    border: 'border-blue-500/30',
    popular: false,
  },
  {
    name: 'Profesional',
    tagline: 'El favorito de los clubes en crecimiento',
    priceM: 129,
    priceA: 99,
    athletes: 'Hasta 100 atletas',
    highlights: [
      'Todo de Starter incluido',
      'Asistente IA (preguntas y acciones)',
      'Reportes automáticos mensuales',
      'Múltiples entrenadores',
      'App para padres y atletas',
      'Soporte prioritario',
    ],
    cta: 'Empezar gratis 30 días',
    color: 'from-orange-500 to-amber-500',
    shadowColor: 'shadow-orange-500/35',
    border: 'border-orange-500/50',
    popular: true,
  },
  {
    name: 'Club Premium',
    tagline: 'Para federaciones y clubes grandes',
    priceM: 299,
    priceA: 229,
    athletes: 'Atletas ilimitados',
    highlights: [
      'Todo de Profesional incluido',
      'Múltiples sedes',
      'Integración con federación',
      'Branding propio del club',
      'API para integraciones',
      'Gerente de cuenta dedicado',
    ],
    cta: 'Hablar con ventas',
    color: 'from-violet-600 to-purple-600',
    shadowColor: 'shadow-violet-500/25',
    border: 'border-violet-500/30',
    popular: false,
  },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 text-transparent`} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" className={color} strokeWidth="1.5" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" className={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const checkColors: Record<string, string> = {
  Starter: 'text-blue-400',
  Profesional: 'text-orange-400',
  'Club Premium': 'text-violet-400',
};

export default function PricingSimple() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-24 bg-[#080c16] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(249,115,22,0.05),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14 space-y-5"
        >
          <div className="flex justify-center">
            <span className="section-label section-label-orange">💳 Precios transparentes</span>
          </div>
          <h2 className="heading-xl text-white">
            Invierte menos de lo que cuesta{' '}
            <span className="gradient-text-orange">una mensualidad de un atleta</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Sin contratos. Sin sorpresas. Cancela cuando quieras. Y los primeros 30 días son completamente gratis.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <span className={`text-sm font-semibold transition-colors ${!annual ? 'text-white' : 'text-slate-500'}`}>Mensual</span>
            <button
              onClick={() => setAnnual(!annual)}
              aria-label="Cambiar entre facturación mensual y anual"
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${annual ? 'bg-orange-500' : 'bg-white/10'}`}
            >
              <motion.div
                animate={{ x: annual ? 28 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
              />
            </button>
            <span className={`text-sm font-semibold transition-colors ${annual ? 'text-white' : 'text-slate-500'}`}>
              Anual <span className="text-orange-400 font-bold ml-1">(-25%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl border p-7 transition-all duration-300
                ${p.border}
                ${p.popular
                  ? `bg-gradient-to-b from-orange-950/30 to-amber-950/10 shadow-2xl ${p.shadowColor}`
                  : `bg-white/[0.03] hover:shadow-xl hover:shadow-black/40`
                }`}
            >
              {/* Glow ring on popular card */}
              {p.popular && (
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-orange-500/40 via-orange-500/10 to-transparent pointer-events-none" />
              )}

              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 px-5 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-500/40">
                  El más popular
                </div>
              )}

              <div className="relative">
                <div className="mb-6">
                  <h3 className="text-white font-black text-xl mb-1">{p.name}</h3>
                  <p className="text-slate-400 text-sm">{p.tagline}</p>
                </div>

                {/* Animated price */}
                <div className="mb-6">
                  <div className="flex items-end gap-2 h-12 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={annual ? p.priceA : p.priceM}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="text-4xl font-black text-white tabular-nums"
                      >
                        ${annual ? p.priceA : p.priceM}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-slate-500 text-sm mb-1.5">USD/mes</span>
                  </div>
                  {annual && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-emerald-400 text-xs mt-1 font-semibold"
                    >
                      Ahorras ${(p.priceM - p.priceA) * 12} USD al año
                    </motion.div>
                  )}
                  <div className="mt-2 text-sm text-orange-300 font-semibold">{p.athletes}</div>
                </div>

                {/* Styled feature list */}
                <ul className="space-y-2.5 mb-8">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5">
                      <CheckIcon color={checkColors[p.name]} />
                      <span className="text-slate-300 text-sm">{h}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full py-4 rounded-xl font-black text-white text-sm bg-gradient-to-r ${p.color}
                    shadow-lg transition-all duration-200
                    ${p.popular ? `shadow-orange-500/35 hover:shadow-orange-500/50` : 'hover:shadow-lg'}`}
                >
                  {p.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Risk reversal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center space-y-3"
        >
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-slate-400 text-sm">
            {[
              'Sin tarjeta de crédito para empezar',
              'Configuras en 1 día',
              'Garantía de devolución 30 días',
              'Cancela cuando quieras',
            ].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center font-bold">✓</span>
                {t}
              </span>
            ))}
          </div>
          <p className="text-slate-500 text-xs">
            ¿Tienes una federación o más de 500 atletas?{' '}
            <button className="text-orange-400 underline underline-offset-2 hover:text-orange-300 transition-colors">
              Escríbenos para un plan personalizado
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
