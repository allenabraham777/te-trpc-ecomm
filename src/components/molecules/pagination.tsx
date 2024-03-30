'use client';
import ChevronDoubleLeft from '@/components/icons/chevron-double-left.svg';
import ChevronLeft from '@/components/icons/chevron-left.svg';
import ChevronDoubleRight from '@/components/icons/chevron-double-right.svg';
import ChevronRight from '@/components/icons/chevron-right.svg';
import usePagination, { DOTS } from '@/hooks/usePagination';
import React, { useCallback, useMemo } from 'react';
import clsx from 'clsx';

export interface PaginationProps {
    total: number;
    current: number;
    page: number;
    onPageChange: (page: number | string) => void;
}

const Pagination = ({
    total,
    current,
    page,
    onPageChange,
}: PaginationProps) => {
    const pageRange = usePagination({ total, current, page });
    const lastPage = pageRange?.slice(-1)[0];

    if (current === 0 || pageRange?.length < 2) {
        return null;
    }

    const handleNext = useCallback(() => {
        if (current !== Math.ceil(total / page)) onPageChange(current + 1);
    }, [current, lastPage]);

    const handlePrev = useCallback(() => {
        if (current > 1) onPageChange(current - 1);
    }, [current]);

    const goToFirstPage = useCallback(() => {
        onPageChange(1);
    }, []);

    const goToLastPage = useCallback(() => {
        if (lastPage) onPageChange(lastPage);
    }, [lastPage]);

    return (
        <ul className="flex items-center gap-3 text-xl font-medium text-checkbox">
            <li onClick={goToFirstPage} className="cursor-pointer">
                <ChevronDoubleLeft className="h-6 w-auto fill-checkbox stroke-checkbox" />
            </li>
            <li onClick={handlePrev} className="cursor-pointer">
                <ChevronLeft className="fill-checkbox stroke-checkbox" />
            </li>
            {pageRange?.map((page, i) => (
                <li
                    key={`${page}-${i}`}
                    onClick={() => page !== DOTS && onPageChange(page)}
                    className={clsx('cursor-pointer', {
                        'text-black': current === page,
                    })}
                >
                    {page}
                </li>
            ))}
            <li onClick={handleNext} className="cursor-pointer">
                <ChevronRight className="fill-checkbox stroke-checkbox" />
            </li>
            <li onClick={goToLastPage} className="cursor-pointer">
                <ChevronDoubleRight className="h-6 w-auto fill-checkbox stroke-checkbox" />
            </li>
        </ul>
    );
};

export default Pagination;
