import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import SettingsBookmarks from "./settings-bookmarks";

const weatherTemperatureUnits = ["celsius", "fahrenheit"];
// const weatherWindSpeedUnits = ["km", "ms", "mph", "kn"];
const weatherWindSpeedUnits = { "km/s": "kms", "m/s": "ms", mph: "mph", knot: "kn" };

function SettingsPanel({ settingsObject, setSettingsObject, searchEngines, defaultSettings }) {
  const [isEditBookmark, setIsEditBookmark] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="text-white bg-transparent hover:bg-white/5 hover:backdrop-blur-2xl cursor-pointer"
        >
          <Settings />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-96 border-none bg-white/5 backdrop-blur-2xl p-0">
        <ScrollArea className="h-full p-6">
          <SheetHeader>
            <SheetTitle className="text-white text-2xl">Settings</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <Separator className="bg-white/20" />

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

            {/* Display Greeting Message */}
            <div className="flex items-center justify-between transition-all duration-300 hover:bg-white/20 p-4 rounded">
              <div>
                <Label className="text-white/90 font-semibold">Display Greeting</Label>
                <Label className="text-white/50">Show greeting in dashboard</Label>
              </div>

              <Switch
                checked={settingsObject.displayGreeting}
                onCheckedChange={(value) => setSettingsObject((prev) => ({ ...prev, displayGreeting: value }))}
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
                      <SelectItem value={engine} key={engine}>
                        {engine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="bg-white/20" />

            {/* Bookmark Settings */}
            <h2 className="mb-4 text-white/80 uppercase text-xs tracking-wide">Bookmark Settings</h2>

            {/* Display Bookmarks */}
            <div className="flex items-center justify-between transition-all duration-300 hover:bg-white/20 p-4 rounded">
              <div>
                <Label className="text-white/90 font-semibold">Display Bookmark</Label>
                <Label className="text-white/50">Show bookmark in dashboard</Label>
              </div>

              <Switch
                checked={settingsObject.bookmark}
                onCheckedChange={(value) => setSettingsObject((prev) => ({ ...prev, bookmark: value }))}
              />
            </div>

            {/* Display Bookmarks */}
            <div className="flex items-center justify-between transition-all duration-300 hover:bg-white/20 p-4 rounded">
              <div>
                <Label className="text-white/90 font-semibold">Edit Bookmark</Label>
                <Label className="text-white/50">Changes to bookmarks</Label>
              </div>

              <Button variant="ghost" className={"text-white"} onClick={() => setIsEditBookmark(true)}>
                <SquarePen />
              </Button>
            </div>

            <SettingsBookmarks
              settingsObject={settingsObject}
              setSettingsObject={setSettingsObject}
              isEditBookmark={isEditBookmark}
              setIsEditBookmark={setIsEditBookmark}
            />

            <Separator className="bg-white/20" />

            {/* Weather Settings */}
            <h2 className="mb-4 text-white/80 uppercase text-xs tracking-wide">Weather Settings</h2>

            {/* Display Weather */}
            <div className="flex items-center justify-between transition-all duration-300 hover:bg-white/20 p-4 rounded">
              <div>
                <Label className="text-white/90 font-semibold">Display Weather</Label>
                <Label className="text-white/50">Show weather in dashboard</Label>
              </div>

              <Switch
                checked={settingsObject.weather}
                onCheckedChange={(value) => setSettingsObject((prev) => ({ ...prev, weather: value }))}
              />
            </div>

            {/* Temperature Unit */}
            <div className="flex items-center justify-between transition-all duration-300 hover:bg-white/20 p-4 rounded">
              <div>
                <Label className="text-white/90 font-semibold">Temperature Unit</Label>
                <Label className="text-white/50">Temperature unit to use</Label>
              </div>

              <div>
                <Select
                  value={settingsObject.temperatureUnit}
                  onValueChange={(value) => setSettingsObject((prev) => ({ ...prev, temperatureUnit: value }))}
                >
                  <SelectTrigger className="bg-white/10 text-white border-white/20 w-28">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>

                  <SelectContent className="capitalize">
                    {weatherTemperatureUnits.map((unit) => (
                      <SelectItem value={unit} key={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Wind Speed Unit */}
            <div className="flex items-center justify-between transition-all duration-300 hover:bg-white/20 p-4 rounded">
              <div>
                <Label className="text-white/90 font-semibold">Wind Speed Unit</Label>
                <Label className="text-white/50">Wind speed unit to use</Label>
              </div>

              <div>
                <Select
                  value={settingsObject.windSpeedUnit}
                  onValueChange={(value) => setSettingsObject((prev) => ({ ...prev, windSpeedUnit: value }))}
                >
                  <SelectTrigger className="bg-white/10 text-white border-white/20 w-28">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>

                  <SelectContent className="">
                    {Object.entries(weatherWindSpeedUnits).map(([key, value]) => (
                      <SelectItem value={value} key={value}>
                        {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="bg-white/20" />
            <h2 className="mb-4 text-white/80 uppercase text-xs tracking-wide">Other Settings</h2>

            <div className="flex items-center justify-between transition-all duration-300 hover:bg-white/20 p-4 rounded">
              <div>
                <Label className="text-white/90 font-semibold">Reset User Settings</Label>
                <Label className="text-white/50">Reset all settings except bookmarks</Label>
              </div>

              <Button
                variant=""
                onClick={() => {
                  setSettingsObject((prev) => ({
                    ...defaultSettings,
                    bookmarkData: prev.bookmarkData,
                  }));
                }}
                className="w-28 hover:bg-red-800 hover:text-white"
              >
                Reset
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default SettingsPanel;
