import { Link } from 'gatsby'
import { CalendarIcon, LocationEditIcon } from 'lucide-react'
import React from 'react'
import { SEO } from '../components/seo'
import Stack from '../components/ui/stack-card'
interface Evento {
  id: string
  title: string
  description: string
  date: string
  endDate?: string
  location: string
  slug: string
  address?: string
  thumbnail: string
  gallery?: string[]
}
interface Props {
  pageContext: { event: Evento }
}
const now = new Date()
const images = ['/unidades/ciencias.jpg', '/unidades/direito.jpg', '/unidades/economia.jpg', '/unidades/engenharia.jpg', '/unidades/jornalismo.jpg']
const EventsPage = ({ pageContext }: Props) => {
  const evento = pageContext.event;

  const gallery = evento.gallery ?? images
  const formattedDate = new Date(now).toLocaleDateString('pt-PT', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  })
  const formattedTime = new Date(now).toLocaleTimeString('pt-PT', {
    hour: '2-digit', minute: '2-digit',
  })
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <div className="container grid grid-cols-12 gap-8 overflow-hidden">
        <div className="md:col-span-7 col-span-12">
          <div
            className=""
            style={{
              viewTransitionName: `evento-image-${evento.id}`,
            } as React.CSSProperties}
          >
            <img
              src={evento.thumbnail}
              alt={evento.title}
              className="h-125 w-full object-cover rounded-b-2xl md:rounded-2xl"
            />
          </div>
        </div>
        <div className="md:col-span-5 col-span-12 space-y-4">
          <p className="text-sm font-medium text-center lg:text-left text-[#0D0D0D] capitalize">
            {formattedDate}
          </p>
          <h1 className="text-4xl md:text-6xl text-center lg:text-left font-light leading-tight tracking-[0.3em]">
            {evento.title}
          </h1>
        </div>

      </div>

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
                <div className='size-74 md:size-127'>
                  <Stack
                    randomRotation={false}
                    sensitivity={200}
                    sendToBackOnClick={true}
                    cards={images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`card-${i + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ))}
                    autoplay={false}
                    autoplayDelay={3000}
                    pauseOnHover={false}
                  />
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
                           min-h-50 flex items-center justify-center"
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
    </div>
  )
}

export default EventsPage
export const Head = ({ pageContext }: Props) => <SEO title={`${pageContext.event.title}`} />
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