import React, { useCallback } from "react";

type FileDropzoneProps = {
   value?: File[] | null;
   onChange: (files: File[] | null) => void;
   multiple?: boolean;
};

export function FileDropzone({
   value,
   onChange,
   multiple = true,
}: FileDropzoneProps) {
   const handleFiles = (files: FileList | null) => {
      if (!files) return;
      const fileArray = Array.from(files);
      onChange(fileArray);
   };

   const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      handleFiles(e.dataTransfer.files);
   }, []);

   return (
      <div className="space-y-4">
         {/* DROP AREA */}
         <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted transition"
            onClick={() => document.getElementById("fileInput")?.click()}
         >
            <p className="text-sm text-muted-foreground">
               Arraste arquivos aqui ou clique para selecionar
            </p>
            <input
               id="fileInput"
               type="file"
               multiple={multiple}
               className="hidden"
               onChange={(e) => handleFiles(e.target.files)}
            />
         </div>

         {/* PREVIEW */}
         {value && value.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {value.map((file, index) => {
                  const isImage = file.type.startsWith("image/");
                  const previewUrl = URL.createObjectURL(file);

                  return (
                     <div
                        key={index}
                        className="border rounded-lg p-2 relative"
                     >
                        {isImage ? (
                           <img
                              src={previewUrl}
                              alt={file.name}
                              className="h-32 w-full object-cover rounded"
                           />
                        ) : (
                           <div className="h-32 flex items-center justify-center text-sm">
                              {file.name}
                           </div>
                        )}

                        {/* REMOVE BUTTON */}
                        <button
                           type="button"
                           onClick={() => {
                              const newFiles = value.filter((_, i) => i !== index);
                              onChange(newFiles.length ? newFiles : null);
                           }}
                           className="absolute top-1 right-1 text-xs bg-black text-white px-2 py-1 rounded"
                        >
                           X
                        </button>
                     </div>
                  );
               })}
            </div>
         )}
      </div>
   );
}