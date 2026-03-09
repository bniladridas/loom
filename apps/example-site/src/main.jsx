import { createSignal, render } from '@loom/core';
function Counter() {
    const [count, setCount] = createSignal(0);
    return (<div class="card">
      <h2>Loom Counter</h2>
      <p>This is a Loom component using fine-grained reactivity.</p>
      <button onclick={() => setCount(c => c - 1)}>-</button>
      <span class="count">{count}</span>
      <button onclick={() => setCount(c => c + 1)}>+</button>
    </div>);
}
function App() {
    return (<div>
      <h1>Loom Framework Proof of Concept</h1>
      <Counter />
    </div>);
}
const appContainer = document.getElementById('app');
if (appContainer) {
    render(<App />, appContainer);
}
//# sourceMappingURL=main.jsx.map