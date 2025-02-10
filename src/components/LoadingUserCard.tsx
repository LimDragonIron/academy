import React from 'react';
import { Spinner } from './Spinner';

const LoadingUserCard = async () => {
    return (
        <div className='rounded-2xl odd:bg-blue-200 even:bg-yellow-100 p-4 flex flex-1 justify-center items-center min-w-[130px] min-h-[139px]'>
            <Spinner />
        </div>
    );
}

export default LoadingUserCard;