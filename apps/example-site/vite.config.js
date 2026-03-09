import { defineConfig } from 'vite';
export default defineConfig({
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        jsxInject: `import { h } from '@loom/core'`
    }
});
//# sourceMappingURL=vite.config.js.map