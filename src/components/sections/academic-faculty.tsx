import React from 'react'
import { TAcademicFaculty } from '../../types'
import ImageMaskReveal from '../scroll-reveal'
import { FACULTY } from '../../constants/data/unidades'

type TProps = {
   data: TAcademicFaculty[] | undefined
}
const normalize = (text: string) => {
   return text
      .toLowerCase()
      .normalize("NFD") // remove acentos
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/falculdade/g, "faculdade")
      .replace(/\s+/g, "")
      .trim();
};

const AcademicFaculty = ({ data: apiData }: TProps) => {
   const facultyMap = FACULTY.reduce((acc, item) => {
      const key = normalize(item.title);
      acc[key] = item;
      return acc;
   }, {} as Record<string, any>);


   const merged: any = apiData?.map((item) => {
      const key = normalize(item.title);

      const local = facultyMap[key];

      return {
         id: item.id,
         title: local?.title || item.title,

         subTitle: local?.subTitle || "",
         description: local?.description || "Descrição não disponível",
         imageUrl: local?.imageUrl || "/default.jpg",
         accentColor: local?.accentColor || "#000",

         createdAt: item.createdAt,
      };
   });

   const bgColors = ['#EDF9FF', '#FFECF2', '#FFE8DB'];
   return (
      <div className="flex flex-col justify-center h-full">
         <div className="container">
            <p className="text-xs tracking-[0.2em] opacity-60 mb-4 uppercase">Unidades</p>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium mb-12">
               As nossas áreas
            </h2>
         </div>
         <ImageMaskReveal sections={merged} bgColors={bgColors} />;
      </div>
   )
}

export default AcademicFaculty
