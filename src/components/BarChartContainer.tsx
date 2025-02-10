import React from 'react';
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';
import { HiDotsHorizontal } from 'react-icons/hi';

export interface BarChartContainerProps {
    children: React.ReactNode;
    title: string
}
const BarChartContainer = ({children,title}:BarChartContainerProps) => {
    return (
        <div className='bg-white rounded-xl w-full h-full p-4 gap-4 flex flex-col justify-between'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>{title}</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <HiDotsHorizontal />
                    </DropdownMenuTrigger>
                </DropdownMenu>
            </div>
            <div className='flex-grow w-full h-full'>
                {children}
            </div>
        </div>
    );
}

export default BarChartContainer;