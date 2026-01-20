
// @ts-nocheck
import React, { useCallback, useMemo } from 'react';
import * as ReactWindowNamespace from 'react-window';
import type { DataItem } from '../utils/dataGenerator';
import { OptimizedRow, UnoptimizedRow } from './TableRows';
import './DataTable.css';

const ReactWindow = (ReactWindowNamespace as any).default || ReactWindowNamespace;

const FixedSizeList = ReactWindow.FixedSizeList || ReactWindow.List;

interface DataTableProps {
    data: DataItem[];
    mode: 'optimized' | 'unoptimized';
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    heavyComputation: boolean;
}

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