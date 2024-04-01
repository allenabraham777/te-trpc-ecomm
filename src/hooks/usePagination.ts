'use client';

import { useMemo } from 'react';

export const DOTS = '...';

interface UsePaginationProps {
    total: number;
    page: number;
    current: number;
}

const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => i + start);
};

const usePagination = ({ total, page, current }: UsePaginationProps) => {
    const pageRange = useMemo(() => {
        const totalPages = Math.ceil(total / page);
        if (totalPages <= 7) {
            return range(1, totalPages);
        }

        const leftIndex = Math.max(current - 1, 1);
        const rightIndex = Math.min(current + 1, totalPages);

        const showLeftDots = leftIndex > 2;
        const showRightDots = rightIndex < totalPages - 2;

        if (!showLeftDots && showRightDots) {
            const leftRange = range(1, 7);
            return [...leftRange, DOTS, totalPages];
        }

        if (showLeftDots && !showRightDots) {
            const rightRange = range(totalPages - 4, totalPages);
            return [1, DOTS, ...rightRange];
        }

        if (showLeftDots && showRightDots) {
            const midRange = range(leftIndex, rightIndex);
            return [1, DOTS, ...midRange, DOTS, totalPages];
        }
        return [];
    }, [total, page, current]);
    return pageRange;
};

export default usePagination;
