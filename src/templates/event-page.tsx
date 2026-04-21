import { Link } from 'gatsby'
import { CalendarIcon, LocationEditIcon } from 'lucide-react'
import React from 'react'
interface Evento {
  id: string
  title: string
  description: string
  date: string
  endDate?: string
  location: string
  address?: string
  thumbnail: string
  gallery?: string[]
}
interface Props {
  pageContext: { event: Evento }
}
const now = new Date()
const EventsPage = ({ pageContext }: Props) => {
  const evento = pageContext.event;
  console.log(evento);

  const gallery = evento.gallery ?? []
  const formattedDate = new Date(now).toLocaleDateString('pt-PT', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  })
  const formattedTime = new Date(now).toLocaleTimeString('pt-PT', {
    hour: '2-digit', minute: '2-digit',
  })
  return (
    <main className="min-h-screen bg-[#F7F5F0]">

      {/* ── Banner ──────────────────────────────────────────────── */}
      <div className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            viewTransitionName: `evento-image-${evento.id}`,
          } as React.CSSProperties}
        >
          <img
            src={evento.thumbnail}
            alt={evento.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay escuro no fundo para o texto */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* Back link */}
        <div className="absolute top-0 left-0 right-0 p-6 md:p-12 z-10">
          <Link
            to="/eventos"
            className="inline-flex items-center gap-2 text-xs tracking-widest
                       text-white/60 uppercase hover:text-white transition-colors"
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Todos os eventos
          </Link>
        </div>

        {/* Título sobre o banner */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
          <div className="max-w-4xl">
            <p className="text-xs tracking-[0.25em] text-white/50 uppercase mb-3">
              Evento
            </p>
            <h1 className="text-4xl md:text-6xl font-light text-white leading-tight tracking-tight">
              {evento.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Corpo ───────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Descrição + galeria + comentários */}
          <div className="lg:col-span-2 space-y-16">

            {/* Descrição */}
            <div>
              <p className="text-xs tracking-[0.2em] text-[#0D0D0D]/35 uppercase mb-6">
                Sobre o evento
              </p>
              <div className="text-lg md:text-xl font-light text-[#0D0D0D]/75
                            leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: evento.description }} />


            </div>

            {/* Galeria */}
            {gallery.length > 0 && (
              <div>
                <p className="text-xs tracking-[0.2em] text-[#0D0D0D]/35 uppercase mb-6">
                  Galeria
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {gallery.map((img, i) => (
                    <div
                      key={i}
                      className={`overflow-hidden rounded-xl bg-[#0D0D0D]/5
                                  ${i === 0 ? 'col-span-2 md:col-span-2 aspect-[16/9]' : 'aspect-square'}`}
                    >
                      <img
                        src={img}
                        alt={`${evento.title} — foto ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105
                                   transition-transform duration-500 cursor-zoom-in"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comentários — Disqus vai aqui */}
            <div>
              <p className="text-xs tracking-[0.2em] text-[#0D0D0D]/35 uppercase mb-6">
                Comentários
              </p>
              <div
                id="disqus_thread"
                className="bg-white border border-[#0D0D0D]/8 rounded-2xl p-8
                           min-h-[200px] flex items-center justify-center"
              >
                <p className="text-sm text-[#0D0D0D]/30">
                  A carregar comentários...
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar — info do evento */}
          <aside className="space-y-4 lg:sticky lg:top-8 self-start">

            {/* Data e hora */}
            <InfoCard icon={<CalendarIcon />} label="Data">
              <p className="text-sm font-medium text-[#0D0D0D] capitalize">
                {formattedDate}
              </p>
              <p className="text-sm text-[#0D0D0D]/50 mt-0.5">{formattedTime}</p>
              {evento.endDate && (
                <p className="text-xs text-[#0D0D0D]/35 mt-1">
                  até {new Date(evento.endDate).toLocaleTimeString('pt-PT', {
                    hour: '2-digit', minute: '2-digit',
                  })}
                </p>
              )}
            </InfoCard>

            {/* Local */}
            <InfoCard icon={<LocationEditIcon />} label="Local">
              <p className="text-sm font-medium text-[#0D0D0D]">{evento.location}</p>
              {evento.address && (
                <p className="text-sm text-[#0D0D0D]/50 mt-0.5">{evento.address}</p>
              )}

            </InfoCard>

            {/* Partilhar */}
            <div className="bg-white border border-[#0D0D0D]/8 rounded-2xl p-6">
              <p className="text-xs tracking-[0.15em] text-[#0D0D0D]/35 uppercase mb-4">
                Partilhar
              </p>
              <div className="flex gap-3">

              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default EventsPage
function InfoCard({ icon, label, children }: {
  icon: React.ReactNode; label: string; children: React.ReactNode
}) {
  return (
    <div className="bg-white border border-[#0D0D0D]/8 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#0D0D0D]/30 w-4 h-4">{icon}</span>
        <p className="text-xs tracking-[0.15em] text-[#0D0D0D]/35 uppercase">{label}</p>
      </div>
      {children}
    </div>
  )
}