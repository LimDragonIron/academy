import BarChartContainer from '@/components/BarChartContainer';
import { db } from '@/lib/prisma';
import React from 'react';
import VisitorAreaChart, { VisitRecord } from './VistorAreaChart';

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
        },
        orderBy: {
            visitDate: 'asc'
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

    const data:VisitRecord[] = Object.values(groupedVisits)
    return (
        <BarChartContainer
        >
            <div className='flex w-full h-full'>
                <VisitorAreaChart chartData={data}  />
            </div>
        </BarChartContainer>
    );
}

export default VisitorChartContainer;