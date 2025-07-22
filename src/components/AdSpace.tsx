
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AdSpaceProps {
  variant?: 'banner' | 'sidebar' | 'inline' | 'sticky';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  title?: string;
}

export const AdSpace = ({ 
  variant = 'sidebar', 
  size = 'medium', 
  className,
  title = "ADVERTISEMENT" 
}: AdSpaceProps) => {
  const getAdDimensions = () => {
    switch (variant) {
      case 'banner':
        return size === 'large' ? 'h-32' : 'h-24';
      case 'sidebar':
        return size === 'large' ? 'h-80' : size === 'medium' ? 'h-60' : 'h-40';
      case 'inline':
        return 'h-48';
      case 'sticky':
        return 'h-20';
      default:
        return 'h-60';
    }
  };

  const getAdWidth = () => {
    switch (variant) {
      case 'banner':
        return 'w-full';
      case 'sidebar':
        return 'w-full';
      case 'inline':
        return 'w-full max-w-2xl mx-auto';
      case 'sticky':
        return 'w-full';
      default:
        return 'w-full';
    }
  };

  return (
    <Card className={cn(
      "card-brutal bg-brutal-secondary relative overflow-hidden",
      getAdDimensions(),
      getAdWidth(),
      variant === 'sticky' && 'fixed bottom-0 left-0 right-0 z-40',
      className
    )}>
      <CardContent className="p-0 h-full flex flex-col items-center justify-center relative">
        <Badge variant="outline" className="absolute top-2 left-2 bg-black text-white border-brutal font-black uppercase text-xs">
          {title}
        </Badge>
        
        <div className="text-center p-4">
          <div className="text-2xl font-black text-black mb-2 uppercase tracking-wider">
            YOUR AD HERE
          </div>
          <div className="text-sm font-black text-black uppercase">
            {variant === 'banner' && "728x90 BANNER"}
            {variant === 'sidebar' && "300x250 SIDEBAR"}
            {variant === 'inline' && "NATIVE AD SPACE"}
            {variant === 'sticky' && "STICKY FOOTER AD"}
          </div>
        </div>

        {/* Brutal decorative elements */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-brutal-accent border-l-brutal border-b-brutal"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 bg-brutal-primary border-r-brutal border-t-brutal"></div>
      </CardContent>
    </Card>
  );
};
