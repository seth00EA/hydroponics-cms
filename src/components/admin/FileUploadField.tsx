"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type FileUploadFieldProps = {
    label?: string;
    hint?: string;
    accept?: string;
    name?: string;
    className?: string;
};

export function FileUploadField({
    label = "Image file",
    hint = "PNG, JPG, or WebP up to 5MB",
    accept = "image/*",
    name = "image_file",
    className,
}: FileUploadFieldProps) {
    const [fileName, setFileName] = useState<string | null>(null);
    const [dragOver, setDragOver] = useState(false);

    return (
        <div className={className}>
            {label && <p className="mb-2 text-sm font-medium text-foreground">{label}</p>}

            <label
                className={cn(
                    "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
                    dragOver
                        ? "border-primary bg-primary-light/40"
                        : "border-card-border bg-muted-bg/50 hover:border-primary/50 hover:bg-muted-bg",
                )}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const file = e.dataTransfer.files[0];
                    if (file) setFileName(file.name);
                }}
            >
                <svg className="mb-3 h-10 w-10 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>

                <span className="text-sm font-medium text-foreground">
                    Drop image here or click to browse
                </span>
                <span className="mt-1 text-xs text-muted">{hint}</span>

                <input
                    type="file"
                    name={name}
                    accept={accept}
                    className="sr-only"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        setFileName(file?.name ?? null);
                    }}
                />
            </label>

            {fileName && (
                <p className="mt-2 text-sm text-primary">
                    Selected: <span className="font-medium">{fileName}</span>
                </p>
            )}
        </div>
    );
}