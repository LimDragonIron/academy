import React from 'react';
import ProviderChartContainer from './_components/ProviderChartContainer';

const ProviderChartPage = async () => {
    return (
        <ProviderChartContainer modelName={"account"} groupByField={'provider'} />
    );
}

export default ProviderChartPage;