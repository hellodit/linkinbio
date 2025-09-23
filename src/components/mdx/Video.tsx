"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type VideoBaseProps = {
  title?: string;
  aspect?: "16:9" | "4:3" | "1:1" | "21:9";
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

type DirectSrc = {
  src: string;
  youtubeId?: never;
  vimeoId?: never;
};

type YouTubeSrc = {
  youtubeId: string;
  src?: never;
  vimeoId?: never;
};

type VimeoSrc = {
  vimeoId: string | number;
  src?: never;
  youtubeId?: never;
};

export type VideoProps = VideoBaseProps & (DirectSrc | YouTubeSrc | VimeoSrc);

function getAspectClass(aspect: VideoProps["aspect"] = "16:9") {
  switch (aspect) {
    case "4:3":
      return "[--aspect-w:4] [--aspect-h:3]";
    case "1:1":
      return "[--aspect-w:1] [--aspect-h:1]";
    case "21:9":
      return "[--aspect-w:21] [--aspect-h:9]";
    case "16:9":
    default:
      return "[--aspect-w:16] [--aspect-h:9]";
  }
}

export function Video(props: VideoProps) {
  const { className, title, aspect = "16:9", ...rest } = props;

  let resolvedSrc: string;
  if ("src" in props && props.src) {
    resolvedSrc = props.src;
  } else if ("youtubeId" in props && props.youtubeId) {
    const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
    resolvedSrc = `https://www.youtube.com/embed/${props.youtubeId}?${params.toString()}`;
  } else if ("vimeoId" in props && props.vimeoId !== undefined) {
    resolvedSrc = `https://player.vimeo.com/video/${props.vimeoId}`;
  } else {
    throw new Error("Video requires either src, youtubeId, or vimeoId");
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-black/80",
        "[aspect-ratio:var(--aspect-w)/var(--aspect-h)]",
        getAspectClass(aspect),
        className
      )}
      {...rest}
    >
      <iframe
        src={resolvedSrc}
        title={title ?? "Embedded video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}

export default Video;

