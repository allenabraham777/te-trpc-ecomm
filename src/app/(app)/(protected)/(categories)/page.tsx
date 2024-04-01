'use client';
import Checkbox from '@/components/atoms/checkbox';
import Pagination from '@/components/molecules/pagination';
import React, { useState } from 'react';

const CategoriesPage = () => {
    const [current, setCurrent] = useState<number>(1);
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-center text-[2rem] font-semibold">
                Please mark your interests!
            </h1>
            <h4 className="text-center text-base font-normal">
                We will keep you notified.
            </h4>
            <div className="mt-4 flex flex-col gap-6">
                <h3 className="text-xl font-medium">My saved interests!</h3>
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <Checkbox key={i} label="AAA" />
                    ))}
            </div>
            <div className="pb-6 pt-8">
                <Pagination
                    total={100}
                    page={6}
                    current={current}
                    onPageChange={(page) => setCurrent(page)}
                />
            </div>
        </div>
    );
};

export default CategoriesPage;
