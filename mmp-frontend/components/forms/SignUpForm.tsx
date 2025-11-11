import React from "react";
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

export default function SignUpForm() {
  return (
    <form className="p-6 md:p-8">
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="text-muted-foreground text-balance">
            Create your Menu Manager Pro Account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Name</FieldLabel>
          <Input
            className="p-6 rounded"
            id="name"
            type="text"
            placeholder="your name"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            className="p-6 rounded"
            id="email"
            type="email"
            placeholder="m@example.com"
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
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            className="p-6 rounded"
            id="password"
            type="confirmPassword"
            required
          />
        </Field>
        <Field>
          <Button
            className="p-6 rounded font-bold uppercase tracking-widest cursor-pointer"
            type="submit"
          >
            Sign Up
          </Button>
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Or continue with
        </FieldSeparator>
        <Field>
          <GoogleButton />
        </Field>
        <FieldDescription className="text-center">
          Already have an account? <a href="/signin">Sign In</a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
