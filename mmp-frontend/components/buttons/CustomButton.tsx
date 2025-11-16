import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface CustomButtonProps {
  label: string;
  type?: "button" | "submit";
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  isDisabled?: boolean;
  isLoadingState?: boolean;
}

export default function CustomButton({
  label,
  type = "button",
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  variant = "default",
  isDisabled = false,
  isLoadingState = false,
}: CustomButtonProps) {
  return (
    <Button
      variant={variant}
      className="flex space-x-5 p-6 rounded font-bold uppercase tracking-widest cursor-pointer"
      type={type}
      disabled={isDisabled}
    >
      {!isLoadingState && LeadingIcon && <LeadingIcon />}
      {isLoadingState && <Spinner />}
      {label}
      {TrailingIcon && <TrailingIcon />}
    </Button>
  );
}
