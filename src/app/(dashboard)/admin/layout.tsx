import React from 'react';

export interface LayoutProps {
    children: React.ReactNode;
    usercards: React.ReactNode,
    providerchart: React.ReactNode,
    visitorchart: React.ReactNode,
    searchParams: { [keys: string]: string | undefined }
}
const Layout = ({ usercards, children, providerchart, visitorchart, searchParams}:LayoutProps) => {
    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* left */}
            <div className='w-full lg:w-2/3 flex flex-col gap-8'>
                {usercards}
                <div className="flex gap-4 flex-col lg:flex-row">
                    <div className="w-full lg:w-1/3 h-[450px]">
                        {providerchart}
                    </div>
                    <div className="w-full lg:w-2/3 h-[450px]">
                        {visitorchart}
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
            {children}
        </div>
    );
}

export default Layout;