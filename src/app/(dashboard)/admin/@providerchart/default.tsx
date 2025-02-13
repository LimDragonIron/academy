import React from 'react';
import ProviderChartContainer from './_components/ProviderChartContainer';

const DefaultProviderChartPage = async () => {
    return (
        <ProviderChartContainer modelName={"account"} groupByField={'provider'} />
    );
}

export default DefaultProviderChartPage;