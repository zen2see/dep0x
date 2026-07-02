'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { signUpSchema } from "@/app/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";
import { useRouter } from "next/navigation" 
import { toast } from "sonner";

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
    const router = useRouter()
    const form = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const { isSubmitting } = form.formState;

    async function onSubmit(data: SignUpValues) {
        await authClient.signUp.email({
            email: data.email,
            name: data.name,
            password: data.password,
        }, { // Fixed nested configuration block structure
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Account created successfully");
                    // 👈 Micro-delay added so Next.js doesn't destroy the toast instantly
                    setTimeout(() => {
                        router.push("/");
                    }, 300);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Something went wrong");
                },
            }
        });
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create an account to get started.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-4">
                        <Controller 
                            name="name" 
                            control={form.control} 
                            render={({ field, fieldState }) => (
                                <Field>
                                   <FieldLabel>Full Name</FieldLabel>
                                   <Input
                                     aria-invalid={fieldState.invalid}
                                     placeholder="John Doe"
                                     {...field}
                                   />
                                   {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />  
                                   )}
                                </Field>
                           )}
                        />
                        <Controller 
                            name="email" 
                            control={form.control} 
                            render={({ field, fieldState })  => (
                                <Field>
                                   <FieldLabel>Email</FieldLabel>
                                   <Input aria-invalid={fieldState.invalid}
                                   placeholder="John@Doe.com" type="email" autoComplete="username" {...field} />
                                   {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />  
                                   )}
                                </Field>
                           )}
                        />  
                        <Controller 
                            name="password" 
                            control={form.control} 
                            render={({ field, fieldState })  => (
                                <Field>
                                   <FieldLabel>Password</FieldLabel>
                                   <Input placeholder="*****" type="password"  autoComplete="new-password" {...field} />
                                   {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />  
                                   )}
                                </Field>
                           )}
                        />
                        <Button type="submit">Sign up</Button>     
                    </FieldGroup>
                </form>
            </CardContent>  
        </Card>
    )
}