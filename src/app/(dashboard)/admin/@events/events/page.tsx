
import React from 'react';
import EventCalendarContainer from '../_components/EventCalendarContainer';

export interface EventDatePageProps {
    searchParams: Promise<{ [keys: string]: string | undefined }>
}
const EventDatePage = async ({searchParams}:EventDatePageProps) => {
    return (
        <EventCalendarContainer searchParams={searchParams}/>
    );
}

export default EventDatePage;