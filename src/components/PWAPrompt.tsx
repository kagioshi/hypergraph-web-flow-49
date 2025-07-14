import { usePWA } from "@/hooks/usePWA";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PWAPrompt = () => {
  const { 
    isInstallable, 
    isOnline, 
    isUpdateAvailable, 
    installPrompt, 
    updateApp 
  } = usePWA();
  const { toast } = useToast();

  const handleInstall = async () => {
    try {
      await installPrompt();
      toast({
        title: "App Installing",
        description: "The app is being installed on your device.",
      });
    } catch (error) {
      toast({
        title: "Installation Failed",
        description: "Failed to install the app. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async () => {
    try {
      await updateApp();
      toast({
        title: "App Updated",
        description: "The app has been updated to the latest version.",
      });
    } catch (error) {
      toast({
        title: "Update Failed", 
        description: "Failed to update the app. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isInstallable && !isUpdateAvailable && isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      {/* Offline indicator */}
      {!isOnline && (
        <Card className="mb-2 border-destructive bg-destructive/10">
          <CardContent className="flex items-center gap-2 p-3">
            <WifiOff className="h-4 w-4 text-destructive" />
            <span className="text-sm text-destructive">You're offline</span>
          </CardContent>
        </Card>
      )}

      {/* Online indicator (brief) */}
      {isOnline && (
        <Card className="mb-2 border-success bg-success/10">
          <CardContent className="flex items-center gap-2 p-3">
            <Wifi className="h-4 w-4 text-success" />
            <span className="text-sm text-success">Back online</span>
          </CardContent>
        </Card>
      )}

      {/* Install prompt */}
      {isInstallable && (
        <Card className="mb-2">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Download className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-sm">Install Job Board</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Install our app for a better experience and offline access.
                </p>
                <Button size="sm" onClick={handleInstall} className="w-full">
                  Install App
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Update prompt */}
      {isUpdateAvailable && (
        <Card className="border-primary">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-sm">Update Available</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  A new version of the app is available.
                </p>
                <Button size="sm" onClick={handleUpdate} className="w-full">
                  Update Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};