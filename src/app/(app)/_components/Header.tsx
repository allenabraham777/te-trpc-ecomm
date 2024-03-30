import React from 'react';

import Search from '@/components/icons/search.svg';
import Cart from '@/components/icons/cart.svg';
import ChevronLeft from '@/components/icons/chevron-left.svg';
import ChevronRight from '@/components/icons/chevron-right.svg';

const topbarItems = [
    { label: 'Help', link: '' },
    { label: 'Orders & Returns', link: '' },
    { label: 'Hi, John', link: '' },
];

const menubarItems = [
    { label: 'Categories', link: '' },
    { label: 'Sale', link: '' },
    { label: 'Clearance', link: '' },
    { label: 'New Stock', link: '' },
    { label: 'Trending', link: '' },
];

const Header = () => {
    return (
        <header>
            <div className="flex h-9 items-center justify-end">
                <ul className="flex gap-4 px-8 text-alternative">
                    {topbarItems.map((item) => (
                        <li key={item.label} className="text-xs">
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grid h-16 grid-cols-4">
                <div className="px-8 py-2">
                    <h1 className="text-[2rem] font-bold uppercase leading-[2.42rem]">
                        ECOMMERCE
                    </h1>
                </div>
                <nav className="col-span-2 flex items-center justify-center">
                    <ul className="my-auto flex items-center justify-center gap-8">
                        {menubarItems.map((item) => (
                            <li
                                key={item.label}
                                className="text-base font-semibold"
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex items-center justify-end gap-8 px-8">
                    <Search />
                    <Cart />
                </div>
            </div>
            <div className="flex h-9 items-center justify-center gap-6 bg-banner">
                <span>
                    <ChevronLeft />
                </span>
                <span className="text-sm font-medium">
                    Get 10% off on business sign up
                </span>
                <span>
                    <ChevronRight />
                </span>
            </div>
        </header>
    );
};

export default Header;
