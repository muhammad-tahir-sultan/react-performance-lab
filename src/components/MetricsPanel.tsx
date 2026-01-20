
import React, { useEffect, useState } from 'react';
import './MetricsPanel.css';

interface MetricsPanelProps {
    renderCount: number;
    lastCommitTime: number;
    mode: 'optimized' | 'unoptimized';
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ renderCount, lastCommitTime, mode }) => {
    const [fps, setFps] = useState(0);
    const [memory, setMemory] = useState<number | null>(null);

    useEffect(() => {
        let frameCount = 0;
        let startTime = performance.now();
        let animationFrameId: number;

        const measure = (now: number) => {
            frameCount++;
            const elapsed = now - startTime;
            if (elapsed >= 1000) {
                setFps(Math.round((frameCount * 1000) / elapsed));
                frameCount = 0;
                startTime = now;

                // Measure memory if available (Chrome specific)
                if ((performance as any).memory) {
                    setMemory(Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024));
                }
            }
            animationFrameId = requestAnimationFrame(measure);
        };

        animationFrameId = requestAnimationFrame(measure);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const getHealthColor = (val: number, type: 'fps' | 'ms' | 'mb') => {
        if (type === 'fps') return val < 30 ? 'var(--accent-danger)' : val < 50 ? '#facc15' : 'var(--accent-success)';
        if (type === 'ms') return val > 50 ? 'var(--accent-danger)' : val > 16 ? '#facc15' : 'var(--accent-success)';
        if (type === 'mb') return val > 200 ? 'var(--accent-danger)' : 'var(--accent-primary)';
        return 'var(--text-primary)';
    };

    return (
        <div className={`metrics-panel glass ${mode === 'optimized' ? 'optimized-border' : 'unoptimized-border'}`}>
            <div className="metric-group">
                <span className="label">FPS</span>
                <span className="value" style={{ color: getHealthColor(fps, 'fps') }}>{fps}</span>
            </div>
            <div className="metric-group">
                <span className="label">Commit Time</span>
                <span className="value" style={{ color: getHealthColor(lastCommitTime, 'ms') }}>
                    {lastCommitTime.toFixed(1)}ms
                </span>
            </div>
            <div className="metric-group">
                <span className="label">Render Count</span>
                <span className="value">{renderCount}</span>
            </div>
            <div className="metric-group">
                <span className="label">Memory</span>
                <span className="value" style={{ color: getHealthColor(memory || 0, 'mb') }}>
                    {memory ? `${memory} MB` : 'N/A'}
                </span>
            </div>
        </div>
    );
};
