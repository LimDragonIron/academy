import React from 'react';
import { db } from '@/lib/prisma';
import { getCurrentYear } from '@/actions/year';
import { HiDotsHorizontal } from "react-icons/hi";
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';

export interface UserCardProps {
    type: "admin" | "teacher" | "student" | "parent" | "penddinguser";
}

const UserCard = async ({type}:UserCardProps) => {
    const modelMap : Record<typeof type, any> = {
        admin: db.admin,
        teacher: db.teacher,
        student: db.student,
        parent: db.parent,
        penddinguser: db.pendingUser,
    }

    const data = await modelMap[type].count();
    const serverYear =  await getCurrentYear();

    return (
        <div className='rounded-2xl odd:bg-blue-200 even:bg-yellow-100 p-4 flex-1 min-w-[130px]'>
            <div className='flex justify-between items-center'>
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
                    {serverYear}
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <HiDotsHorizontal />
                    </DropdownMenuTrigger>
                </DropdownMenu>
            </div>
            <h1 className='text-2xl font-semibold my-4'>{data}</h1>
            <h2 className='capitalize text-sm font-medium text-gray-500'>{type}</h2>
        </div>
    );
}

export default UserCard;