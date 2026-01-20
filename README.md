
# ⚡ React Performance Lab

**Extreme Optimization & Measurement Project**

> "I built a React Performance Lab where I intentionally degraded performance, profiled it, and applied targeted optimizations. I can explain exactly when memoization helps and when it hurts."

---

## 🎯 Core Purpose

This app is not a demo. It is a **controlled performance laboratory** where you:
1.  **Intentionally create** performance bottlenecks.
2.  **Measure** them with correct tooling.
3.  **Fix** them using advanced React patterns.
4.  **Prove** improvements with hard data.

---

## 🧩 Features & Architecture

### 1️⃣ Massive Dataset Simulation
- Generates **10k – 100k+ rows** with complex objects.
- Tests scalable rendering and memory limits.
- **Why**: Most CRUD apps never test scale; this does.

### 2️⃣ Dual Performance Modes
| Mode | Traits |
|------|--------|
| **🔴 Unoptimized** | No memoization, inline functions, full re-renders, blocking computations (N² simulation). |
| **🟢 Optimized** | `React.memo`, stable references (`useCallback`), deferred updates, **Virtualized Lists** (`react-window`). |

### 3️⃣ Real-Time Metrics
The dashboard creates a feedback loop for your changes:
- **FPS**: Tracks UI frame rate.
- **Commit Time**: Actual time React takes to commit changes to the DOM.
- **Render Count**: Visualizes wasted renders.
- **Memory**: Monitors JS heap usage (where supported).

---

## 🧪 Experiments to Run

### Experiment A: The Wasted Render Trap
1.  Set **Mode** to `Unoptimized`.
2.  Set **Background Updates** to `100ms`.
3.  Observe **Render Count** skyrocketing and **FPS** dropping.
4.  **Fix**: Switch to `Optimized`. Note how `React.memo` and `useCallback` stop the bleeding.

### Experiment B: The Large List Problem
1.  Set **Dataset Size** to `50,000`.
2.  Try to scroll in `Unoptimized` mode. The DOM nodes overwhelm the browser.
3.  **Fix**: Switch to `Optimized`. `react-window` only renders what is visible. Scroll becomes buttery smooth (60fps).

### Experiment C: The Computation Block
1.  Enable **Heavy Computation (N² Sim)**.
2.  This simulates expensive derived state (like filtering a massive list) inside the render loop.
3.  Interaction becomes sluggish.
4.  **Fix**: In a real scenario, we would use `useMemo` or a Web Worker. In `Optimized` mode, we simply bypass the artificial lag to demonstrate the clear difference.

---

## ⚙️ Engineering Standards used

- **Vite**: For instant dev server start.
- **TypeScript**: For type safety in data generation.
- **React Profiler**: For identifying bottlenecks.
- **Web Vitals**: LCP, CLS, INP monitoring.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the lab
npm run dev
```

---

