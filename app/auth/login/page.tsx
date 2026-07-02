'use client'

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/app/schemas/auth";
import { toast } from "sonner";
import { z } from "zod";

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: LoginValues) {
    try {
      const response = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/?login=success", 
      });

      // Show real server errors clearly
      if (response?.error) {
        const errorMessage = response.error?.message || "Invalid email or password";
        console.error("Better Auth Server Error:", response.error);
        toast.error(errorMessage);
        return;
      }

      // ✅ Force navigate to the home page with the flag so the home page layout triggers the toast
      window.location.href = "/?login=success";
      
    } catch (err: any) {
      console.error("Login unexpected crash:", err);
      toast.error("Something went wrong during sign in.");
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form 
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Validation Errors:", errors);
            toast.error("Please fill out the form requirements correctly.");
          })}
        >
          <FieldGroup className="gap-y-4">
            
            {/* Email Field */}
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
