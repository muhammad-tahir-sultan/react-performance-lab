
import React, { memo } from 'react';
import type { DataItem } from '../utils/dataGenerator';
import { calculateExpensiveTree } from '../utils/dataGenerator';
import { RowActions } from './RowActions';

interface TableRowProps {
    item: DataItem;
    style?: React.CSSProperties; // For react-window compatibility
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    allowExpensiveComputation?: boolean;
}

// Unoptimized Version - Standard Component
export const UnoptimizedRow: React.FC<TableRowProps> = ({ item, style, onDelete, onEdit, allowExpensiveComputation }) => {
    // Intentional performance drag: expensive calculation on every render
    if (allowExpensiveComputation) {
        calculateExpensiveTree([item]);
    }

    return (
        <div className="table-row" style={style}>
            <div className="col id" title={item.id}>{item.id ? item.id.slice(0, 8) : '???'}...</div>
            <div className="col label">{item.label}</div>
            <div className="col value">{item.value}</div>
            <div className="col status">
                <span className={`status-badge ${item.status?.toLowerCase() || 'unknown'}`}>{item.status}</span>
            </div>
            <div className="col desc" title={item.description}>{item.description ? item.description.substring(0, 20) : ''}...</div>
            <div className="col actions">
                <RowActions item={item} onDelete={onDelete} onEdit={onEdit} forceLag={true} />
            </div>
        </div>
    );
};

// Optimized Version - Memoized with default shallow comparison
export const OptimizedRow: React.FC<TableRowProps> = memo(({ item, style, onDelete, onEdit }) => {
    return (
        <div className="table-row" style={style}>
            <div className="col id" title={item.id}>{item.id ? item.id.slice(0, 8) : '???'}...</div>
            <div className="col label">{item.label}</div>
            <div className="col value">{item.value}</div>
            <div className="col status">
                <span className={`status-badge ${item.status?.toLowerCase() || 'unknown'}`}>{item.status}</span>
            </div>
            <div className="col desc" title={item.description}>{item.description ? item.description.substring(0, 20) : ''}...</div>
            <div className="col actions">
                <RowActions item={item} onDelete={onDelete} onEdit={onEdit} forceLag={false} />
            </div>
        </div>
    );
});
