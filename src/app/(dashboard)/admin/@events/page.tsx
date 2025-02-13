import React from 'react';
import EventCalendarContainer from './_components/EventCalendarContainer';

export interface EventPageProps {
    searchParams: Promise<{ [keys: string]: string | undefined }>
}
const EventPage = async ({searchParams}:EventPageProps) => {
    return (
        <EventCalendarContainer searchParams={searchParams}/>
    );
}

export default EventPage;