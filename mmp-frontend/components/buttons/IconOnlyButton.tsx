import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";

interface IconOnlyButtonProps {
  icon: LucideIcon;
  type?: "button" | "submit";
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export default function IconOnlyButton({
  type = "button",
  icon: Icon,
  variant = "default",
}: IconOnlyButtonProps) {
  return (
    <Button
      variant={variant}
      className="rounded font-bold uppercase tracking-widest cursor-pointer"
      type={type}
    >
      <Icon />
    </Button>
  );
}
