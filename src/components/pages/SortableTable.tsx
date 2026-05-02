"use client";
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import React, { ReactElement, ReactNode, useState } from 'react';

// used for sorting, could be used elsewhere in the future but atm I shall leave it here
const extractText = (node: any): string => {
    if (node === null || node === undefined) return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (React.isValidElement(node)) return extractText((node.props as any).children);
    return '';
};

const UPDOWN = (
    <ChevronsUpDown size='16'/>
)
const UP = (
    <ChevronUp size='16'/>
)
const DOWN = (
    <ChevronDown size='16'/>
)

const SortableTable = ({ children }: { children: React.ReactNode }) => {
    const [sortConfig, setSortConfig] = useState<{ key: number; direction: 'asc' | 'desc' } | null>(null);

    const childrenArray = React.Children.toArray(children);

    const thead = childrenArray.find(
        (child: any) => child.type === 'thead'
    ) as ReactElement<{ children: ReactNode }> | undefined;
    const tbody = childrenArray.find(
        (child: any) => child.type === 'tbody'
    ) as ReactElement<{ children: ReactNode }> | undefined;

    if (!thead || !tbody) { // here just in case the markdown is badly formatted
        return <div className="overflow-x-auto"><table className="text-left">{children}</table></div>;
    }

    const theadRows = React.Children.toArray(thead.props.children);
    const headerRow = theadRows.find(
        (child: any) => child.type === 'tr'
    ) as ReactElement<{ children: ReactNode }> | undefined;
    const headers = headerRow ? React.Children.toArray(headerRow.props.children) : [];

    const bodyRows = React.Children.toArray(tbody.props.children).filter((child: any) => child.type === 'tr');

    // sorting logic. Also able to handle purely numerical values.
    const sortedRows = [...bodyRows].sort((a: any, b: any) => {
        if (!sortConfig) return 0;
        
        const aCells = React.Children.toArray(a.props.children);
        const bCells = React.Children.toArray(b.props.children);

        const aContent = extractText(aCells[sortConfig.key] || '');
        const bContent = extractText(bCells[sortConfig.key] || '');

        const aNum = parseFloat(aContent.replace(/[^0-9.-]+/g, ""));
        const bNum = parseFloat(bContent.replace(/[^0-9.-]+/g, ""));

        const isNumeric = !isNaN(aNum) && !isNaN(bNum) && /\d/.test(aContent) && /\d/.test(bContent);

        if (isNumeric) {
            return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        return sortConfig.direction === 'asc' 
            ? aContent.localeCompare(bContent, undefined, { numeric: true }) 
            : bContent.localeCompare(aContent, undefined, { numeric: true });
    });

    const handleSort = (index: number) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === index && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        if (sortConfig && sortConfig.key === index && sortConfig.direction === 'desc') {
            setSortConfig(null)
        } else {
            setSortConfig({ key: index, direction });
        }
    };

    return (
        <div className="max-w-full overflow-x-auto w-fit my-6 border-2 border-sky-700 bg-gray-800">
            <table className="text-left border-collapse text-sm text-gray-200">
                <thead className="bg-sky-700 border-b-2 border-sky-600">
                    <tr>
                        {headers.map((th: any, i) => (
                            <th 
                                key={i} 
                                onClick={() => handleSort(i)}
                                className="p-3 font-semibold cursor-pointer transition-colors select-none group border-r border-sky-800/50 last:border-r-0"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span>{th.props ? th.props.children : th}</span>
                                    
                                    <span className="text-xs w-3 text-center">
                                        {sortConfig?.key === i ? (sortConfig.direction === 'asc' ? UP : DOWN) : UPDOWN}
                                    </span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-sky-800/50">
                    {sortedRows.map((row: any, i) => React.cloneElement(row, {
                        ...row.props,
                        key: i,
                    }))}
                </tbody>
            </table>
        </div>
    );
}

export default SortableTable;