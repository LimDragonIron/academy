import React from 'react';
import ProviderChartContainer from './_components/ProviderChartContainer';

const ProviderChartPage = async () => {
    await new Promise((resolve)=> {
        setTimeout(()=>{
            resolve("intentional delay")
        },3000)
    })

    console.log("ProviderChartPage")
    return (
        <ProviderChartContainer modelName={"account"} groupByField={'provider'} />
    );
}

export default ProviderChartPage;