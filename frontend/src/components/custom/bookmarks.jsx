import React from "react";

// ill use this for now as temp data, will rework later
const bookmarkData = [
  { name: "Google", url: "https://www.google.com/xxxxx", icon: "", pinned: true },
  { name: "GitHub", url: "https://github.com/", icon: "", pinned: true },
  { name: "YouTube", url: "https://www.youtube.com/", icon: "", pinned: false },
  { name: "Stack Overflow XXXXXXXX", url: "https://stackoverflow.com/", icon: "", pinned: true },
  { name: "Reddit", url: "https://www.reddit.com/", icon: "", pinned: false },
  { name: "Notion", url: "https://www.notion.so/", icon: "", pinned: true },
  { name: "Figma", url: "https://www.figma.com/", icon: "", pinned: false },
  { name: "Netflix", url: "https://www.netflix.com/", icon: "", pinned: false },
];

function BookmarksPanel({ className = "" }) {
  return (
    <div className={`${className} text-white`}>
      <div className="grid grid-cols-6 gap-4">
        {bookmarkData.map((data) => {
          if (!data.pinned) return;
          const faviconUrl = `${new URL(data.url).origin}/favicon.ico`;
          // https://stackoverflow.com/questions/9126105/blank-image-encoded-as-data-uri
          const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

          return (
            <div
              className="h-24 w-24 flex flex-col justify-center items-center hover:bg-white/5 hover:backdrop-blur-md rounded-md hover:shadow-xl p-2 cursor-pointer"
              onClick={() => (window.location.href = data.url)}
            >
              <div className="bg-white p-2 rounded-full">
                <img
                  className="rounded-full h-6 w-6"
                  src={faviconUrl}
                  alt={data.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = transparentPixel;
                  }}
                />
              </div>

              <span className="text-xs mt-1 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
                {data.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookmarksPanel;
