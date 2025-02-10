import LoadingUserCard from "@/components/LoadingUserCard";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className='flex gap-4 justify-between flex-wrap'>
            <LoadingUserCard/>
            <LoadingUserCard/>
            <LoadingUserCard/>
            <LoadingUserCard/>
            <LoadingUserCard/>
        </div>
    )
}