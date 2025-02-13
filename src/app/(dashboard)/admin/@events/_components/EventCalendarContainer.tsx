import Image from "next/image";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import { Suspense } from "react";
import { Spinner } from "@/components/Spinner";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: Promise<{ [keys: string]: string | undefined }>;
}) => {
  const { date } = await searchParams;
  
  return (
    <div className="bg-white p-4 rounded-md">
      <EventCalendar />
      <div className="flex items-center">
        <h1 className="text-xl font-semibold my-4">Events</h1>
      </div>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<div className="flex justify-center"><Spinner /></div>}>
          <EventList dateParam={date} />
        </Suspense>
      </div>
    </div>
  );
};

export default EventCalendarContainer;
