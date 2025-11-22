import React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SquarePen, Ellipsis, Pin, Trash2 } from "lucide-react";

function SettingsBookmarks({ settingsObject, setSettingsObject, isEditBookmark, setIsEditBookmark }) {
  return (
    <Dialog open={isEditBookmark} onOpenChange={setIsEditBookmark}>
      <DialogContent className={"bg-white/5 backdrop-blur-2xl"}>
        <DialogHeader>
          <DialogTitle className={"text-white"}>Edit Bookmarks</DialogTitle>
          <DialogDescription> Add, edit, or remove bookmarks</DialogDescription>
        </DialogHeader>

        <ScrollArea className={"h-64 p-4"}>
          {settingsObject.bookmarkData.map((data) => {
            const faviconUrl = `${new URL(data.url).origin}/favicon.ico`;
            const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
            return (
              <div className="flex flex-row mb-4 items-center">
                <div className="bg-white p-2 rounded-full w-16">
                  <img
                    className="rounded-full h-full w-full"
                    src={faviconUrl}
                    alt={data.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = transparentPixel;
                    }}
                  />
                </div>

                <Input
                  value={data.name}
                  className="ml-4"
                  onChange={(e) =>
                    setSettingsObject((prev) => ({
                      ...prev,
                      bookmarkData: prev.bookmarkData.map((item) =>
                        item.url === data.url ? { ...item, name: e.target.value } : item
                      ),
                    }))
                  }
                />

                <Input
                  value={data.url}
                  className="ml-2"
                  onChange={(e) =>
                    setSettingsObject((prev) => ({
                      ...prev,
                      bookmarkData: prev.bookmarkData.map((item) =>
                        item.url === data.url ? { ...item, url: e.target.value } : item
                      ),
                    }))
                  }
                />

                <div className="ml-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className={"text-white"}>
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          setSettingsObject((prev) => ({
                            ...prev,
                            bookmarkData: prev.bookmarkData.map((item) =>
                              item.url === data.url ? { ...item, pinned: !item.pinned } : item
                            ),
                          }))
                        }
                      >
                        <Pin className={`mr-2 h-4 w-4 ${data.pinned ? "text-yellow-400" : "text-white"}`} />
                        {data.pinned ? "Unpin" : "Pin"}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          setSettingsObject((prev) => ({
                            ...prev,
                            bookmarkData: prev.bookmarkData.filter((item) => item.url !== data.url),
                          }))
                        }
                      >
                        <Trash2 className="mr-2 h-4 w-4 text-red-400" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsBookmarks;
