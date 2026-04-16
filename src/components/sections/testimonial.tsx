import React from 'react'
const testimonials = [
   {
      img: "https://avatar.vercel.sh/karthik",
      quote: "EldoraUI's components make building UIs effortless great work!",
      name: "Karthik",
      role: "Developer",
   },
   {
      img: "https://avatar.vercel.sh/nick",
      quote: "EldoraUI simplifies complex designs with ready-to-use components.",
      name: "Nick",
      role: "Designer",
   },
]

const testimonial = () => {
   return (
      <div>
         <FancyTestimonialsSlider testimonials={testimonials} autorotateTiming={5000} />
      </div>
   )
}

export default testimonial
