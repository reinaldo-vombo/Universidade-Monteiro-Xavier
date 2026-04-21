import React from 'react'

import {
   Pagination as RootPagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "../ui/pagination"

type Props = {
   page: number;
   totalPages: number;
   onPageChange: (page: number) => void;
};

function getPageRange(current: number, total: number) {
   const delta = 1;
   const range: (number | "...")[] = [];

   for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
   }

   if (current - delta > 2) {
      range.unshift("...");
   }

   if (current + delta < total - 1) {
      range.push("...");
   }

   return [1, ...range, total].filter((v, i, arr) => arr.indexOf(v) === i);
}

export function Pagination({ page, totalPages, onPageChange }: Props) {
   if (totalPages <= 1) return null;

   const pages = getPageRange(page, totalPages);

   return (
      <RootPagination>
         <PaginationContent>

            {/* Previous */}
            <PaginationItem>
               <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                     e.preventDefault();
                     if (page > 1) onPageChange(page - 1);
                  }}
               />
            </PaginationItem>

            {/* Pages */}
            {pages.map((p, i) =>
               p === "..." ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                     <PaginationEllipsis />
                  </PaginationItem>
               ) : (
                  <PaginationItem key={p}>
                     <PaginationLink
                        href="#"
                        isActive={page === p}
                        onClick={(e) => {
                           e.preventDefault();
                           onPageChange(p as number);
                        }}
                     >
                        {p}
                     </PaginationLink>
                  </PaginationItem>
               )
            )}

            {/* Next */}
            <PaginationItem>
               <PaginationNext
                  href="#"
                  onClick={(e) => {
                     e.preventDefault();
                     if (page < totalPages) onPageChange(page + 1);
                  }}
               />
            </PaginationItem>

         </PaginationContent>
      </RootPagination>
   );
}
