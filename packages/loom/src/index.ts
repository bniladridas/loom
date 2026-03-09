
// Loom Core: Universal Reactivity & Rendering

type Subscriber = () => void;
let currentListener: Subscriber | null = null;

export function createSignal<T>(value: T): [() => T, (newValue: T | ((v: T) => T)) => void] {
  const subscribers = new Set<Subscriber>();
  const getter = () => {
    if (currentListener) subscribers.add(currentListener);
    return value;
  };
  const setter = (newValue: T | ((v: T) => T)) => {
    value = typeof newValue === 'function' ? (newValue as Function)(value) : newValue;
    subscribers.forEach(sub => sub());
  };
  return [getter, setter];
}

export function createEffect(callback: Subscriber) {
  const listener = () => {
    currentListener = listener;
    callback();
    currentListener = null;
  };
  listener();
}

// Universal Loom Node
export interface LoomNode {
  tag: string | Function;
  props: any;
  children: any[];
}

export function h(tag: string | Function, props: any, ...children: any[]): LoomNode {
  return { tag, props: props || {}, children: children.flat(Infinity) };
}

// Client-Side Renderer
export function render(node: any, parent: HTMLElement): HTMLElement | Text | null {
  console.log('Rendering node:', node, 'to parent:', parent);
  if (node === null || node === undefined || node === false) return null;

  if (typeof node === 'function') {
    const textNode = document.createTextNode('');
    createEffect(() => {
      const val = node();
      textNode.textContent = (val === null || val === undefined) ? '' : String(val);
    });
    parent.appendChild(textNode);
    return textNode;
  }

  if (typeof node !== 'object' || !node.tag) {
    const textNode = document.createTextNode(String(node));
    parent.appendChild(textNode);
    return textNode;
  }

  const { tag, props, children } = node;

  if (typeof tag === 'function') {
    return render(tag({ ...props, children }), parent);
  }

  const element = document.createElement(tag);
  console.log('Created element:', tag);

  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.toLowerCase().substring(2);
      console.log('Adding event listener:', eventName);
      element.addEventListener(eventName, value as EventListener);
    } else if (key === 'class' || key === 'className') {
      element.setAttribute('class', value as string);
    } else {
      element.setAttribute(key, value as string);
    }
  }

  if (children) {
    children.forEach((child: any) => render(child, element));
  }
  
  parent.appendChild(element);
  return element;
}

// Server-Side Renderer
export function renderToString(node: any): string {
  if (node === null || node === undefined || node === false) return '';
  
  // If it's a signal getter, just take the current value for SSR
  if (typeof node === 'function') {
    const val = node();
    return (val === null || val === undefined) ? '' : escapeHtml(String(val));
  }

  if (typeof node !== 'object' || !node.tag) {
    return escapeHtml(String(node));
  }

  const { tag, props, children } = node;

  if (typeof tag === 'function') {
    return renderToString(tag({ ...props, children }));
  }

  const propsString = Object.entries(props)
    .filter(([key, value]) => !key.startsWith('on') && value !== null && value !== undefined)
    .map(([key, value]) => ` ${key === 'className' ? 'class' : key}="${escapeHtml(String(value))}"`)
    .join('');

  const childrenString = children.map((child: any) => renderToString(child)).join('');

  return `<${tag}${propsString}>${childrenString}</${tag}>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element extends LoomNode {}
  }
}
