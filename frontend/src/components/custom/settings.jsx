import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings } from "lucide-react";

function SettingsPanel({ settingsObject, setSettingsObject }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="text-white">
          <Settings />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-96 border-none bg-white/5 backdrop-blur-2xl text-white p-0">
        <ScrollArea className="h-full p-6">
          <SheetHeader>
            <SheetTitle className="text-white text-2xl">Settings</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Clock Settings */}
            <h2 className="mb-4 text-white/80 uppercase text-xs tracking-wide">Clock Settings</h2>

            {/* Clock */}
            <div className="flex items-center justify-between transition-all duration-300 hover:bg-white/20 p-4 rounded">
              <div>
                <Label className="text-white/90 font-semibold">Clock</Label>
                <Label className="text-white/50">Show time in dashboard</Label>
              </div>

              <Switch
                checked={settingsObject.clock}
                onCheckedChange={(value) => setSettingsObject((prev) => ({ ...prev, clock: value }))}
              />
            </div>

            {/* 24 Hour */}
            <div className="flex items-center justify-between transition-all duration-300 hover:bg-white/20 p-4 rounded">
              <div>
                <Label className="text-white/90 font-semibold">24 Hour Clock</Label>
                <Label className="text-white/50">Switch between 12h & 24h format</Label>
              </div>

              <Switch
                checked={settingsObject["24hourClock"]}
                onCheckedChange={(value) => setSettingsObject((prev) => ({ ...prev, ["24hourClock"]: value }))}
              />
            </div>

            <Separator className="bg-white/20" />

            {/* Search Settings */}
            <h2 className="mb-4 text-white/80 uppercase text-xs tracking-wide">Search Settings</h2>

            <div className="flex items-center justify-between transition-all duration-300 hover:bg-white/20 p-4 rounded">
              <div>
                <Label className="text-white/90 font-semibold">Search</Label>
                <Label className="text-white/50">Show search in dashboard</Label>
              </div>

              <Switch
                checked={settingsObject.search}
                onCheckedChange={(value) => setSettingsObject((prev) => ({ ...prev, search: value }))}
              />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default SettingsPanel;
