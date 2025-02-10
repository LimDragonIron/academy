import BarChartContainer from '@/components/BarChartContainer';
import { db } from '@/lib/prisma';
import React from 'react';

export interface VisitorChartContainerProps {

}

const VisitorChartContainer = async () => {
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);
  
    const visits = await db.visit.findMany({
        where:{
            visitDate: {
                gte: oneYearAgo,
                lt: today,
            }
        },
        include: {
            user:true,
        }
    })
    
    const groupedVisits = visits.reduce((acc: any, visit) => {
        const date = visit.visitDate.toISOString().split('T')[0];
        const role = visit.user.role.toLowerCase();
  
        if (!acc[date]) {
          acc[date] = {
            date: date,
            student: 0,
            parents: 0,
            teacher: 0,
            pendinguser: 0,
          };
        }
  
        acc[date][role] = (acc[date][role] || 0) + 1;
  
        return acc;
      }, {});

    console.log(groupedVisits)

    return (
        <BarChartContainer
        title='Visted User Count'
        >
            <div className='flex-grow w-full h-full'
            >
                
            </div>
        </BarChartContainer>
    );
}

export default VisitorChartContainer;