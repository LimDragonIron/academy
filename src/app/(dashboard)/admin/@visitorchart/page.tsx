import React from 'react';
import VisitorChartContainer from './_components/VisitorChartContainer';

export interface VisitorChartPageProps {

}
const VisitorChartPage = async () => {
    await new Promise((resolve)=> {
        setTimeout(()=>{
            resolve("intentional delay")
        },4000)
    })
    return (
        <VisitorChartContainer></VisitorChartContainer>
    );
}

export default VisitorChartPage;