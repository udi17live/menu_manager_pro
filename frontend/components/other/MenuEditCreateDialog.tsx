"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MenuData, RestaurantData } from "@/types/types";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMetaContext } from "@/providers/MetaContextProvider";
import { Textarea } from "../ui/textarea";
import CustomButton from "../buttons/CustomButton";
import { postRestaurantData } from "@/actions/restaurantActions";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fa } from "zod/v4/locales";
import { Switch } from "../ui/switch";
import { Label } from "@radix-ui/react-label";

interface MenuEditCreateDialogProps {
  trigger: React.ReactNode | string;
  menuObj?: MenuData | null;
}

const initialState = {
  success: true,
  errors: {},
  menuData: null,
};

export default function MenuEditCreateDialog({
  trigger,
  menuObj = null,
}: MenuEditCreateDialogProps) {
  const router = useRouter();
  const context = useMetaContext();
  const [state, action, isPending] = useActionState(
    postRestaurantData,
    initialState
  );
  const [menuData, setMenuData] = useState(menuObj);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // if (!state.success) {
    //   toast.error("Error updating restaurant data");
    // }
    // if (state.success && state.menuData) {
    //   const isCreating = menuData === null;
    //   toast.success(`Restaurant Data ${isCreating ? "Created" : "Updated"}`);
    //   setMenuData(state.menuData.data);
    //   setOpen(false);
    //   router.refresh();
    // }
  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="w-full md:min-w-[700]"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{menuData ? menuData.name : "New Menu"}</DialogTitle>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-4">
          <input type="hidden" name="id" defaultValue={menuData?.id ?? ""} />
          <Field>
            <FieldLabel htmlFor="name">Name*</FieldLabel>
            <Input
              className="p-6 rounded"
              name="name"
              type="name"
              placeholder="name"
              defaultValue={menuData?.name}
              disabled={isPending}
              required
            />
            {state.errors?.name && (
              <FieldError>{state?.errors?.name}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              className="p-6 rounded"
              name="description"
              placeholder="description"
              defaultValue={menuData?.description}
              disabled={isPending}
            />
            {state.errors?.description && (
              <FieldError>{state?.errors?.description}</FieldError>
            )}
          </Field>

          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="isActive">isActive</Label>
            <Switch
              required
              name="isActive"
              defaultChecked={menuData?.isActive}
            />
            {state.errors?.isActive && (
              <FieldError>{state?.errors?.isActive}</FieldError>
            )}
          </div>

          <CustomButton
            label={menuData?.name ? "Save" : "Create"}
            type="submit"
            isDisabled={isPending}
            isLoadingState={isPending}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
