
// @ts-nocheck
import React, { useCallback, useMemo } from 'react';
import * as ReactWindowNamespace from 'react-window';
import type { DataItem } from '../utils/dataGenerator';
import { OptimizedRow, UnoptimizedRow } from './TableRows';
import './DataTable.css';

// Handle CJS/ESM interop for react-window
const ReactWindow = (ReactWindowNamespace as any).default || ReactWindowNamespace;

// In this version (2.2.5), FixedSizeList is an alias for List
const FixedSizeList = ReactWindow.FixedSizeList || ReactWindow.List;

interface DataTableProps {
    data: DataItem[];
    mode: 'optimized' | 'unoptimized';
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    heavyComputation: boolean;
}

// In react-window v2.2.5, the row component receives props flat
const RowRenderer = React.memo((props) => {
    const { index, style, items, onDelete, onEdit } = props;

    if (!items) return null;
    const item = items[index];
    if (!item) return null;

    return (
        <OptimizedRow
            item={item}
            style={style}
            onDelete={onDelete}
            onEdit={onEdit}
        />
    );
});

export const DataTable = React.memo<DataTableProps>(({ data = [], mode, onDelete, onEdit, heavyComputation }) => {

    const handleDeleteOptimized = useCallback((id: string) => onDelete(id), [onDelete]);
    const handleEditOptimized = useCallback((id: string) => onEdit(id), [onEdit]);

    // Data passed to each row via react-window's rowProps
    const rowProps = useMemo(() => ({
        items: data,
        onDelete: handleDeleteOptimized,
        onEdit: handleEditOptimized
    }), [data, handleDeleteOptimized, handleEditOptimized]);

    return (
        <div className="table-container">
            <div className="table-header">
                <div className="col id">ID</div>
                <div className="col label">Label</div>
                <div className="col value">Value</div>
                <div className="col status">Status</div>
                <div className="col desc">Description</div>
                <div className="col actions">Actions</div>
            </div>

            {mode === 'optimized' && FixedSizeList ? (
                /* 
                   IMPORTANT: react-window v2.2.5 uses:
                   - rowComponent instead of children
                   - rowProps instead of itemData
                */
                <FixedSizeList
                    style={{ height: 600, width: '100%' }}
                    rowCount={data.length}
                    rowHeight={52}
                    rowComponent={RowRenderer}
                    rowProps={rowProps}
                />
            ) : (
                <div className="table-body-unoptimized">
                    {data.map((item) => (
                        <UnoptimizedRow
                            key={item.id}
                            item={item}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            allowExpensiveComputation={heavyComputation}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});
