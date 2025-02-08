'use client'

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { register } from "@/actions/register";
import CardWrapper from "@/components/CardWrapper";
import { BackButton } from "@/components/BackButton";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";

const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
          register(values)
            .then((data) => {
              setError(data.error);
              setSuccess(data.success);
            });
        });
    };

    const backButton = (<BackButton href="/auth/login" label="Already have an account?"/>)

    return (
        <CardWrapper
        headerTitle="Create an account"
        headerLabel=""
        showSocial
        footer={backButton}
        >
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                >
                <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input
                            {...field}
                            disabled={isPending}
                            placeholder="cheolsu"
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input
                            {...field}
                            disabled={isPending}
                            placeholder="cheolsu@example.com"
                            type="email"
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input
                            {...field}
                            disabled={isPending}
                            placeholder="******"
                            type="password"
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full"
                >
                    Create an account
                </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}

export default RegisterForm;