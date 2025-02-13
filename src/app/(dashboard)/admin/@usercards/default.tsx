import UserCard from '@/components/UserCard';
import React from 'react';

const DefaultUserCardsPage =  async () => {
    return (
        <div className='flex gap-4 justify-between flex-wrap'>
            <UserCard type='admin'/>
            <UserCard type='teacher'/>
            <UserCard type='student'/>
            <UserCard type='parent'/>
            <UserCard type='penddinguser'/>
        </div>
    );
}

export default DefaultUserCardsPage;