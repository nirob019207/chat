/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormSelect from "@/components/form/MyFormSelect";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { Button } from "@/components/ui/button";
import { useCreateSubscriptionOfferMutation } from "@/redux/features/subscriptions/subscriptions.api";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "sonner";

const durationOptions = [
  {
    label: "Weekly",
    keyOption: "01",
    value: "7",
  },
  {
    label: "Monthly",
    keyOption: "02",
    value: "30",
  },
  {
    label: "Yearly",
    keyOption: "03",
    value: "365",
  },
];

const AddSubscriptioniForm = () => {
  const [getTags, setTag] = useState<string[]>([]);
  const [createSubscription] = useCreateSubscriptionOfferMutation();

  // remove tag
  const removeTag = (linkUrl: string) => {
    setTag((prevTags) => {
      const updatedTag = prevTags.filter((link) => link !== linkUrl);
      return updatedTag;
    });
  };

  // add tag
  const handleAddTags = (payload: FieldValues) => {
    if (payload.tag) {
      setTag((prevTag) => [...prevTag, payload.tag]);
    }
  };

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Adding...");

    const price = Number(data.price);
    const duration = Number(data.duration)

    if (isNaN(price) || price <= 0) {
      toast.error("Invalid price. Please enter a valid number.");
      return;
    }

    const updatableData = { ...data, price, duration, description: getTags };

    try {
      const res: any = await createSubscription(updatableData);
      if (res.data) {
        toast.success("Added Successfully", { id: toastId });
      } else {
        toast.error(res?.error?.data?.message || "Failed to Add", {
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to Add");
    }
  };

  return (
    <div className="w-full max-w-[430px] p-6 bg-white rounded-2xl shadow-sm md:mx-0 mx-auto">
      <h3 className="md:text-xl text-lg font-semibold mb-4">
        Add your new subscription plan here:
      </h3>

      <div className="relative">
        <MyFormWrapper onSubmit={handleSubmit}>
          <MyFormInput
            name="title"
            label="Subscription Title"
            placeholder="Enter your Full name"
          />
          <MyFormInput
            name="price"
            label="Subscription Price"
            placeholder="$9.99"
          />

          <MyFormSelect
            name="duration"
            options={durationOptions}
            label="Subscription Duration"
            className="mb-32"
          />

          <div className="flex flex-col gap-1">
            {getTags?.map((tag, idx) => (
              <div
                key={idx}
                className="flex gap-2 justify-between bg-[#f8fafd] py-1 px-5 rounded-lg"
              >
                <p>{tag}</p>
                <button type="button" onClick={() => removeTag(tag)}>
                  <MdOutlineCancel className="text-2xl text-red-400" />
                </button>
              </div>
            ))}
          </div>

          <Button className="rounded-[8px] bg-[#0D834A] w-full py-6 text-lg mt-6">
            Add Subscription
          </Button>
        </MyFormWrapper>

        {/* Tag add  */}
        <div className="absolute top-64 w-full">
          <MyFormWrapper onSubmit={handleAddTags}>
            <MyFormInput
              name="tag"
              label="Add Tag"
              placeholder="Priority listing: Appear at the top of customer search "
            />

            <div className="flex justify-center">
              <button>+ Add Tag</button>
            </div>
          </MyFormWrapper>
        </div>
      </div>
    </div>
  );
};

export default AddSubscriptioniForm;
