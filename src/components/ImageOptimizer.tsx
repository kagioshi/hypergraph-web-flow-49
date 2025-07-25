import { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface ImageOptimizerProps {
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

export const ImageOptimizer = ({
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
}: ImageOptimizerProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : "");
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    skip: priority
  });

  // Generate WebP optimized srcSet for different screen sizes
  const generateSrcSet = (baseSrc: string) => {
    const breakpoints = [320, 640, 768, 1024, 1280, 1536];
    const webpSources = breakpoints
      .map(bp => `${baseSrc}?w=${bp}&q=${quality}&f=webp ${bp}w`)
      .join(", ");
    
    const fallbackSources = breakpoints
      .map(bp => `${baseSrc}?w=${bp}&q=${quality} ${bp}w`)
      .join(", ");
    
    return { webp: webpSources, fallback: fallbackSources };
  };

  // Auto compression based on image size
  const getOptimizedQuality = () => {
    if (width && height) {
      const totalPixels = width * height;
      if (totalPixels > 1000000) return 70; // Large images
      if (totalPixels > 500000) return 80;  // Medium images
      return 90; // Small images
    }
    return quality;
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

  const srcSets = currentSrc ? generateSrcSet(currentSrc) : null;
  const optimizedQuality = getOptimizedQuality();

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
        <picture>
          {/* WebP format for modern browsers */}
          <source 
            srcSet={srcSets?.webp}
            sizes={sizes}
            type="image/webp"
          />
          
          {/* Fallback for older browsers */}
          <img
            ref={imgRef}
            src={`${currentSrc}?q=${optimizedQuality}`}
            srcSet={srcSets?.fallback}
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
        </picture>
      )}
      
      {hasError && (
        <div className={cn("flex items-center justify-center bg-muted text-muted-foreground", className)}>
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};