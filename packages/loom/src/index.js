// Basic reactivity system for Loom
let currentListener = null;
export function createSignal(value) {
    const subscribers = new Set();
    const getter = () => {
        if (currentListener) {
            subscribers.add(currentListener);
        }
        return value;
    };
    const setter = (newValue) => {
        if (typeof newValue === 'function') {
            value = newValue(value);
        }
        else {
            value = newValue;
        }
        // Update all subscribers
        for (const sub of subscribers) {
            sub();
        }
    };
    return [getter, setter];
}
export function createEffect(callback) {
    const listener = () => {
        currentListener = listener;
        callback();
        currentListener = null;
    };
    listener(); // Initial execution to track dependencies
}
// Simple DOM-based hyperscript
export function h(tag, props, ...children) {
    if (typeof tag === 'function') {
        return tag({ ...props, children });
    }
    const element = document.createElement(tag);
    if (props) {
        for (const [key, value] of Object.entries(props)) {
            if (key.startsWith('on') && typeof value === 'function') {
                const event = key.toLowerCase().substring(2);
                element.addEventListener(event, value);
            }
            else if (key === 'class' || key === 'className') {
                element.setAttribute('class', value);
            }
            else {
                element.setAttribute(key, value);
            }
        }
    }
    children.flat().forEach(child => {
        if (typeof child === 'function') {
            // If the child is a function (e.g., from a signal getter), bind it reactively
            const textNode = document.createTextNode('');
            createEffect(() => {
                textNode.textContent = String(child());
            });
            element.appendChild(textNode);
        }
        else if (child instanceof Node) {
            element.appendChild(child);
        }
        else {
            element.appendChild(document.createTextNode(String(child)));
        }
    });
    return element;
}
export function render(component, parent) {
    parent.appendChild(component);
}
//# sourceMappingURL=index.js.map