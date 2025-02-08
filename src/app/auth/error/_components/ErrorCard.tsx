import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import CardWrapper from "@/components/CardWrapper"
import { BackButton } from "@/components/BackButton";

export const ErrorCard = () => {
    const backButton = (<BackButton label={"Back to login"} href="/auth/login"/>)
    return (
    <CardWrapper
    footer={backButton}
    headerLabel="Oops! Something went wrong!" 
    headerTitle={""}
    >
      <div className="w-full flex justify-center items-center">
      <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
