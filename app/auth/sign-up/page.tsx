'use client'

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpSchema } from "@/app/schemas/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // 👈 Re-introduced for soft routing execution
import { z } from "zod";
import { useTransition } from "react";

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter(); // 👈 Initialize the Next.js router
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  const { isSubmitting } = form.formState;
  async function onSubmit(data: SignUpValues) {
    try {
      // 👈 Await the response from Better Auth
      const response = await authClient.signUp.email({
        email: data.email,
        name: data.name, // 👈 Explicitly pass the name field here
        password: data.password,
        
      });

      // Catch error fields inside the response block
          if (response?.error) {
        toast.error(response.error.message || "Registration failed");
        return;
      }

      // ✅ Step 1: Fire the success notification immediately!
      toast.success("Account created successfully");
      
      // ✅ Step 2: Use client routing with a slight pause so the toast registers
      setTimeout(() => {
        router.push("/");
        router.refresh(); // Tells the application layout to look for new cookies
      }, 1000);
      
    } catch (err: unknown) {
      console.error("Login execution crash:", err);
      toast.error("Something went wrong during sign in.");
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Create an account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form 
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Validation Errors:", errors);
            toast.error("Please fill out the form requirements correctly.");
          })}
        >
          <FieldGroup>
          {/* Name Field */}
            <Controller 
              name="name"
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input placeholder="John doe" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> 
            <Controller 
              name="email" 
              control={form.control} 
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input 
                    aria-invalid={fieldState.invalid}
                    placeholder="john@example.com" 
                    type="email" 
                    autoComplete="username"
                    {...field} 
                  />
                  {fieldState.error && <FieldError />}
                </Field>
              )}
            />
             {/* Password Field */}
            <Controller 
              name="password" 
              control={form.control} 
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input 
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••" 
                    type="password" 
                    autoComplete="current-password"
                    {...field} 
                  />
                  {fieldState.error && <FieldError />}
                </Field>
              )}
            />  
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>      
          </FieldGroup>
        </form>
      </CardContent>  
    </Card>
  )
}