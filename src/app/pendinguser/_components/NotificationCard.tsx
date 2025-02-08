'use client'

import { logout } from '@/actions/logout';
import { BackButton } from '@/components/BackButton';
import CardWrapper from '@/components/CardWrapper';
import React from 'react';

export interface NotificationCardProps {

}

const NotificationCard = () => {
    const backButton = (<BackButton className='text-blue-300' label={'로그인으로 돌아가기'}  action={logout}/>)
    return (
        <div className='relative w-full h-full'>
            <CardWrapper
            headerTitle='관리자의 승인이 필요합니다.'
            headerLabel=''
            className='absolute left-1/2 transform -translate-x-1/2'
            style={{ top: '25.0%' }}
            footer={backButton}
            >
                <div className='space-y-6'>
                    <p className='text-base'>
                        관리자만 부여여할 수 있수 있는 권한이 필요합니다. 이 앱을 사용하려면 먼저 관리자에게 이앱의 사용 권한을 부여하도록 요청하세요
                    </p>
                </div>
            </CardWrapper>
        </div>
    );
}

export default NotificationCard;