"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RestaurantData } from "@/types/types";
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

interface RestaurantEditCreateDialogProps {
  trigger: React.ReactNode | string;
  restaurantObj?: RestaurantData | null;
}

const initialState = {
  success: true,
  errors: {},
  restaurantData: null,
};

export default function RestaurantEditCreateDialog({
  trigger,
  restaurantObj = null,
}: RestaurantEditCreateDialogProps) {
  const router = useRouter();
  const context = useMetaContext();
  const [state, action, isPending] = useActionState(
    postRestaurantData,
    initialState
  );
  const [restaurantData, setRestaurantData] = useState(restaurantObj);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!state.success) {
      toast.error("Error updating restaurant data");
    }
    if (state.success && state.restaurantData) {
      const isCreating = restaurantData === null;
      toast.success(`Restaurant Data ${isCreating ? "Created" : "Updated"}`);
      setRestaurantData(state.restaurantData.data);
      setOpen(false);
      router.refresh();
    }
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
          <DialogTitle>
            {restaurantData ? restaurantData.name : "New Restaurant"}
          </DialogTitle>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-4">
          <input
            type="hidden"
            name="id"
            defaultValue={restaurantData?.id ?? ""}
          />
          <Field>
            <FieldLabel htmlFor="name">Name*</FieldLabel>
            <Input
              className="p-6 rounded"
              name="name"
              type="name"
              placeholder="name"
              defaultValue={restaurantData?.name}
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
              defaultValue={restaurantData?.description}
              disabled={isPending}
            />
            {state.errors?.description && (
              <FieldError>{state?.errors?.description}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email*</FieldLabel>
            <Input
              className="p-6 rounded"
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={restaurantData?.email}
              disabled={isPending}
              required
            />
            {state.errors?.email && (
              <FieldError>{state?.errors?.email}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">Phone*</FieldLabel>
            <Input
              className="p-6 rounded"
              name="phone"
              type="text"
              placeholder="phone"
              defaultValue={restaurantData?.phone}
              disabled={isPending}
              required
            />
            {state.errors?.phone && (
              <FieldError>{state?.errors?.phone}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="addressLine1">Address Line 1*</FieldLabel>
            <Input
              className="p-6 rounded"
              name="addressLine1"
              type="text"
              placeholder="address line 1"
              defaultValue={restaurantData?.addressLine1}
              disabled={isPending}
              required
            />
            {state.errors?.addressLine1 && (
              <FieldError>{state?.errors?.addressLine1}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="addressLine2">Address Line 2</FieldLabel>
            <Input
              className="p-6 rounded"
              name="addressLine2"
              type="text"
              placeholder="address line 2"
              defaultValue={restaurantData?.addressLine2}
              disabled={isPending}
            />
            {state.errors?.addressLine2 && (
              <FieldError>{state?.errors?.addressLine2}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input
              className="p-6 rounded"
              name="city"
              type="text"
              placeholder="city"
              defaultValue={restaurantData?.city}
              disabled={isPending}
              required
            />
            {state.errors?.city && (
              <FieldError>{state?.errors?.city}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Country</FieldLabel>
            <Select
              defaultValue={restaurantData?.country}
              required
              name="country"
              disabled={isPending}
            >
              <SelectTrigger className="w-full rounded p-6">
                <SelectValue placeholder="select restaurant country" />
              </SelectTrigger>
              <SelectContent>
                {context?.country.map((country, index) => (
                  <SelectItem key={index} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.country && (
              <FieldError>{state?.errors?.country}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="postCode">Post Code</FieldLabel>
            <Input
              className="p-6 rounded"
              name="postCode"
              type="text"
              placeholder="post code"
              defaultValue={restaurantData?.postCode}
              disabled={isPending}
            />
            {state.errors?.postCode && (
              <FieldError>{state?.errors?.postCode}</FieldError>
            )}
          </Field>

          <CustomButton
            label={restaurantData?.name ? "Save" : "Create"}
            type="submit"
            isDisabled={isPending}
            isLoadingState={isPending}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
