
import BarChartContainer from '@/components/BarChartContainer';
import { db } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';
import React from 'react';
import ProviderBarChart from './ProviderBarChart';

export interface ProviderChartContainerProps {
    modelName: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$use' | '$on' | '$transaction' | '$extends'>;
    groupByField: string
}
const ProviderChartContainer = async ({modelName, groupByField}: ProviderChartContainerProps) => {
    const model = db[modelName] as any;
    const data = await model.groupBy({
        by: [groupByField],
        _count: true,
    });

    return (
        <BarChartContainer title='Account Provider Distribution'>
            <div className='flex-grow w-full h-full'>
                <ProviderBarChart data={data} />
            </div>
        </BarChartContainer>
    );
}

export default ProviderChartContainer;