"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href?: string;
  label: string;
  className?: string
  action?: ()=> void;
};

export const BackButton = ({
  href,
  label,
  className,
  action
}: BackButtonProps) => {
    const router = useRouter();
    const handleClick = () => {
        if(action) {
            action()
        }
        if(href){
            router.push(href)
        }
    }
    return (
    <Button
        variant="link"
        className={cn(className, "font-normal w-full")}
        size="sm"
        onClick={handleClick}
    >
        {label}
    </Button>
    );
};
