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
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                    <div className="h-[450px] col-span-1">
                        {providerchart}
                    </div>
                    <div className="h-[450px] col-span-2">
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