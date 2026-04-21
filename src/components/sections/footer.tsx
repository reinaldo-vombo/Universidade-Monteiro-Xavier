import React from 'react'
import { Separator } from '../ui/separator'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'



const NAV = [
  {
    heading: 'Instituição',
    links: [
      { label: 'Sobre nós', to: '/sobre' },
      { label: 'Missão e visão', to: '/sobre#missao' },
      { label: 'Reitoria', to: '/sobre#reitoria' },
      { label: 'Departamentos', to: '/departamentos' },
    ],
  },
  {
    heading: 'Académico',
    links: [
      { label: 'Cursos', to: '/cursos' },
      { label: 'Calendário académico', to: '/calendario' },
      { label: 'Biblioteca', to: '/biblioteca' },
      { label: 'Bolsas de estudo', to: '/bolsas' },
    ],
  },
  {
    heading: 'Admissão',
    links: [
      { label: 'Exames de acesso', to: '/exames-de-acesso' },
      { label: 'Fases dos exames', to: '/exames-de-acesso/fases-dos-exames' },
      { label: 'Registos', to: '/exames-de-acesso/registos' },
      { label: 'Propinas', to: '/propinas' },
    ],
  },
]

const STATS = [
  { value: '12k+', label: 'Estudantes' },
  { value: '48', label: 'Cursos' },
  { value: '6', label: 'Faculdades' },
  { value: '27', label: 'Anos' },
]

const SOCIAL = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <div
      className="relative bg-black text-white"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className="relative h-[calc(100vh+500px)] -top-[100vh]">
        <div className="sticky top-[calc(100vh-500px)]">
          <div className="container mx-auto px-6 md:px-16 pt-16 pb-10 space-y-12">

            {/* Top — logo + stats */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
              <div className="shrink-0 mt-4">
                <Link to="/">
                  <StaticImage
                    src="../../images/logo.png"
                    alt={`${process.env.GATSBY_UNIVERCITY_NAME} logotipo`}
                    width={120}
                    height={120}
                  />
                </Link>
                {/* <p className="text-xs text-white/35 mt-4 max-w-[200px] leading-relaxed">
                  Formando líderes para o desenvolvimento de Angola desde 1997.
                </p> */}
              </div>

              {/* Stats */}
              <div className="flex gap-10 flex-wrap">
                {STATS.map(s => (
                  <div key={s.label} className="text-center">
                    <p className="text-3xl font-light text-white">{s.value}</p>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-white/35 mt-1">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Links + contacto */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {NAV.map(col => (
                <div key={col.heading}>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-white/35 mb-4">
                    {col.heading}
                  </p>
                  <ul className="space-y-2.5">
                    {col.links.map(l => (
                      <li key={l.to}>
                        <Link
                          to={l.to}
                          className="text-[13px] text-white/60 hover:text-white
                                     transition-colors duration-200"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Contacto */}
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-white/35 mb-4">
                  Contacto
                </p>
                <ul className="space-y-2.5">
                  <li className="text-[13px] text-white/60">Luanda, Angola</li>
                  <li className="text-[13px] text-white/60">Rua da Missão, 123</li>
                  <li>
                    <a href="mailto:geral@universidade.ao"
                      className="text-[13px] text-white/60 hover:text-white transition-colors">
                      geral@universidade.ao
                    </a>
                  </li>
                  <li>
                    <a href="tel:+244222000000"
                      className="text-[13px] text-white/60 hover:text-white transition-colors">
                      +244 222 000 000
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Bottom bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center
                            justify-between gap-4">
              <span className="text-xs text-white/30">
                © {new Date().getFullYear()} {process.env.GATSBY_UNIVERCITY_NAME}.
                Todos os direitos reservados.
              </span>
              <span className="text-xs text-white/30">
                Feito por{' '}
                <span className="text-white/55">Reinaldo Vombo</span>
              </span>
              <div className="flex gap-4">
                {SOCIAL.map(s => (
                  <a key={s.label} href={s.href} aria-label={s.label}
                    className="text-white/35 hover:text-white/80 transition-colors">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}