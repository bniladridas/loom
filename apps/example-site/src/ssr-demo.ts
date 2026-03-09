import { renderToString, h } from '@loom/core';
import * as AppComponents from './App';

// Inject 'h' into the global scope for tsx/Node execution of JSX files that don't import it
(global as any).h = h;

console.log('--- Loom SSR Output ---');
const html = renderToString(h(AppComponents.App, null));
console.log(html);
console.log('--- End SSR Output ---');
