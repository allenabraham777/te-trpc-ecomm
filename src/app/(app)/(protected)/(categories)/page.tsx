'use client';
import Checkbox from '@/components/atoms/checkbox';
import Pagination from '@/components/molecules/pagination';
import { api } from '@/trpc/react';
import React, { useState } from 'react';
import LoaderIcon from '@/components/icons/loading.svg';

const page = 6;

const CategoriesPage = () => {
    const [current, setCurrent] = useState<number>(1);
    const utils = api.useUtils();
    const selectCategory = api.category.selectCategory.useMutation({
        onSuccess() {
            utils.category.getSelectedCategories
                .invalidate()
                .catch((err: unknown) => console.error(err));
        },
    });
    const deselectCategory = api.category.deselctCategory.useMutation({
        onSuccess() {
            utils.category.getSelectedCategories
                .invalidate()
                .catch((err: unknown) => console.error(err));
        },
    });
    const selectedCategories = api.category.getSelectedCategories.useQuery();
    const categories = api.category.getAllCategories.useQuery({
        skip: (current - 1) * page,
        page,
    });
    const handleSelect = (checked: boolean, categoryId: number) => {
        if (checked) {
            deselectCategory.mutate({ categoryId });
        } else {
            selectCategory.mutate({ categoryId });
        }
    };
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
                {categories.isLoading && (
                    <LoaderIcon className="h-10 w-auto animate-spin" />
                )}
                {categories.data?.categories.map((category) => {
                    const checked = !!selectedCategories.data?.categories.some(
                        (x) => x.categoryId === category.id,
                    );
                    return (
                        <Checkbox
                            key={category.id}
                            label={category.name}
                            checked={checked}
                            onClick={() => handleSelect(checked, category.id)}
                        />
                    );
                })}
            </div>
            <div className="pb-6 pt-8">
                <Pagination
                    total={categories.data?.total ?? 0}
                    page={page}
                    current={current}
                    onPageChange={(page) => setCurrent(page)}
                />
            </div>
        </div>
    );
};

export default CategoriesPage;
