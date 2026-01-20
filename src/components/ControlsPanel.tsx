
import React from 'react';
import './ControlsPanel.css';

interface ControlsPanelProps {
    mode: 'optimized' | 'unoptimized';
    setMode: (mode: 'optimized' | 'unoptimized') => void;
    datasetSize: number;
    setDatasetSize: (size: number) => void;
    heavyComputation: boolean;
    setHeavyComputation: (val: boolean) => void;
    updateFrequency: number;
    setUpdateFrequency: (val: number) => void;
    onGenerate: () => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
    mode,
    setMode,
    datasetSize,
    setDatasetSize,
    heavyComputation,
    setHeavyComputation,
    updateFrequency,
    setUpdateFrequency,
    onGenerate
}) => {
    return (
        <div className="controls-panel">
            <div className="control-group">
                <h3>Performance Mode</h3>
                <div className="toggle-container">
                    <button
                        className={`toggle-btn ${mode === 'unoptimized' ? 'active unoptimized' : ''}`}
                        onClick={() => setMode('unoptimized')}
                    >
                        🔴 Unoptimized
                    </button>
                    <button
                        className={`toggle-btn ${mode === 'optimized' ? 'active optimized' : ''}`}
                        onClick={() => setMode('optimized')}
                    >
                        🟢 Optimized
                    </button>
                </div>
            </div>

            <div className="control-group">
                <h3>Dataset Size: {datasetSize.toLocaleString()} rows</h3>
                <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={datasetSize}
                    onChange={(e) => setDatasetSize(Number(e.target.value))}
                />
                <button onClick={onGenerate} className="action-btn">
                    Regenerate Data
                </button>
            </div>

            <div className="control-group">
                <h3>Stress Test</h3>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={heavyComputation}
                        onChange={(e) => setHeavyComputation(e.target.checked)}
                    />
                    Heavy Computation (N² Sim)
                </label>

                <div style={{ marginTop: '0.5rem' }}>
                    <label>Background Updates: {updateFrequency}ms</label>
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={updateFrequency}
                        onChange={(e) => setUpdateFrequency(Number(e.target.value))}
                    />
                    <small className="hint">{updateFrequency === 0 ? 'Off' : 'Fast <-> Slow'}</small>
                </div>
            </div>
        </div>
    );
};
