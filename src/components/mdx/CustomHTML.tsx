import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CustomHTMLProps extends HTMLAttributes<HTMLDivElement> {
  html: string;
}

export function CustomHTML({ html, className, ...rest }: CustomHTMLProps) {
  return (
    <div
      className={cn("prose prose-sm max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: html }}
      {...rest}
    />
  );
}

export default CustomHTML;

