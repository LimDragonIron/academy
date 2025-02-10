import { Spinner } from "@/components/Spinner";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className='bg-white rounded-xl w-full h-full p-4 gap-4 flex flex-col justify-center items-center'>
          <Spinner />
        </div>
    )
}