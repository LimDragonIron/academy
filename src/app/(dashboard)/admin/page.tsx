import { currentRole } from '@/lib/getSession';
import { UserRole } from '@prisma/client';
import React from 'react';

export interface AdminPageProps {

}
const AdminPage = async () => {
    const userRole = await currentRole()
    if(userRole) { 
        if(userRole === UserRole.ADMIN){
        }
    }

    return (
        <div>
            Admin
        </div>
    );
}

export default AdminPage;