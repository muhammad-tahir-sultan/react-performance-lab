
import React, { useState, useEffect, Profiler, useCallback } from 'react';
import { generateData } from './utils/dataGenerator';
import type { DataItem } from './utils/dataGenerator';
import { MetricsPanel } from './components/MetricsPanel';
import { ControlsPanel } from './components/ControlsPanel';
import { DataTable } from './components/DataTable';
import './App.css';

function App() {
  const [mode, setMode] = useState<'optimized' | 'unoptimized'>('unoptimized');
  const [datasetSize, setDatasetSize] = useState(10000); // Start with reasonable size
  const [dataset, setDataset] = useState<DataItem[]>([]);
  const [renderCount, setRenderCount] = useState(0);
  const [lastCommitTime, setLastCommitTime] = useState(0);

  // Stress Test States
  const [heavyComputation, setHeavyComputation] = useState(false);
  const [updateFrequency, setUpdateFrequency] = useState(0); // 0 = off

  // Generate initial data
  useEffect(() => {
    setDataset(generateData(datasetSize));
  }, []); // Only on mount initially

  // Handle manual regeneration
  const handleGenerate = () => {
    // Intentionally not wrapping in transition/timeout to show blocking behavior in unoptimized
    setDataset(generateData(datasetSize));
  };

  // Simulate background updates causing re-renders
  useEffect(() => {
    if (updateFrequency === 0) return;

    const interval = setInterval(() => {
      setDataset(prev => {
        // Update a random item to force re-render
        const idx = Math.floor(Math.random() * prev.length);
        const newData = [...prev]; // Copy array
        newData[idx] = {
          ...newData[idx],
          value: Math.floor(Math.random() * 10000),
          lastUpdated: new Date().toISOString()
        };
        return newData;
      });
    }, updateFrequency);

    return () => clearInterval(interval);
  }, [updateFrequency]);

  // Use refs for high-frequency metrics to avoid infinite render loops via setState
  const renderCountRef = React.useRef(0);
  const commitTimeRef = React.useRef(0);

  // Poll refs to update UI without blocking the render cycle
  useEffect(() => {
    const timer = setInterval(() => {
      // Only trigger re-render if values changed
      if (renderCountRef.current !== renderCount || commitTimeRef.current !== lastCommitTime) {
        setRenderCount(renderCountRef.current);
        setLastCommitTime(commitTimeRef.current);
      }
    }, 500); // Update UI every 500ms
    return () => clearInterval(timer);
  }, [renderCount, lastCommitTime]);

  // Profiler callback - fast, low overhead
  const onRenderCallback: React.ProfilerOnRenderCallback = (
    id,
    _phase,
    actualDuration,
    _baseDuration,
    _startTime,
    _commitTime
  ) => {
    if (id === 'AppContent') {
      commitTimeRef.current = actualDuration;
      renderCountRef.current += 1;
    }
  };

  // Handlers
  const handleDelete = useCallback((id: string) => {
    setDataset(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleEdit = useCallback((id: string) => {
    alert(`Edit ${id} clicked. In Unoptimized mode, did you feel the lag?`);
  }, []);

  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>⚡ React Performance Lab</h1>
        <div className="header-badges">
          <span className="badge">v1.0</span>
          <span className="badge">Staff Engineer Project</span>
        </div>
      </header>

      <main className="main-content">
        <ControlsPanel
          mode={mode}
          setMode={setMode}
          datasetSize={datasetSize}
          setDatasetSize={setDatasetSize}
          heavyComputation={heavyComputation}
          setHeavyComputation={setHeavyComputation}
          updateFrequency={updateFrequency}
          setUpdateFrequency={setUpdateFrequency}
          onGenerate={handleGenerate}
        />

        <div className="content-area">
          <MetricsPanel
            renderCount={renderCount}
            lastCommitTime={lastCommitTime}
            mode={mode}
          />

          <Profiler id="AppContent" onRender={onRenderCallback}>
            <div className="data-view">
              <DataTable
                data={dataset}
                mode={mode}
                onDelete={handleDelete}
                onEdit={handleEdit}
                heavyComputation={heavyComputation}
              />
            </div>
          </Profiler>
        </div>
      </main>
    </div>
  );
}

export default App;
