import React from 'react';

export interface BarChartContainerProps {
    children: React.ReactNode;
}
const BarChartContainer = ({ children }:BarChartContainerProps) => {
    return (
        <div className='flex w-full h-full bg-white'>
            {children}
        </div>        
    );
}

export default BarChartContainer;