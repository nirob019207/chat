/* eslint-disable @typescript-eslint/no-explicit-any */
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSendNotificationMutation } from "@/redux/features/notification/notification.api";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const SendNotificationModal = ({ userId }: { userId: string[] }) => {
  const [open, setOpen] = useState(false);
  const [sendNotification] = useSendNotificationMutation();

  const handleSendNotification = async (data: FieldValues) => {
    const toastId = toast.loading("Notification sending...");

    const NotificationData = { users: userId, ...data };

    try {
      const res: any = await sendNotification(NotificationData);
      if (res?.data?.success) {
        toast.success("Send Successfully", { id: toastId });
      } else {
        toast.error(
          res?.error?.data?.message || "Failed to send notificaiton",
          {
            id: toastId,
          }
        );
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to send notificaiton");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          disabled={!userId.length}
          className="bg-primary text-white px-12 py-3 rounded mt-2"
        >
          Send Notification
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[22px] font-semibold">
              Write your notification message here
            </DialogTitle>
            <DialogDescription className="text-black font-semibold">
              Write Notification
            </DialogDescription>

            <MyFormWrapper onSubmit={handleSendNotification}>
              <MyFormInput name="title" placeholder="Title" />
              <MyFormInput
                type="textarea"
                name="body"
                rows={5}
                placeholder="Write here..."
              />

              <button className="w-full bg-primary text-white px-12 py-3 rounded mt-2">
                Send Notification
              </button>
            </MyFormWrapper>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SendNotificationModal;
