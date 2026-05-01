import React from 'react'
import { EVENTS } from '../../constants/events'
import ExpandableCards from '../layout/expandable-cards'

const Events = () => {
  return (
    <section className='py-25'>
      <div className="container">
        <div>
          <p className="text-xs tracking-[0.2em] opacity-60 mb-4 uppercase">Nosso Eventos</p>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium mb-12">
            Últimos Eventos
          </h2>
        </div>
        <div className='w-full h-125'>
          <ExpandableCards cards={EVENTS} />
        </div>
      </div>
    </section>
  )
}

export default Events
