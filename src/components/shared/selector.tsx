import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
export type TSelectPros = {
   placeholder: string;
   disabled?: boolean;
   className?: string;
   options: {
      id: string | number;
      label: string | number;
      value: any;
   }[];
   formField: any;
};

const Selector = ({ className, options, placeholder, formField, disabled = false }: TSelectPros) => {

   return (
      <Select onValueChange={(value) => {
         formField.onChange(value);
      }}
         value={formField.value ?? ''} // ensure it is never undefined
         disabled={disabled}>
         <SelectTrigger aria-label={placeholder} className={`${className || 'w-45'}`}>
            <SelectValue placeholder={placeholder} />
         </SelectTrigger>
         <SelectContent>
            {options.map((item,) => (
               <SelectItem
                  key={item.id}
                  value={item.value}
               >
                  {item.label}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default Selector;
