import { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 80,
  fill = false,
  sizes = "100vw",
  placeholder = "empty",
  blurDataURL,
  onLoad,
  onError
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : "");
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    skip: priority
  });

  // Generate responsive srcSet for different screen sizes
  const generateSrcSet = (baseSrc: string) => {
    const breakpoints = [640, 768, 1024, 1280, 1536];
    return breakpoints
      .map(bp => `${baseSrc}?w=${bp}&q=${quality} ${bp}w`)
      .join(", ");
  };

  useEffect(() => {
    if (priority || inView) {
      setCurrentSrc(src);
    }
  }, [src, priority, inView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const imageClasses = cn(
    "transition-opacity duration-300",
    {
      "opacity-0": !isLoaded && placeholder === "blur",
      "opacity-100": isLoaded || placeholder === "empty",
      "object-cover": fill,
      "w-full h-full": fill,
    },
    className
  );

  return (
    <div
      ref={ref}
      className={cn("relative", {
        "w-full h-full": fill,
      })}
      style={!fill ? { width, height } : undefined}
    >
      {placeholder === "blur" && blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className={cn("absolute inset-0 w-full h-full object-cover", className)}
          aria-hidden="true"
        />
      )}
      
      {currentSrc && !hasError && (
        <img
          ref={imgRef}
          src={currentSrc}
          srcSet={generateSrcSet(currentSrc)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      
      {hasError && (
        <div className={cn("flex items-center justify-center bg-muted text-muted-foreground", className)}>
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};