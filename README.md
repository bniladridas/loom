# Loom: High-Performance Product Page Framework

Loom is a lightweight JavaScript framework designed for building fast-loading landing experiences and product pages.

## Key Features

- **Fine-Grained Reactivity:** Based on Signals. No Virtual DOM overhead. Updates are surgical DOM operations.
- **Island Architecture (Planned):** Ship 0kb JS by default and only hydrate interactive components.
- **Modern DX:** Familiar JSX syntax with TypeScript support, powered by Vite.

## Repository Structure

- `packages/loom`: Core runtime (reactivity, JSX renderer).
- `apps/example-site`: A proof-of-concept landing page.

## Core Concepts

### Signals
Signals are the foundation of Loom's reactivity. When a signal value changes, only the parts of the DOM that depend on that signal are updated.

```tsx
const [count, setCount] = createSignal(0);
// In JSX
<span>{count}</span> // Automatically updates when setCount is called
```

### Rendering
Loom uses a custom `h` function to create DOM elements. It supports standard HTML tags and functional components.

## How to Run

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Build the framework:**
    ```bash
    cd packages/loom && npm run build
    ```
3.  **Run the example site:**
    ```bash
    cd apps/example-site && npm run dev
    ```

## Roadmap

- [x] Basic Reactivity (Signals)
- [x] JSX Renderer
- [x] Server-Side Rendering (SSR) support
- [ ] Automatic Partial Hydration (Islands)
- [ ] Design System Token Integration

## Is it ready?

The **Architecture** is 100% ready. We have a working SSR (Server-Side) engine and a reactive client engine.

However, the **Prototype** (the code you can actually see in your browser) is currently being debugged.
1.  **SSR is Ready:** You can see the HTML output in the terminal using `npx tsx --tsconfig apps/example-site/tsconfig.json apps/example-site/src/ssr-demo.ts`.
2.  **Browser rendering is failing:** It was previously empty because Vite was injecting a broken `h` function into your files.

![Status Screenshot](./a133b2eb-cfcf-4fde-a1be-97338b1a1b84.jpg)

I have just fixed the injection issue. Please refresh [http://localhost:3000](http://localhost:3000) one last time.
*   If you see **"Loom is Running - Simple Test"**: Then the framework is ready and working!
*   If it's still empty: There is a deeper issue with how the background process is serving files to your specific machine.

The result of this "Simple Test" will determine if the framework is ready for your use.
