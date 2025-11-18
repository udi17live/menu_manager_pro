import { AuthError } from "next-auth";

export function getAuthErrors(errorType: string) {
  if (errorType === "CredentialsSignin") {
    return "Invalid Credentials. Please try again";
  }

  return "Something went wrong. Please try again.";
}
