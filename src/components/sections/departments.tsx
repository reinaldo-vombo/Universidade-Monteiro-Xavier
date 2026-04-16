import React, { useRef } from 'react'
import { TDepartemantProps } from '../../types'
import { useScroll } from 'framer-motion';
import { ScrollCard } from '../layout/scroll-card';

const CARD_COLORS = [
   '#D5FF37', // lima
   '#7DD6FF', // azul céu
   '#FFA0B0', // rosa
   '#FFA17B', // pêssego
   '#B8F5A0', // verde menta
   '#FFE57B', // amarelo
   '#C4B5FD', // lavanda
   '#6EE7B7', // esmeralda
]

export function getCardColor(index: number): string {
   return CARD_COLORS[index % CARD_COLORS.length]
}

const Departments = ({ data }: TDepartemantProps) => {

   const container = useRef(null);
   const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end end']
   })
   return (
      <div ref={container}>
         <div className="container">
            <p className="text-xs tracking-[0.2em] opacity-60 mb-4 uppercase">Departamentos/Cursos</p>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium mb-12">
               Os nossos deptamentos
            </h2>
         </div>
         {data && data.map((dep, i) => {
            const targetScale = 1 - (data.length - i) * 0.05

            return (
               <ScrollCard
                  key={dep.id}
                  data={dep}
                  i={i}
                  color={getCardColor(i)}
                  progress={scrollYProgress}
                  range={[i * (1 / data.length), 1]}
                  targetScale={targetScale}
               />
            )
         })}
      </div>
   )
}

export default Departments;
