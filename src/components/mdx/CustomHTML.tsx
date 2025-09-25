import { HTMLAttributes, ReactNode, cloneElement, isValidElement, ReactElement } from "react";
import { cn } from "@/lib/utils";

interface CustomHTMLProps extends HTMLAttributes<HTMLDivElement> {
  html?: string;
  children?: ReactNode;
}

// Helper function to convert CSS string to React style object
function cssStringToObject(cssString: string): Record<string, string> {
  const styles: Record<string, string> = {};
  cssString.split(';').forEach(style => {
    const [property, value] = style.split(':').map(s => s.trim());
    if (property && value) {
      // Convert kebab-case to camelCase
      const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      styles[camelProperty] = value;
    }
  });
  return styles;
}

// Helper function to process React children and convert style strings to objects
function processChildren(children: ReactNode): ReactNode {
  if (!isValidElement(children)) {
    return children;
  }

  const element = children as ReactElement<Record<string, unknown>>;
  const { style, ...otherProps } = element.props;
  
  // If style is a string, convert it to an object
  let processedStyle = style;
  if (typeof style === 'string') {
    processedStyle = cssStringToObject(style);
  }

  // Recursively process nested children
  const processedChildren = element.props.children ? 
    (Array.isArray(element.props.children) 
      ? element.props.children.map(processChildren)
      : processChildren(element.props.children as ReactNode)
    ) : element.props.children;

  return cloneElement(element, {
    ...otherProps,
    style: processedStyle,
    children: processedChildren
  });
}

export function CustomHTML({ html, children, className, ...rest }: CustomHTMLProps) {
  // If html prop is provided, use dangerouslySetInnerHTML
  if (html) {
    return (
      <div
        className={cn("prose prose-sm max-w-none h-auto", className)}
        dangerouslySetInnerHTML={{ __html: html }}
        {...rest}
      />
    );
  }

  // If children are provided, render them directly
  if (children) {
    const processedChildren = processChildren(children);
    
    return (
      <div
        className={cn("prose prose-sm max-w-none h-auto", className)}
        {...rest}
      >
        {processedChildren}
      </div>
    );
  }

  // If neither is provided, return null
  return null;
}

export default CustomHTML;

