import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { demo1, demo2, demo3, demo4, demo5, demo6, demo7 } from "@/assets/images";
import { cn } from "../../lib/utils";

interface Element {
   id: number;
   height: number;
   img: string;
}

interface Column {
   id: number;
   elements: Element[];
}

const items: Column[] = [
   {
      id: 4,
      elements: [
         { id: 4, height: 300, img: demo1 },
         { id: 5, height: 250, img: demo2 },
      ],
   },
   {
      id: 5,
      elements: [
         { id: 6, height: 150, img: demo3 },
         { id: 7, height: 100, img: demo4 },
         { id: 8, height: 150, img: demo5 },
      ],
   },
   {
      id: 6,
      elements: [
         { id: 9, height: 300, img: demo6 },
         { id: 10, height: 250, img: demo7 },
      ],
   },
];

const SnapShots: React.FC = () => {
   const [activeItem, setActiveItem] = useState<Element | null>(null);

   const handleItemClick = (ele: Element) => {
      setActiveItem(ele);
   };

   const allElements = items.flatMap((column) => column.elements);

   return (
      <div className="w-full center relative h-full overflow-hidden">
         <motion.div
            layout
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full flex-col  gap-10"
         >
            <motion.div
               className="w-full gap-2 flex items-start justify-center"
               layout
               transition={{ duration: 0.5, ease: "easeInOut" }}
            >
               {items.map((column) => (
                  <motion.div
                     className={cn(
                        "w-48 flex flex-col items-center justify-center gap-2"
                     )}
                     key={column.id}
                     layout
                     animate={{
                        opacity: activeItem !== null ? 0 : 1,
                        willChange: "auto",
                     }}
                  >
                     {column.elements.map((ele, index) => (
                        <Gallery
                           item={ele}
                           key={index}
                           onClick={() => setActiveItem(ele)}
                        />
                     ))}
                  </motion.div>
               ))}
            </motion.div>
         </motion.div>
         {activeItem && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1, willChange: "auto" }}
               transition={{ duration: 0.5, ease: "easeInOut" }}
               className="absolute inset-0 w-full h-full overflow-hidden"
            >
               <AnimatePresence mode="popLayout">
                  <motion.div
                     key={activeItem.id}
                     className="w-full h-full flex items-center justify-center gap-10 flex-col overflow-hidden "
                     transition={{ duration: 0.5, ease: "easeInOut" }}
                     layout
                  >
                     <motion.div
                        layoutId={`card-${activeItem.id}`}
                        className="w-150 h-100  rounded-3xl relative  cursor-pointer overflow-hidden"
                        onClick={() => setActiveItem(null)}
                     >
                        <img
                           src={activeItem.img}
                           alt=""
                           width={600}
                           height={400}
                           className="object-cover"
                        />
                     </motion.div>
                     <motion.div
                        className="flex flex-row gap-4 justify-center items-center"
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                     >
                        {allElements
                           .filter((ele) => ele.id !== activeItem.id)
                           .map((ele) => (
                              <Gallery
                                 key={ele.id}
                                 item={ele}
                                 onClick={() => handleItemClick(ele)}
                                 isSmall
                              />
                           ))}
                     </motion.div>
                  </motion.div>
               </AnimatePresence>
            </motion.div>
         )}
      </div>
   );
};

const Gallery = (props: {
   item: Element;
   onClick: () => void;
   isSmall?: boolean;
}) => {
   return (
      <motion.div
         style={{
            height: props.isSmall ? 100 : props.item.height,
            width: props.isSmall ? 100 : 192,
         }}
         className={cn(
            "rounded-2xl cursor-pointer center overflow-hidden",
            props.isSmall ? "w-25" : "w-full"
         )}
         layoutId={`card-${props.item.id}`}
         onClick={props.onClick}
      >
         {/* <motion.img
            src={props.item.img}
            alt=""
            className="w-full object-cover h-full"
            whileHover={{ scale: 1.05 }}
            transition={{
               duration: 0.3,
            }}
         /> */}
         <motion.div className="w-full relative object-cover h-full"
            whileHover={{ scale: 1.05 }}
            transition={{
               duration: 0.3,
            }}>
            <Image src={props.item.img} className="object-cover" fill sizes="100%" alt={`preview-${props.item.id}`} />
         </motion.div>
      </motion.div>
   );
};

export default SnapShots;