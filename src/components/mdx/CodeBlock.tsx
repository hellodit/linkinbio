"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { Copy, Check, Maximize2, X } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  startingLineNumber?: number;
  highlightLines?: number[];
  className?: string;
  maxHeight?: string;
}

export function CodeBlock({
  children,
  language = "text",
  title,
  showLineNumbers = false,
  startingLineNumber = 1,
  highlightLines = [],
  className,
  maxHeight = "400px",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { theme } = useTheme();
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const toggleLightbox = () => {
    setIsLightboxOpen(!isLightboxOpen);
  };

  const style = theme === "dark" ? oneDark : oneLight;

  const CodeContent = ({ isFullScreen = false }: { isFullScreen?: boolean }) => (
    <SyntaxHighlighter
      language={language}
      style={style}
      showLineNumbers={showLineNumbers}
      startingLineNumber={startingLineNumber}
      lineNumberStyle={{
        minWidth: "3em",
        paddingRight: "1em",
        color: theme === "dark" ? "#6b7280" : "#9ca3af",
        borderRight: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
        marginRight: "1em",
      }}
      wrapLines={true}
      lineProps={(lineNumber: number) => {
        const isHighlighted = highlightLines.includes(lineNumber);
        return {
          style: {
            backgroundColor: isHighlighted 
              ? (theme === "dark" ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)")
              : "transparent",
            padding: "0 1rem",
          },
        };
      }}
      customStyle={{
        margin: 0,
        fontSize: isFullScreen ? "16px" : "14px",
        lineHeight: "1.5",
        padding: isFullScreen ? "2rem" : "1rem",
        background: theme === "dark" ? "#1e1e1e" : "#ffffff",
        minWidth: "100%",
        maxHeight: isFullScreen ? "none" : maxHeight,
        overflow: isFullScreen ? "visible" : "auto",
      }}
    >
      {children}
    </SyntaxHighlighter>
  );

  return (
    <>
      <div className={cn("relative group w-full max-w-full", className)}>
        {/* Header with title and action buttons */}
        {(title || true) && (
          <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border rounded-t-lg">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {title && (
                <span className="text-sm font-medium text-foreground truncate">
                  {title}
                </span>
              )}
              <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded flex-shrink-0">
                {language}
              </span>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLightbox}
                className="h-7 px-2 text-xs"
                title="View full screen"
              >
                <Maximize2 className="w-3 h-3" />
                <span className="hidden sm:inline ml-1">View</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-7 px-2 text-xs"
                title="Copy code"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span className="hidden sm:inline ml-1">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="hidden sm:inline ml-1">Copy</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Code block with constrained width and height */}
        <div className="rounded-b-lg overflow-hidden border border-border/60">
          <div 
            className="overflow-auto"
            style={{ maxHeight }}
          >
            <div className="min-w-full w-fit">
              <CodeContent />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-background rounded-lg shadow-2xl border border-border overflow-hidden">
            {/* Lightbox Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted">
              <div className="flex items-center gap-3">
                {title && (
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {title}
                  </h3>
                )}
                <span className="text-sm text-muted-foreground bg-background px-3 py-1 rounded-full">
                  {language}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="ml-2">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="ml-2">Copy</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLightbox}
                  className="text-xs"
                >
                  <X className="w-4 h-4" />
                  <span className="ml-2">Close</span>
                </Button>
              </div>
            </div>

            {/* Lightbox Content */}
            <div className="overflow-auto max-h-[calc(90vh-80px)]">
              <CodeContent isFullScreen />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CodeBlock;
