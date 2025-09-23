import type { JSX } from "react";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Video } from "./Video";
import { SneakPeek } from "./SneakPeek";
import { cn } from "@/lib/utils";

import { Callout } from "./Callout";
import { FeatureGrid } from "./FeatureGrid";
import { OrderCTA } from "./OrderCTA";
import { CustomHTML } from "./CustomHTML";
import { Highlights } from "./Highlights";

type HeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
type ParagraphProps = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
type ListProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
type ListItemProps = DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>;

type ProductMDXComponents = {
  h2: (props: HeadingProps) => JSX.Element;
  h3: (props: HeadingProps) => JSX.Element;
  p: (props: ParagraphProps) => JSX.Element;
  ul: (props: ListProps) => JSX.Element;
  li: (props: ListItemProps) => JSX.Element;
  Callout: typeof Callout;
  FeatureGrid: typeof FeatureGrid;
  OrderCTA: typeof OrderCTA;
  Video: typeof Video;
  CustomHTML: typeof CustomHTML;
  SneakPeek: typeof SneakPeek;
  Highlights: typeof Highlights;
};

export const productMdxComponents: ProductMDXComponents = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "text-xl font-semibold tracking-tight text-foreground",
        "mt-6 first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "text-lg font-semibold text-foreground",
        "mt-4 first:mt-0",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "text-sm leading-relaxed text-muted-foreground",
        "mt-3 first:mt-0",
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "space-y-2 text-sm text-muted-foreground",
        "mt-3 pl-5 list-disc marker:text-primary",
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("leading-snug", className)} {...props} />
  ),
  Callout,
  FeatureGrid,
  OrderCTA,
  Video,
  CustomHTML,
  SneakPeek,
  Highlights,
};
