import { createSignal } from '@loom/core';

export function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="card">
      <h2>Loom SSR Counter</h2>
      <p>This page was rendered on the server and hydrated on the client.</p>
      <button onclick={() => setCount(c => c - 1)}>-</button>
      <span class="count">{count}</span>
      <button onclick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}

export function App() {
  return (
    <div>
      <h1>Loom Framework SSR Proof of Concept</h1>
      <Counter />
    </div>
  );
}
