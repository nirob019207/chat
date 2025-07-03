/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useDeleteSubscriptionOfferMutation } from "@/redux/features/subscriptions/subscriptions.api";
import { MdCancel } from "react-icons/md";
import { useDeleteCategoryMutation } from "@/redux/features/foodCategories/foodCategories.api";

interface DeleteModalProps {
  id: string;
  type: "subscriptionOffer" | "user" | "category";
  btn?: string;
}

const DeleteModal = ({ id, type, btn }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);

  const [deleteSubscription] = useDeleteSubscriptionOfferMutation();
  const [deleteCAtegory] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    const toastId = toast.loading(`Deleting...`);
    try {
      let res;
      if (type === "subscriptionOffer") {
        res = await deleteSubscription(id).unwrap();
      } else if (type === "category") {
        res = await deleteCAtegory(id).unwrap();
      }

      if (res.data) {
        toast.success("Deleted Successfully", { id: toastId });
        setOpen(false);
      } else {
        toast.error(res?.error?.data?.message || "Failed to Delete", {
          id: toastId,
        });
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || `Failed to delete ${type}`, {
        id: toastId,
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {btn === "icon" ? (
        <DialogTrigger className="w-8 h-8  flex justify-center items-center">
          <MdCancel className="text-xl text-red-500" />
        </DialogTrigger>
      ) : (
        <DialogTrigger className="w-full bg-red-100 border border-red-300 text-[#D00E11] py-2 px-6 rounded-lg font-normal">
          Delete
        </DialogTrigger>
      )}

      <DialogContent className="max-w-[450px] !rounded-3xl [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col justify-center items-center gap-5 text-center">
              <h3 className="text-xl font-medium">
                Are you sure you want to proceed?
              </h3>
              <div className="flex md:gap-5 gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-red-500 py-2 px-6 rounded-full"
                >
                  Cancle
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-green-500 py-2 px-6 rounded-full"
                >
                  Confirm
                </button>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
