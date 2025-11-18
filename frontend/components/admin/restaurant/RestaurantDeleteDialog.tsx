"use client";
import { deleteRestaurant } from "@/actions/restaurantActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface RestaurantDeteleDialogProps {
  id: string | number;
  trigger: React.ReactNode | string;
}

export default function RestaurantDeteleDialog({
  id,
  trigger,
}: RestaurantDeteleDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    if (!id) {
      toast.error("No restaurant Id Present to delete. Please try again");
    }
    const res = await deleteRestaurant(id);

    console.log("F: res: ", res);
    toast.success("Restaurant Deleted");
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            restaurant.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
