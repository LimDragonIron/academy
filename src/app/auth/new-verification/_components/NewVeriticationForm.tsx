'use client'

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import CardWrapper  from "@/components/CardWrapper";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { BackButton } from "@/components/BackButton";

const NewVeriticationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
        setError("Missing token!");
        return;
    }

    newVerification(token)
        .then((data) => {
        setSuccess(data.success);
        setError(data.error);
        })
        .catch(() => {
        setError("Something went wrong!");
        })
    }, [token, success, error]);

    useEffect(() => {
    onSubmit();
    }, [onSubmit]);

    const footer = (<BackButton label="Back to login" href="/auth/login"/>)
    return (
        <CardWrapper
        headerTitle="Confirming your verification"
        headerLabel=""
        footer={footer}
        >
        <div className="flex items-center w-full justify-center">
            {!success && !error && (
            <BeatLoader />
            )}
            <FormSuccess message={success} />
            {!success && (
            <FormError message={error} />
            )}
        </div>
        </CardWrapper>
    );
}

export default NewVeriticationForm;