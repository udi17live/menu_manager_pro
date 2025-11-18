import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonHTMLAttributes, ComponentPropsWithoutRef } from "react";

interface IconOnlyButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  icon: LucideIcon;
}

export default function IconOnlyButton({
  icon: Icon,
  ...props
}: IconOnlyButtonProps) {
  return (
    <Button
      className="rounded font-bold uppercase tracking-widest cursor-pointer"
      {...props}
    >
      <Icon />
    </Button>
  );
}
