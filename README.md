### Setup Vite + Tailwind + Shadcn

official shadcn page for vite + tailwind + shadcn
https://ui.shadcn.com/docs/installation/vite

useful video for using it with javascript instead of typescript
https://www.youtube.com/watch?v=gXSC5eMw68o

```bash
npm create vite@latest
# project name: .
# framework: react
# variant: javascript
# rolldown-vite: yes
# install with npm and start now: yes

# this is version 4 tailwind
npm install tailwindcss @tailwindcss/vite

```

src/index.css

```css
@import "tailwindcss";
```

jsconfig.json

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

vite.config.js

```js
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

```bash
npx shadcn@latest init
# base color: Zinc or whatever
```

Try it with adding components

```
npx shadcn@latest add button
```

App.jsx

```jsx
import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <Button>Test Button</Button>
    </>
  );
}

export default App;
```
