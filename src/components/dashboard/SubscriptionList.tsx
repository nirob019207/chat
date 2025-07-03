/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetAllSubscriptionsQuery } from "@/redux/features/subscriptions/subscriptions.api";
import Image from "next/image";

export default function SubscriptionList() {
  const { data } = useGetAllSubscriptionsQuery(undefined);

  const subscriptions = data?.data;

  return (
    <div className="space-y-4">
      {subscriptions?.map((subscription: any) => (
        <div
          key={subscription?.id}
          className="flex py-4 border-b items-center gap-4"
        >
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Image src={subscription?.user?.profileImage} alt="foodCart" height={500} width={500} className="h-10 w-10 rounded-full" />
          </div>
          <div>
            <div className="font-medium">{subscription?.user?.fullName}</div>
            <div className="text-sm text-gray-500">
              {subscription?.user?.email}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
