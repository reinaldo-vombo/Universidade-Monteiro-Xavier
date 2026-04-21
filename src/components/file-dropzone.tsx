// components/FileDropzone/FileDropzone.tsx
import React, { useCallback, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from './ui/button'

// ── Types ──────────────────────────────────────────────────────────
type AcceptType = 'images' | 'documents' | 'all'

const ACCEPT_MAP: Record<AcceptType, string> = {
   images: 'image/*',
   documents: '.pdf,.doc,.docx',
   all: '*/*',
}

const ACCEPT_LABEL: Record<AcceptType, string> = {
   images: 'PNG, JPG, WEBP',
   documents: 'PDF, DOC, DOCX',
   all: 'Qualquer ficheiro',
}

interface FileDropzoneProps {
   value?: File[] | null
   onChange: (files: File[] | null) => void
   multiple?: boolean
   accept?: AcceptType
   maxSizeMB?: number        // default: 10
   label?: string
   error?: string
}

// ── Helpers ────────────────────────────────────────────────────────
function formatSize(bytes: number): string {
   if (bytes < 1024) return `${bytes} B`
   if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
   return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getFileIcon(file: File): React.ReactNode {
   if (file.type.startsWith('image/')) return <IconImage />
   if (file.type === 'application/pdf') return <IconPdf />
   return <IconFile />
}

// ── Component ──────────────────────────────────────────────────────
export function FileDropzone({
   value,
   onChange,
   multiple = false,
   accept = 'all',
   maxSizeMB = 10,
   label,
   error,
}: FileDropzoneProps) {
   const inputRef = useRef<HTMLInputElement>(null)
   const [dragging, setDragging] = useState(false)
   const [sizeError, setSizeError] = useState<string | null>(null)

   const maxBytes = maxSizeMB * 1024 * 1024

   const processFiles = useCallback((fileList: FileList | null) => {
      if (!fileList) return
      setSizeError(null)

      const files = Array.from(fileList)
      const tooBig = files.filter(f => f.size > maxBytes)

      if (tooBig.length) {
         setSizeError(`${tooBig.map(f => f.name).join(', ')} ${tooBig.length > 1 ? 'excedem' : 'excede'} ${maxSizeMB}MB`)
         return
      }

      const next = multiple
         ? [...(value ?? []), ...files]
         : [files[0]]

      onChange(next.length ? next : null)
   }, [value, multiple, maxBytes, onChange])

   const onDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      processFiles(e.dataTransfer.files)
   }, [processFiles])

   const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true) }
   const onDragLeave = () => setDragging(false)

   const removeFile = (index: number) => {
      if (!value) return
      const next = value.filter((_, i) => i !== index)
      onChange(next.length ? next : null)
      setSizeError(null)
   }

   const hasFiles = value && value.length > 0
   const displayError = error ?? sizeError

   return (
      <div className="space-y-3">
         {label && (
            <p className="text-xs tracking-[0.15em] text-white/40 uppercase">{label}</p>
         )}

         {/* Drop zone */}
         <motion.div
            onClick={() => inputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            animate={dragging ? { scale: 1.01 } : { scale: 1 }}
            transition={{ duration: 0.15 }}
            className={`relative flex flex-col items-center justify-center gap-3
            rounded-2xl border-2 border-dashed cursor-pointer
            transition-all duration-200 py-4 md:py-10 px-6 text-center
            ${dragging
                  ? 'border-white/40 bg-white/8'
                  : displayError
                     ? 'border-red-500/40 bg-red-500/4 hover:border-red-500/60'
                     : 'border-white/15 bg-black hover:border-white/30 hover:bg-black/90'
               }`}
         >
            {/* Upload icon */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center
                         transition-colors duration-200
                         ${dragging ? 'bg-white/15' : 'bg-white/8'}`}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  className={dragging ? 'text-white' : 'text-white/40'}
                  stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V4M8 8l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </div>

            <div>
               <p className="text-sm text-white/70 font-medium hidden lg:block">
                  {dragging ? 'Solta aqui' : 'Arrasta ou clica para seleccionar'}
               </p>
               <p className="text-xs text-white/30 mt-1">
                  {ACCEPT_LABEL[accept]} · Máx. {maxSizeMB}MB
                  {multiple ? ' · Múltiplos ficheiros' : ''}
               </p>
            </div>

            <input
               ref={inputRef}
               type="file"
               multiple={multiple}
               accept={ACCEPT_MAP[accept]}
               className="hidden"
               onChange={e => processFiles(e.target.files)}
               // Reset so the same file can be re-selected after removal
               onClick={e => { (e.target as HTMLInputElement).value = '' }}
            />
         </motion.div>
         {/* File list */}
         <AnimatePresence>
            {hasFiles && (
               <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
               >
                  {value!.map((file, i) => {
                     const isImage = file.type.startsWith('image/')
                     const previewUrl = isImage ? URL.createObjectURL(file) : null

                     return (
                        <motion.li
                           key={`${file.name}-${i}`}
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: 10 }}
                           transition={{ delay: i * 0.04 }}
                           className="flex items-center gap-4 bg-black border border-white/8
                             rounded-xl px-4 py-3 group"
                        >
                           {/* Preview / icon */}
                           <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0
                                  bg-white/8 flex items-center justify-center">
                              {previewUrl ? (
                                 <img
                                    src={previewUrl}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                 />
                              ) : (
                                 <span className="text-white/30">{getFileIcon(file)}</span>
                              )}
                           </div>

                           {/* Info */}
                           <div className="flex-1 min-w-0">
                              <p className="text-sm text-white font-medium truncate">{file.name}</p>
                              <p className="text-xs text-white/30 mt-0.5">{formatSize(file.size)}</p>
                           </div>

                           {/* Remove */}
                           <Button
                              type="button"
                              variant={'destructive'}
                              onClick={() => removeFile(i)}
                              aria-label="Remover ficheiro"
                           >
                              <X className='text-red-500' />
                           </Button>
                        </motion.li>
                     )
                  })}
               </motion.ul>
            )}
         </AnimatePresence>
      </div>
   )
}

// ── Icons ──────────────────────────────────────────────────────────
function IconImage() {
   return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5">
         <rect x="3" y="3" width="18" height="18" rx="3" />
         <circle cx="8.5" cy="8.5" r="1.5" />
         <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
   )
}

function IconPdf() {
   return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5">
         <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round" />
         <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
         <path d="M9 13h1a1 1 0 010 2H9v-4h1a1 1 0 011 1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
   )
}

function IconFile() {
   return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5">
         <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round" />
         <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
   )
}
