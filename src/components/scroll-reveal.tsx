import React from 'react'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
   gsap.registerPlugin(ScrollTrigger);
}
export interface ArchSection {
   id: string;
   title: string;
   description: string;
   linkColor: string;
   subTitle: string;
   imageUrl: any;
   imageAlt: string;
}

export interface ImageMaskRevealProps {
   sections: ArchSection[];
   bgColors?: string[];
}

export default function ImageMaskReveal({ sections, bgColors }: ImageMaskRevealProps) {
   const containerRef = useRef<HTMLDivElement>(null);
   const lenisRef = useRef<Lenis | null>(null);

   useEffect(() => {
      // Initialize Lenis smooth scroll
      const lenis = new Lenis({
         duration: 1.2,
         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         smoothWheel: true,
         gestureOrientation: 'vertical',
         syncTouch: true,
         touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
         lenis.raf(time);
         ScrollTrigger.update();
         requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Set z-index for images
      const imageWrappers = containerRef.current?.querySelectorAll('.arch__right .img-wrapper');
      imageWrappers?.forEach((element) => {
         const order = element.getAttribute('data-index');
         if (order !== null) {
            (element as HTMLElement).style.zIndex = order;
         }
      });

      // Mobile layout handler
      const handleMobileLayout = () => {
         const isMobile = window.matchMedia('(max-width: 768px)').matches;
         const leftItems = gsap.utils.toArray<HTMLElement>('.arch__left .arch__info');
         const rightItems = gsap.utils.toArray<HTMLElement>('.arch__right .img-wrapper');

         if (isMobile) {
            leftItems.forEach((item, i) => {
               item.style.order = (i * 2).toString();
            });
            rightItems.forEach((item, i) => {
               item.style.order = (i * 2 + 1).toString();
            });
         } else {
            leftItems.forEach((item) => {
               item.style.order = '';
            });
            rightItems.forEach((item) => {
               item.style.order = '';
            });
         }
      };

      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
         clearTimeout(resizeTimeout);
         resizeTimeout = setTimeout(handleMobileLayout, 100);
      };

      window.addEventListener('resize', handleResize);
      handleMobileLayout();

      const imgs = gsap.utils.toArray<HTMLImageElement>('.img-wrapper img');
      const colors = bgColors || ['#EDF9FF', '#FFECF2', '#FFE8DB'];

      // GSAP Animation with Media Query
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
         const mainTimeline = gsap.timeline({
            scrollTrigger: {
               trigger: '.arch',
               start: 'top top',
               end: 'bottom bottom',
               pin: '.arch__right',
               scrub: true,
            },
         });

         gsap.set(imgs, {
            clipPath: 'inset(0)',
            objectPosition: '0px 0%',
         });

         imgs.forEach((_, index) => {
            const currentImage = imgs[index];
            const nextImage = imgs[index + 1] ? imgs[index + 1] : null;

            const sectionTimeline = gsap.timeline();

            if (nextImage) {
               sectionTimeline
                  .to(
                     'body',
                     {
                        backgroundColor: colors[index],
                        duration: 1.5,
                        ease: 'power2.inOut',
                     },
                     0
                  )
                  .to(
                     currentImage,
                     {
                        clipPath: 'inset(0px 0px 100%)',
                        objectPosition: '0px 60%',
                        duration: 1.5,
                        ease: 'none',
                     },
                     0
                  )
                  .to(
                     nextImage,
                     {
                        objectPosition: '0px 40%',
                        duration: 1.5,
                        ease: 'none',
                     },
                     0
                  );
            }

            mainTimeline.add(sectionTimeline);
         });
      });

      mm.add('(max-width: 768px)', () => {
         const mbTimeline = gsap.timeline();
         gsap.set(imgs, {
            objectPosition: '0px 60%',
         });

         imgs.forEach((image, index) => {
            const innerTimeline = gsap.timeline({
               scrollTrigger: {
                  trigger: image,
                  start: 'top-=70% top+=50%',
                  end: 'bottom+=200% bottom',
                  scrub: true,
               },
            });

            innerTimeline
               .to(image, {
                  objectPosition: '0px 30%',
                  duration: 5,
                  ease: 'none',
               })
               .to('body', {
                  backgroundColor: colors[index],
                  duration: 1.5,
                  ease: 'power2.inOut',
               });

            mbTimeline.add(innerTimeline);
         });
      });

      // Cleanup
      return () => {
         lenis.destroy();
         window.removeEventListener('resize', handleResize);
         mm.revert();
      };
   }, [bgColors]);

   return (
      <div className="container" ref={containerRef}>
         <div className="spacer"></div>

         <div className="arch">
            <div className="arch__left">
               {sections.map((section, index) => (
                  <div className="arch__info" id={section.id} key={section.id}>
                     <div className="content">
                        <h2 className="header">{section.title}</h2>
                        <p className="desc">{section.description}</p>
                        <div className="buttons-container">
                           <a className="link" href="#" style={{ backgroundColor: section.linkColor }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
                                 <path
                                    fill="#121212"
                                    d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
                                 />
                              </svg>
                              <span>Learn More</span>
                           </a>
                           <a className="link view-btn" href="#" style={{ backgroundColor: section.linkColor }}>
                              <span>View</span>
                           </a>
                        </div>
                        <div className="tags-container">
                           <span className="tag">Sustainable</span>
                           <span className="tag">Eco-Friendly</span>
                           <span className="tag">Modern</span>
                           <span className="tag">Architecture</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            <div className="arch__right">
               {sections.map((section, index) => {
                  return (
                     <div className="img-wrapper" data-index={sections.length - index} key={`img-${section.id}`}>
                        <img
                           src={section.imageUrl}
                           alt={section.imageAlt}
                           width={540}
                           height={400}
                        />
                     </div>
                  )
               })}
            </div>
         </div>

         <div className="spacer"></div>
      </div>
   );
}