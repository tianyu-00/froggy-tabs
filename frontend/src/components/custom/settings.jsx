import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

function SettingsPanel({ settingsObject, setSettingsObject, searchEngines }) {
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

          <div className="mt-6 space-y-4">
            {/* User Settings */}
            <h2 className="mb-4 text-white/80 uppercase text-xs tracking-wide">User Settings</h2>

            {/* Username */}
            <div className="flex items-center justify-between transition-all duration-300 hover:bg-white/20 p-4 rounded">
              <div>
                <Label className="text-white/90 font-semibold">Name</Label>
                <Label className="text-white/50">Name to display</Label>
              </div>

              <Input
                type="text"
                placeholder="Tian"
                className="w-28"
                defaultValue={settingsObject.name}
                onBlur={(e) => setSettingsObject((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <Separator className="bg-white/20" />

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
                <Label className="text-white/50">Use 24h clock format</Label>
              </div>

              <Switch
                checked={settingsObject["24hourClock"]}
                onCheckedChange={(value) => setSettingsObject((prev) => ({ ...prev, ["24hourClock"]: value }))}
              />
            </div>

            <Separator className="bg-white/20" />

            {/* Search Settings */}
            <h2 className="mb-4 text-white/80 uppercase text-xs tracking-wide">Search Settings</h2>

            {/* Search */}
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

            {/* Search Engine */}
            <div className="flex items-center justify-between transition-all duration-300 hover:bg-white/20 p-4 rounded">
              <div>
                <Label className="text-white/90 font-semibold">Search Engine</Label>
                <Label className="text-white/50">Search engine to use</Label>
              </div>

              <div>
                <Select
                  value={settingsObject.searchEngine}
                  onValueChange={(value) => setSettingsObject((prev) => ({ ...prev, searchEngine: value }))}
                >
                  <SelectTrigger className="bg-white/10 text-white border-white/20 w-28">
                    <SelectValue placeholder="Select engine" />
                  </SelectTrigger>

                  <SelectContent className="capitalize">
                    {Object.keys(searchEngines).map((engine) => (
                      <SelectItem value={engine}>{engine}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default SettingsPanel;
