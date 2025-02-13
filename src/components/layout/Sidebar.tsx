import Link from 'next/link';
import React from 'react';
import Menu from '../Menu';

export interface SidebarProps {
}
const Sidebar = () => {
    return (
        <>
            <Link
            href="/"
            className="flex items-center justify-center lg:justify-start gap-2"
            >
                <span className="hidden lg:block font-bold">ACademy</span>
            </Link>
            <Menu />
        </>
    );
}

export default Sidebar;