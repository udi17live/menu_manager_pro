"use client";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import GoogleButton from "../buttons/GoogleButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Spinner } from "../ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  AlertCircle,
  CircleAlert,
  FileExclamationPoint,
  Terminal,
} from "lucide-react";
import { getAuthErrors } from "@/lib/errors";

export default function SignInForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(getAuthErrors(result.error));
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      router.push("/admin");
      router.refresh();
    } catch (error: any) {
      setError(getAuthErrors(error?.message));
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSumbit} className="p-6 md:p-8">
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground text-balance">
            Sign in to your Menu Manager Pro Account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            className="p-6 rounded"
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            className="p-6 rounded"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </Field>
        <Field>
          <Button
            className="p-6 rounded font-bold uppercase tracking-widest cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <Spinner className="size-" />}
            Sign In
          </Button>
        </Field>
        <Field>
          {error && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Or continue with
        </FieldSeparator>
        <Field>
          <GoogleButton />
        </Field>
        <FieldDescription className="text-center">
          Don&apos;t have an account? <a href="/signup">Sign up</a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
