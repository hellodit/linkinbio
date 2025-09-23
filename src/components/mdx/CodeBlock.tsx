"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  startingLineNumber?: number;
  highlightLines?: number[];
  className?: string;
}

export function CodeBlock({
  children,
  language = "text",
  title,
  showLineNumbers = false,
  startingLineNumber = 1,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
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

  const style = theme === "dark" ? oneDark : oneLight;

  return (
    <div className={cn("relative group w-full", className)}>
      {/* Header with title and copy button */}
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
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-background rounded transition-colors flex-shrink-0"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Code block */}
      <div className="rounded-b-lg overflow-hidden">
        <div className="overflow-x-auto">
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
            lineProps={(lineNumber) => {
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
              fontSize: "14px",
              lineHeight: "1.5",
              padding: "1rem",
              background: theme === "dark" ? "#1e1e1e" : "#ffffff",
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
              whiteSpace: "pre",
            }}
            codeTagProps={{
              style: {
                whiteSpace: "pre",
                maxWidth: "100%",
              }
            }}
          >
            {children}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export default CodeBlock;
