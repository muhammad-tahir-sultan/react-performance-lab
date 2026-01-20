
import React from 'react';
import type { DataItem } from '../utils/dataGenerator';

interface RowActionsProps {
    item: DataItem;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    forceLag?: boolean; // For unoptimized mode
}

export const RowActions: React.FC<RowActionsProps> = ({ item, onDelete, onEdit, forceLag }) => {
    const handleClick = (action: 'edit' | 'delete') => {
        // Simulate interaction delay in unoptimized mode
        if (forceLag) {
            const start = performance.now();
            while (performance.now() - start < 50) {
                // Busy wait to block main thread intentionally for 50ms per click
            }
        }

        if (action === 'edit') onEdit(item.id);
        else onDelete(item.id);
    };

    return (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
                onClick={() => handleClick('edit')}
                style={{
                    background: 'var(--accent-primary)',
                    color: '#000',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                }}
            >
                Edit
            </button>
            <button
                onClick={() => handleClick('delete')}
                style={{
                    background: 'var(--accent-danger)',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                }}
            >
                Del
            </button>
        </div>
    );
};
